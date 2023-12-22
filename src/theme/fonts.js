import { Corben, Epilogue } from "next/font/google";

export const serif = Corben({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-corben",
  weight: ["400", "700"],
});

export const sansSerif = Epilogue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-epilogue",
  weight: ["400", "700"],
});
