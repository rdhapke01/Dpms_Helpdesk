import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ReduxProvider } from "../redux-toolkit/ReduxProvider";

export const metadata = {
  title: "DPMS Helpdesk",
  description: "Hepldesk application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-100">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DPMS</title>

      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
