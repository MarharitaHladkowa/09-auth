import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ВАЖНО: Вместо 'domains' используем 'remotePatterns' для корректной работы
    // с внешними изображениями в последних версиях Next.js.
    remotePatterns: [
      {
        // Добавлен требуемый хост для аватаров профиля
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/**",
      },
      {
        // Сохранен предыдущий хост, который был в 'domains'
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/notes/filter/:slug", // маршрут сторінки
        locale: false,
        headers: [
          {
            key: "Cache-Control", // Заголовок
            value: "public, max-age=300, must-revalidate", // кешуємо на 5 хв
          },
        ],
      },
    ];
  },
};

export default nextConfig;
