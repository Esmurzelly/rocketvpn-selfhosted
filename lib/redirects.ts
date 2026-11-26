import { getPayload } from "payload";
import config from "@payload-config";

export async function findRedirect(path: string): Promise<string | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "redirects",
    where: { from: { equals: path } },
    limit: 1,
    depth: 0,
  });
  return res.docs[0]?.to ?? null;
}