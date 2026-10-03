import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import PointerGlow from "@/components/PointerGlow";
import Backdrop from "@/components/Backdrop";

const funnelDisplay = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel-display" });
const funnelSans = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Arindam Chakraborty — Agentic AI Engineer",
    template: "%s — Arindam Chakraborty",
  },
  description:
    "Senior Agentic AI Engineer and Forward Deployed Engineer in Bengaluru. Production-grade agentic AI systems, RAG pipelines and cloud-native backends.",
  metadataBase: new URL('https://ctrlshiftdelete.in'),
  openGraph: {
    title: "Arindam Chakraborty — Agentic AI Engineer",
    description:
      "Production-grade agentic AI systems, RAG pipelines and cloud-native backends.",
    type: "website",
  },
};

// Applies a saved theme before first paint so the page never flashes the wrong one.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${funnelDisplay.variable} ${funnelSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Intro>
          <SmoothScroll />
          <PointerGlow />
          <Backdrop />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Intro>
      </body>
    </html>
  );
}
