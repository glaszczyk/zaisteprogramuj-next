import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Main } from "../../../components/Main";
import { ProductDetails } from "../../../components/Product";
import { ProductsApiResponse } from "../[listId]";

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

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  function renderContent() {
    if (!data) {
      return <p>Coś jest nie tak. Przepraszam</p>;
    }
    return (
      <>
        <button
          onClick={() => router.back()}
          className="w-100 h-14 px-4 bg-blue-800 text-white rounded-md"
        >
          Wróć do listy produktów
        </button>
        <div className="flex flex-col py-6">
          <ProductDetails data={getProductDetails(data)} />
        </div>
      </>
    );
  }

  return (
    <Main>
      <Head>
        <title>SSG product details</title>
      </Head>
      {renderContent()}
    </Main>
  );
};

export default ProductIdPage;

const PRODUCTS_API_URL = "https://naszsklep-api.vercel.app/api/products";

export const getProducts = async (currentPage: string) => {
  const productsPerPage = 25;
  const offset = (parseInt(currentPage) - 1) * productsPerPage;
  const products = `${PRODUCTS_API_URL}?take=${productsPerPage}&offset=${offset}`;
  const response = await fetch(`${products}`);
  const data: ProductsApiResponse[] = await response.json();
  return data;
};

export const getStaticPaths = async () => {
  const prerenderedPagesCount = 3;
  const allPagesCount = new Array(prerenderedPagesCount)
    .fill(null)
    .map((_, i) => i + 1);
  const allProductsByPage = await Promise.all(
    allPagesCount.map(async (page) => await getProducts(`${page}`))
  );
  const allProductsIds = allProductsByPage
    .reduce((acc, current) => [...acc, ...current], [])
    .map((product) => product.id);
  const paths = allProductsIds.map((id) => ({
    params: {
      productId: `${id}`,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const response = await fetch(`${PRODUCTS_API_URL}/${params.productId}`);
  const data: ProductsApiResponse = await response.json();
  return {
    props: { data },
  };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
