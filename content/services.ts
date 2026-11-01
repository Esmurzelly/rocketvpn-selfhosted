export type Service = { label: string; href: string; icon: string };
export type ServiceGroup = { title: string; items: Service[] };

const i = (name: string) => `/icons/services/${name}.svg`;

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Мессенджеры и соц.сети",
    items: [
      { label: "Telegram", href: "/telegram", icon: i("telegram") },
      { label: "Discord", href: "/discord", icon: i("discord") },
      { label: "Instagram", href: "/instagram", icon: i("instagram") },
      { label: "WhatsApp", href: "/whatsapp", icon: i("whatsapp") },
      { label: "Facebook", href: "/facebook", icon: i("facebook") },
      { label: "TikTok", href: "/tiktok", icon: i("tiktok") },
      { label: "Threads", href: "/threads", icon: i("threads") },
      { label: "Notion", href: "/notion", icon: i("notion") },
      { label: "X (Twitter)", href: "/xtwitter", icon: i("x") },
      { label: "Snapchat", href: "/snapchat", icon: i("snapchat") },
      { label: "LinkedIn", href: "/linkedin", icon: i("linkedin") },
      { label: "Viber", href: "/viber", icon: i("viber") },
    ],
  },
  {
    title: "ИИ и нейросети",
    items: [
      { label: "ChatGPT", href: "/chatgpt", icon: i("chatgpt") },
      { label: "Claude", href: "/claude", icon: i("claude") },
      { label: "Gemini", href: "/gemini", icon: i("gemini") },
      { label: "MidJourney", href: "/midjourney", icon: i("midjourney") },
      { label: "Perplexity", href: "/perplexity", icon: i("perplexity") },
      { label: "Grok", href: "/grok", icon: i("grok") },
    ],
  },
  {
    title: "Видео и стриминг",
    items: [
      { label: "YouTube", href: "/youtube", icon: i("youtube") },
      { label: "Netflix", href: "/netflix", icon: i("netflix") },
      { label: "Twitch", href: "/twitch", icon: i("twitch") },
      { label: "Disney", href: "/disney", icon: i("disney") },
      { label: "Amazon", href: "/amazon", icon: i("amazon") },
      { label: "Apple TV", href: "/appletv", icon: i("appletv") },
    ],
  },
  {
    title: "Игры",
    items: [
      { label: "Steam", href: "/steam", icon: i("steam") },
      { label: "Epic Games", href: "/epicgames", icon: i("epicgames") },
      { label: "Roblox", href: "/roblox", icon: i("roblox") },
      { label: "Dota 2", href: "/dota2", icon: i("dota2") },
      { label: "Valorant", href: "/valorant", icon: i("valorant") },
      { label: "Fortnite", href: "/fortnite", icon: i("fortnite") },
    ],
  },
  {
    title: "Устройства и платформы",
    items: [
      { label: "Android", href: "/android", icon: i("android") },
      { label: "IPhone / iOS", href: "/appleios", icon: i("ios") },
      { label: "Windows", href: "/windows", icon: i("windows") },
      { label: "MacOS", href: "/macos", icon: i("macos") },
      { label: "Android TV", href: "/androidtv", icon: i("androidtv") },
      { label: "Linux", href: "/linux", icon: i("linux") },
    ],
  },
];