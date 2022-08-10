import { useQuery, UseQueryResult } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";

import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { ProductDetails } from "../components/Product";
import { ProductsApiResponse } from "./new-products/[listId]";

const getProduct = async (product: string) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${product}`
  );
  const result: ProductsApiResponse = await response.json();
  return result;
};

const getProductDetails = (data: ProductsApiResponse) => {
  const { id, title, longDescription, rating, image } = data;
  return {
    id,
    title,
    rating: rating.rate,
    thumbnailUrl: image,
    thumbnailAlt: title,
    description: longDescription,
  };
};

const ProductCSRPage = () => {
  const router = useRouter();
  const { product } = router.query;
  const currentProduct = typeof product !== "string" ? "1" : product;
  const result = useQuery(["product", product], () =>
    getProduct(currentProduct)
  );

  const renderProductCSR = (result: UseQueryResult<ProductsApiResponse>) => {
    if (result.isLoading) {
      return <div>...Loading</div>;
    }
    if (result.error || !result.data) {
      return <div>Coś poszło nie tak...</div>;
    }
    return <ProductDetails data={getProductDetails(result.data)} />;
  };

  return (
    <div>
      <Head>
        <title>Product details</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <Main>
          <button
            onClick={() => router.back()}
            className="w-100 h-14 px-4 bg-blue-800 text-white rounded-md"
          >
            Wróć do listy produktów
          </button>
          <div className="flex flex-col py-6">{renderProductCSR(result)}</div>
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductCSRPage;
