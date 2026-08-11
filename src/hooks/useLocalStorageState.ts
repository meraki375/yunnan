"use client";

import { useCallback, useSyncExternalStore, type SetStateAction } from "react";

const LOCAL_CHANGE_EVENT = "shanhai-yueyue:local-storage-change";
const valueCache = new Map<string, unknown>();

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  if (valueCache.has(key)) return valueCache.get(key) as T;

  try {
    const raw = window.localStorage.getItem(key);
    const value = raw === null ? initialValue : (JSON.parse(raw) as T);
    valueCache.set(key, value);
    return value;
  } catch {
    valueCache.set(key, initialValue);
    return initialValue;
  }
}

/** Keeps small browser-only preferences without requiring a backend. */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => undefined;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      try {
        valueCache.set(key, event.newValue === null ? initialValue : JSON.parse(event.newValue));
      } catch {
        valueCache.set(key, initialValue);
      }
      onStoreChange();
    };
    const onLocalChange = (event: Event) => {
      if ((event as CustomEvent<string>).detail === key) onStoreChange();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(LOCAL_CHANGE_EVENT, onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LOCAL_CHANGE_EVENT, onLocalChange);
    };
  }, [initialValue, key]);

  const getSnapshot = useCallback(() => readValue(key, initialValue), [initialValue, key]);
  const value = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

  const setValue = useCallback((nextValue: SetStateAction<T>) => {
    const current = readValue(key, initialValue);
    const resolved = typeof nextValue === "function"
      ? (nextValue as (previous: T) => T)(current)
      : nextValue;

    valueCache.set(key, resolved);
    try {
      window.localStorage.setItem(key, JSON.stringify(resolved));
    } catch {
      // Private-mode or browser policy can block storage; the current session still works.
    }
    window.dispatchEvent(new CustomEvent(LOCAL_CHANGE_EVENT, { detail: key }));
  }, [initialValue, key]);

  return [value, setValue] as const;
}
