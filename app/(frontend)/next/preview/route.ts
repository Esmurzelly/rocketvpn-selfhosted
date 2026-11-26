import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(req: Request) {
  const path = new URL(req.url).searchParams.get("path") ?? "";

  // только адреса внутри сайта
  if (!/^\/(?!\/)/.test(path)) return new Response("Некорректный адрес", { status: 400 });

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return new Response("Войдите в админку", { status: 403 });

  (await draftMode()).enable();
  redirect(path);
}