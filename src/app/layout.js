import "./globals.css";
import { serif, sansSerif } from "../theme/fonts";
import { metadata } from "../config/metadata";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sansSerif.variable}`}>
      <body className={sansSerif.className}>
        <main className="py-20 flex h-full">
          <Providers>{children}</Providers>
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
