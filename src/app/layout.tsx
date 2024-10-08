import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BodyWrapper from "@/components/inhouse/body-wrapper";



export const metadata: Metadata = {
  title: "Nawanjana International Inventory Management System",
  description: "This system is used to manage and monitor the inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BodyWrapper >
          {children}
      </BodyWrapper>
    </html>
  );
}
