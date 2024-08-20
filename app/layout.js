import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "@/context/darkmode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallet App",
  description: "This is Eth and Solana based Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DarkModeProvider>
      <body className={inter.className}>{children}</body>
      </DarkModeProvider>
    </html>
  );
}
