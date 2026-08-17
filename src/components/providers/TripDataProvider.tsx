"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { INITIAL_COST_INPUTS, MEMO_CATEGORIES, type CostInputs, type MemoCategory, type TripMemo } from "@/data/tripState";
import { getCloudbaseDatabase, getCloudbaseErrorMessage } from "@/lib/cloudbase";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { COST_INPUTS_STORAGE_KEY, MEMOS_STORAGE_KEY, PACKING_STORAGE_KEY } from "@/data/tripState";

type SyncStatus = "connecting" | "synced" | "saving" | "error";

type TripDataContextValue = {
  costInputs: CostInputs;
  updateCostInput: <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => void;
  resetCostInputs: () => void;
  checkedItemIds: string[];
  togglePackingItem: (item: string) => void;
  memos: TripMemo[];
  addMemo: (text: string, category: MemoCategory) => Promise<void>;
  toggleMemo: (memo: TripMemo) => Promise<void>;
  deleteMemo: (memoId: string) => Promise<void>;
  syncStatus: SyncStatus;
  syncError: string | null;
};

type RemoteSettings = {
  _id: string;
  costInputs: CostInputs;
  checkedItemIds: string[];
};

const TripDataContext = createContext<TripDataContextValue | null>(null);
const EMPTY_CHECKED_ITEM_IDS: string[] = [];
const EMPTY_MEMOS: TripMemo[] = [];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCostInputs(value: unknown): value is CostInputs {
  if (!isRecord(value)) return false;
  return Object.keys(INITIAL_COST_INPUTS).every((key) => typeof value[key] === "number");
}

function isMemoCategory(value: unknown): value is MemoCategory {
  return MEMO_CATEGORIES.some((item) => item.id === value);
}

function asRemoteSettings(value: unknown): RemoteSettings | null {
  if (!isRecord(value) || typeof value._id !== "string" || !isCostInputs(value.costInputs) || !Array.isArray(value.checkedItemIds)) return null;
  if (!value.checkedItemIds.every((item) => typeof item === "string")) return null;
  return { _id: value._id, costInputs: value.costInputs, checkedItemIds: value.checkedItemIds };
}

function asMemo(value: unknown): TripMemo | null {
  if (!isRecord(value)) return null;
  if (typeof value._id !== "string" || typeof value.text !== "string" || typeof value.completed !== "boolean" || typeof value.createdAt !== "number" || typeof value.updatedAt !== "number") return null;
  const category = isMemoCategory(value.category) ? value.category : "other";
  return { _id: value._id, text: value.text, category, completed: value.completed, createdAt: value.createdAt, updatedAt: value.updatedAt };
}

function getCreatedId(result: { id?: string; ids?: string[]; code?: string; message?: string }, label: string) {
  if (result.code) throw new Error(result.message || `${label}保存失败。`);
  const id = result.id ?? result.ids?.[0];
  if (!id) throw new Error(`${label}保存后未返回记录 ID。`);
  return id;
}

