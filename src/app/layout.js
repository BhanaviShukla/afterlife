import "./globals.css";
import { serif, sansSerif } from "@/theme/fonts";
import { metadata } from "../config/metadata";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

export { metadata };

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={`${serif.variable} ${sansSerif.variable}`}>
      <body className={sansSerif.className}>
        {modal}
        <main className="h-full">
          <Providers>{children} </Providers>
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
