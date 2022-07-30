import { ProductDetails } from "../components/Product";
import { useQuery } from "react-query";
import { Pagination } from "../components/Pagination";

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await response.json();
  return data;
};

const ProductsCSRPage = () => {
  const result = useQuery("products", getProducts);
  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.error || !result.data) {
    return <div>Coś poszło nie tak...</div>;
  }
  return (
    <div className="flex flex-col">
      <Pagination />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {result.data.map((product) => (
          <li key={product.id}>
            <ProductDetails
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
    </div>
  );
};

export default ProductsCSRPage;

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
