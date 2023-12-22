import "./globals.css";
import { serif, sansSerif } from "../theme/fonts";
import { metadata } from "../config/metadata";

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sansSerif.variable}`}>
      <body className={sansSerif.className}>{children}</body>
    </html>
  );
}
