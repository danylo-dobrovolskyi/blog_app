import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        {children}
      </body>
    </html>
  );
}
