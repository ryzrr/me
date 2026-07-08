import type { Metadata, Viewport } from "next";
import { Hina_Mincho, Zen_Kaku_Gothic_New, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import SakuraPetals from "@/components/SakuraPetals";

// Display — Hina Mincho: a delicate, hairline Japanese mincho serif. Its Latin
// letterforms carry the aesthetic AND it ships the kanji, so English and 漢字
// render in one typeface. Only weight 400 exists by design (it's meant to be
// fine), so we disable synthetic bolding in globals.css to keep it elegant.
const hinaMincho = Hina_Mincho({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Body + UI — Zen Kaku Gothic New: a clean Japanese gothic (sans) that pairs
// naturally with the mincho display and also contains the kanji.
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nikhil.me"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.metaDescription,
  keywords: [
    profile.name,
    profile.handle,
    "Full Stack Developer",
    "MERN",
    "portfolio",
    "web developer",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.metaDescription,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#17111b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hinaMincho.variable} ${zenKaku.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Set theme before first paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <SakuraPetals />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
