import { getPayload } from "payload";
import config from "@payload-config";
import { seo } from "../content/seo";
import {
  faqBySlug,
  homeFaq,
  vpnFaq,
  tarifFaq,
  aboutFaq,
  vpnProtocolsFaq,
  proxyFaq,
  contactsFaq,
  supportFaq,
  policyFaq,
  cookiesFaq,
  conditionsFaq,
} from "../content/faq";
import { heroPictureBySlug } from "../content/hero-pictures";

type Faq = { question: string; answer: string };

const faqByKey: Record<string, Faq[]> = {
  ...faqBySlug,
  home: homeFaq,
  vpn: vpnFaq,
  tarif: tarifFaq,
  about: aboutFaq,
  aboutvpn: vpnProtocolsFaq,
  proxy: proxyFaq,
  contacts: contactsFaq,
  support: supportFaq,
  policy: policyFaq,
  cookies: cookiesFaq,
  conditions: conditionsFaq,
};

// Узлы редактора Lexical: абзац из кусков текста. Фрагменты **так** становятся жирными
const lexText = (text: string, format: number) => ({
  type: "text", text, format, detail: 0, mode: "normal", style: "", version: 1,
});

const lexParagraph = (text: string) => ({
  type: "paragraph", format: "", indent: 0, version: 1, direction: "ltr", textFormat: 0,
  children: text
    .split(/(\*\*.*?\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? lexText(part.slice(2, -2), 1)
        : lexText(part, 0),
    ),
});

const lexRoot = (paragraphs: string[]) => ({
  root: {
    type: "root", format: "", indent: 0, version: 1, direction: "ltr",
    children: paragraphs.map(lexParagraph),
  },
});

async function run() {
  const payload = await getPayload({ config });

  for (const [key, p] of Object.entries(seo)) {
    // у лендингов есть отдельный короткий текст для метатега, а длинные абзацы идут в тело страницы
    const isLanding = Boolean(p.main_description);
    const short = p.main_description ?? p.description;
    const paragraphs = isLanding
      ? [p.description, p.description2, p.description3, p.description4].filter((t): t is string => Boolean(t))
      : [];

    const data = {
      slug: key,
      h1: p.h1,
      heroText: short,
      heroPicture: heroPictureBySlug[key] ?? "phone",
      content: paragraphs.length ? lexRoot(paragraphs) : undefined,
      faq: faqByKey[key] ?? [],
      seo: { title: p.title, description: short, keywords: p.keywords, noindex: false },
    };

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: key } },
      limit: 1,
    });

    if (existing.docs[0]) {
      await payload.update({ collection: "pages", id: existing.docs[0].id, data: data as never });
      console.log("обновлено:", key);
    } else {
      await payload.create({ collection: "pages", data: data as never });
      console.log("создано:", key);
    }
  }

  process.exit(0);
}

run();