import { ProductDetails } from "../components/Product";
import { useQuery } from "react-query";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

const PRODUCTS_API_URL = " https://naszsklep-api.vercel.app/api/products";

export const getProducts = async () => {
  const response = await fetch(PRODUCTS_API_URL);
  const data: StoreApiResponse[] = await response.json();
  return data;
};

const ProductsCSRPage = () => {
  const result = useQuery("products", getProducts);
  const [currentPage, setCurrentPage] = useState(1);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.error || !result.data) {
    return <div>Coś poszło nie tak...</div>;
  }
  return (
    <div className="flex flex-col">
      <Pagination
        totalPages={10}
        current={currentPage}
        onClick={(event) =>
          setCurrentPage(parseInt(event.currentTarget.innerText))
        }
        renderType="csr"
      />
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
