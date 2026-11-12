import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Tariffs } from "./globals/Tariffs";
import { SiteSettings } from "./globals/SiteSettings";
import { Redirects } from "./collections/Redirects";
import { Posts } from "./collections/Posts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
    admin: { user: Users.slug },
    collections: [Users, Media, Pages, Redirects, Posts],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    db: postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL_POOLED },
    }),
    typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
    sharp,
    globals: [Tariffs, SiteSettings]
});