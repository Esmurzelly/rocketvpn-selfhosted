import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect } from "@/lib/redirects";

export const dynamic = "force-dynamic";

export default async function CatchAll({ params }: { params: Promise<{ rest: string[] }> }) {
  const { rest } = await params;
  const to = await findRedirect(`/${rest.join("/")}`);
  if (to) permanentRedirect(to);
  notFound();
}