export function TripDataProvider({ children }: { children: ReactNode }) {
  const [costInputs, setCostInputs] = useLocalStorageState<CostInputs>(COST_INPUTS_STORAGE_KEY, INITIAL_COST_INPUTS);
  const [checkedItemIds, setCheckedItemIds] = useLocalStorageState<string[]>(PACKING_STORAGE_KEY, EMPTY_CHECKED_ITEM_IDS);
  const [memos, setMemos] = useLocalStorageState<TripMemo[]>(MEMOS_STORAGE_KEY, EMPTY_MEMOS);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("connecting");
  const [syncError, setSyncError] = useState<string | null>(null);
  const costInputsRef = useRef(costInputs);
  const checkedItemIdsRef = useRef(checkedItemIds);
  const settingsIdRef = useRef<string | null>(null);
  const initializationRef = useRef<Promise<void> | null>(null);
  const hasInitializedRef = useRef(false);
  const writeQueueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => { costInputsRef.current = costInputs; }, [costInputs]);
  useEffect(() => { checkedItemIdsRef.current = checkedItemIds; }, [checkedItemIds]);

  const enqueue = useCallback((operation: () => Promise<void>) => {
    writeQueueRef.current = writeQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        setSyncStatus("saving");
        await operation();
        setSyncError(null);
        setSyncStatus("synced");
      })
      .catch((error: unknown) => {
        setSyncStatus("error");
        setSyncError(getCloudbaseErrorMessage(error));
      });
    return writeQueueRef.current;
  }, []);

  const saveSettings = useCallback((patch: Partial<Pick<RemoteSettings, "costInputs" | "checkedItemIds">>) => {
    return enqueue(async () => {
      await initializationRef.current;
      const db = await getCloudbaseDatabase();
      const data = { ...patch, updatedAt: Date.now() };
      const settingsId = settingsIdRef.current;

      if (!settingsId) {
        const created = await db.collection("trip_settings").add({
          costInputs: patch.costInputs ?? costInputsRef.current,
          checkedItemIds: patch.checkedItemIds ?? checkedItemIdsRef.current,
          updatedAt: Date.now(),
        });
        settingsIdRef.current = getCreatedId(created, "旅行数据");
        return;
      }

      const result = await db.collection("trip_settings").doc(settingsId).update(data);
      if (result.code || result.updated !== 1) throw new Error(result.message || "旅行数据未能保存。");
    });
  }, [enqueue]);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    initializationRef.current = (async () => {
      try {
        const db = await getCloudbaseDatabase();
        const [settingsResult, memosResult] = await Promise.all([
          db.collection("trip_settings").limit(1).get(),
          db.collection("trip_memos").orderBy("createdAt", "desc").limit(100).get(),
        ]);
        if (settingsResult.code) throw new Error(settingsResult.message || "无法读取旅行数据。");
        const remoteSettings = asRemoteSettings((settingsResult.data as unknown[])[0]);

        if (remoteSettings) {
          settingsIdRef.current = remoteSettings._id;
          setCostInputs(remoteSettings.costInputs);
          setCheckedItemIds(remoteSettings.checkedItemIds);
        } else {
          const created = await db.collection("trip_settings").add({
            costInputs: costInputsRef.current,
            checkedItemIds: checkedItemIdsRef.current,
            updatedAt: Date.now(),
          });
          settingsIdRef.current = getCreatedId(created, "旅行数据");
        }

        if (memosResult.code) throw new Error(memosResult.message || "无法读取备忘录。");
        setMemos((memosResult.data as unknown[]).map(asMemo).filter((memo): memo is TripMemo => memo !== null));
        setSyncStatus("synced");
      } catch (error: unknown) {
        setSyncStatus("error");
        setSyncError(getCloudbaseErrorMessage(error));
      }
    })();
  }, [setCheckedItemIds, setCostInputs, setMemos]);

  const updateCostInput = useCallback(<K extends keyof CostInputs>(key: K, value: CostInputs[K]) => {
    setCostInputs((previous) => {
      const next = { ...previous, [key]: value };
      costInputsRef.current = next;
      void saveSettings({ costInputs: next });
      return next;
    });
  }, [saveSettings, setCostInputs]);

  const resetCostInputs = useCallback(() => {
    costInputsRef.current = INITIAL_COST_INPUTS;
    setCostInputs(INITIAL_COST_INPUTS);
    void saveSettings({ costInputs: INITIAL_COST_INPUTS });
  }, [saveSettings, setCostInputs]);

  const togglePackingItem = useCallback((item: string) => {
    setCheckedItemIds((previous) => {
      const next = new Set(previous);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      const checked = [...next];
      checkedItemIdsRef.current = checked;
      void saveSettings({ checkedItemIds: checked });
      return checked;
    });
  }, [saveSettings, setCheckedItemIds]);

  const addMemo = useCallback(async (text: string, category: MemoCategory) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    await enqueue(async () => {
      await initializationRef.current;
      const db = await getCloudbaseDatabase();
      const now = Date.now();
      const created = await db.collection("trip_memos").add({ text: trimmedText, category, completed: false, createdAt: now, updatedAt: now });
      const memo = { _id: getCreatedId(created, "备忘录"), text: trimmedText, category, completed: false, createdAt: now, updatedAt: now };
      setMemos((previous) => [memo, ...previous]);
    });
  }, [enqueue, setMemos]);

  const toggleMemo = useCallback(async (memo: TripMemo) => {
    const nextCompleted = !memo.completed;
    await enqueue(async () => {
      const db = await getCloudbaseDatabase();
      const result = await db.collection("trip_memos").doc(memo._id).update({ completed: nextCompleted, updatedAt: Date.now() });
      if (result.code || result.updated !== 1) throw new Error(result.message || "备忘录状态未能更新。");
      setMemos((previous) => previous.map((item) => item._id === memo._id ? { ...item, completed: nextCompleted, updatedAt: Date.now() } : item));
    });
  }, [enqueue, setMemos]);

  const deleteMemo = useCallback(async (memoId: string) => {
    await enqueue(async () => {
      const db = await getCloudbaseDatabase();
      const result = await db.collection("trip_memos").doc(memoId).remove();
      if (result.code || result.deleted !== 1) throw new Error(result.message || "备忘录未能删除。");
      setMemos((previous) => previous.filter((memo) => memo._id !== memoId));
    });
  }, [enqueue, setMemos]);

  return <TripDataContext.Provider value={{ costInputs, updateCostInput, resetCostInputs, checkedItemIds, togglePackingItem, memos, addMemo, toggleMemo, deleteMemo, syncStatus, syncError }}>{children}</TripDataContext.Provider>;
}

export function useTripData() {
  const context = useContext(TripDataContext);
  if (!context) throw new Error("useTripData 必须在 TripDataProvider 内使用。");
  return context;
}
