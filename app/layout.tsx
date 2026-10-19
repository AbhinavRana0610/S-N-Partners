import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S&N Partners | Your Rights, Our Advocacy",
  description:
    "S&N Partners is a full-service law firm in New Delhi practising in Dispute Resolution, Civil, Criminal, Corporate, Real Estate, Tax, Labour & Employment and more.",
  // The icon file convention doesn't take AVIF, so the icons are declared here. The PNG covers Safari
  // and iOS, which don't show AVIF favicons.
  icons: {
    icon: [{ url: "/Gilded-Scales-of-Justice-Crest.avif", type: "image/avif", sizes: "256x256" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
