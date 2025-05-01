import PropTypes from "prop-types";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const montserrat = localFont({
  src: "./fonts/Montserrat.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});

export const metadata = {
  title: "LeetQuest",
  description: "LeetQuest: Learning to code can be fun",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="LeetQuest" />
      </head>
      <body
        className={`${montserrat.variable} bg-background text-foreground antialiased`}
      >
        <SessionProvider>
          <Navbar className="container px-4 mx-auto md:px-2" />
          <div className="container px-4 mx-auto md:px-2">{children}</div>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
