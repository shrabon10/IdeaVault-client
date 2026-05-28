import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Providers from "@/components/shared/Providers";

const PlusJakatraSans = Plus_Jakarta_Sans({
  variable: "--plus_jakatra_sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault",
  description: "This is a modern idea sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${PlusJakatraSans.variable} duration-700 h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col justify-between gap-20">
        <Providers>
          <Navbar />

          <div className="container mx-auto grow pt-40">
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}