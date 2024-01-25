import "./globals.css";
import { serif, sansSerif } from "../theme/fonts";
import { metadata } from "../config/metadata";
import { Logo } from "@/components";

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sansSerif.variable}`}>
      <body className={sansSerif.className}>
        <main className="py-20 flex h-full">
          <div className="container flex flex-col justify-between gap-6">
            <Logo />
            <section
              className="flex flex-col justify-around grow"
              id="main-content"
            >
              {children}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
