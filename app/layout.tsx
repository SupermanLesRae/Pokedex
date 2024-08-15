import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const lato = Lato({
  weight: ['100', '400', '700'], // Array of weights as strings
  subsets: ['latin'], // The subsets array should be correctly typed
});

export const metadata: Metadata = {
  title: "PokeDex",
  description: "Got to catch them all!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-slate-900 text-white`}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
