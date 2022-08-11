import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Main } from "../../components/Main";

import { ProductDetails } from "../../components/Product";
import Head from "next/head";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const renderProducts = () => {
    if (!data) {
      return <div>Chyba mamy problem...</div>;
    }
    return (
      <>
        <Link href="/products">
          <a className="font-bold">Wróć do listy produktów</a>
        </Link>
        <ProductDetails
          data={{
            id: data.id,
            description: data.description,
            thumbnailAlt: data.title,
            thumbnailUrl: data.image,
            rating: data.rating.rate,
            title: data.title,
          }}
        />
      </>
    );
  };
  return (
    <Main>
      <Head>
        <title>FakeStoreApi Product Details</title>
      </Head>
      {renderProducts()}
    </Main>
  );
};
export default ProductIdPage;

export const getStaticPaths = async () => {
  const response = await fetch("https://fakestoreapi.com/products/");
  const json: StoreApiResponse[] = await response.json();
  const data = json.map((product) => {
    return { params: { productId: `${product.id}` } };
  });
  return {
    paths: data,
    fallback: false,
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
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await response.json();
  return {
    props: { data },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
