import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "@/context/darkmode";
import { WalletProvider } from "../context/WalletContext";
import { Toaster } from 'sonner';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallet App",
  description: "This is an Eth and Solana based Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          <WalletProvider>
            {children}
            <Toaster />
          </WalletProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
