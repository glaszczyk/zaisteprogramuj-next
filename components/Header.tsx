import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-500 px-6 py-2">
      <nav className="text-white flex">
        <Link href="/">
          <a className="px-2">Główna</a>
        </Link>
        <Link href="/about">
          <a className="px-2">About</a>
        </Link>
        <Link href="/products">
          <a className="px-2">Fake Store Products</a>
        </Link>
        <Link href="/products-csr?page=1">
          <a className="px-2">CSR Products</a>
        </Link>
        <Link href="/new-products/1">
          <a className="px-2">SSG Products</a>
        </Link>
      </nav>
    </header>
  );
};
