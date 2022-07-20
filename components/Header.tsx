import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-500 px-2 py-2">
      <nav className="text-white inline-block">
        <Link href="/">
          <a className="mr-3">Główna</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};
