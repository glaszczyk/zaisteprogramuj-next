import { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
