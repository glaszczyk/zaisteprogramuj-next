import { InferGetStaticPropsType } from "next";

import { ProductListItem } from "../components/Product";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((product) => (
        <li key={product.id}>
          <ProductListItem
            data={{
              id: product.id,
              title: product.title,
              thumbnailAlt: product.title,
              thumbnailUrl: product.image,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await response.json();
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
