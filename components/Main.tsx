import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="flex-grow p-6 grid md:grid-cols-2 gap-6">{children}</main>
  );
};
