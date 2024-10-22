import React from "react";
import PropTypes from "prop-types";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";

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
      <body
        className={`${montserrat.variable} bg-background text-foreground antialiased`}
      >
        <div className="container mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
