import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Press To Start",
  description: "Mint rare NFTs on Base via Farcaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden bg-[#050510]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
