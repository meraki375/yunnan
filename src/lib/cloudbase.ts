import cloudbase from "@cloudbase/js-sdk";

const envId = process.env.NEXT_PUBLIC_CLOUDBASE_ENV_ID;
const region = process.env.NEXT_PUBLIC_CLOUDBASE_REGION;
const accessKey = process.env.NEXT_PUBLIC_CLOUDBASE_ACCESS_KEY;

const app = envId && region && accessKey
  ? cloudbase.init({ env: envId, region, accessKey, auth: { detectSessionInUrl: true } })
  : null;

export function getCloudbaseDatabase() {
  if (!app) {
    throw new Error("CloudBase 尚未配置。请检查 .env.local 中的公开环境变量。");
  }

  return (async () => {
    const auth = app.auth;
    const session = await auth.getSession();
    if (session.error) throw new Error(session.error.message);

    if (!session.data?.session) {
      const signIn = await auth.signInAnonymously();
      if (signIn.error) throw new Error(signIn.error.message);
    }

    return app.database();
  })();
}

export function getCloudbaseErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "云端同步暂时不可用，请稍后重试。";
}
