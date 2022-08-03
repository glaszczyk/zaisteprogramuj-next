import { useQuery, UseQueryResult } from "react-query";
import { Pagination } from "../components/Pagination";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { ProductCsrDetails } from "../components/ProductCsr";

const PRODUCTS_API_URL = "https://naszsklep-api.vercel.app/api/products";

export const getProducts = async (currentPage: string) => {
  const productsPerPage = 25;
  const offset = (parseInt(currentPage) - 1) * productsPerPage;
  const products = `${PRODUCTS_API_URL}?take=${productsPerPage}&offset=${offset}`;
  const response = await fetch(`${products}`);
  const data: ProductsApiResponse[] = await response.json();
  return data;
};

const ProductsCSRPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = !page || typeof page !== "string" ? "1" : page;
  const result = useQuery(["products", currentPage], () =>
    getProducts(currentPage)
  );

  const renderProductsCSRContent = (
    result: UseQueryResult<ProductsApiResponse[]>
  ) => {
    if (result.isLoading) {
      return <div>Loading...</div>;
    }
    if (result.error || !result.data) {
      return <div>Coś poszło nie tak...</div>;
    }
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {result.data.map((product) => (
          <li key={product.id}>
            <ProductCsrDetails
              data={{
                id: product.id,
                title: product.title,
                description: product.description,
                thumbnailAlt: product.title,
                thumbnailUrl: product.image,
                rating: product.rating.rate,
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Head>
        <title>Products via CSR</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <Main>
          <div className="flex flex-col">
            <Pagination
              totalPages={10}
              current={currentPage}
              renderType="csr"
            />
            {renderProductsCSRContent(result)}
          </div>
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductsCSRPage;

interface ProductsApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}
