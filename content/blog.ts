export type Post = {
  title: string;
  description: string;
  href: string;
  image?: string; // путь к public
  imageAlt?: string;
};

export const posts: Post[] = [
  {
    title: "Как подключить Rocket VPN на iPhone",
    description: "Пошаговая инструкция: от установки приложения до первого подключения.",
    href: "/appleios",
  },
  {
    title: "Как выбрать регион подключения",
    description: "На что влияет расположение сервера и как подобрать подходящий регион.",
    href: "/vpn",
  },
  {
    title: "Что делать, если VPN не подключается",
    description: "Проверяем интернет, настройки приложения и доступность сервера.",
    href: "/support",
  },
];