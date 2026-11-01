export type HeroPicture = "phone" | "phone-2" | "laptop" | "laptop-2" | "tv";

export const heroPictureBySlug: Record<string, HeroPicture> = {
  steam: "laptop",
  epicgames: "laptop",
  roblox: "laptop",
  dota2: "laptop",
  valorant: "laptop",
  fortnite: "laptop",
  macos: "laptop",
  linux: "laptop",

  windows: "laptop-2",

  android: "phone-2",
  appleios: "phone-2",

  androidtv: "tv",
};