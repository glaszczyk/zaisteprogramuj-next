import { Rating } from "./Rating";
import Link from "next/link";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  const { thumbnailAlt, thumbnailUrl, rating, description, title } = data;
  return (
    <div className="p-5 border-2 border-gray-300 bg-white shadow-lg h-full ">
      <img src={thumbnailUrl} alt={thumbnailAlt} />
      <h2 className="font-bold text-2xl mt-4 mb-2">{title}</h2>
      <p>{description}</p>
      <Rating rating={rating} />
    </div>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailAlt" | "thumbnailUrl"
>;

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const { id, thumbnailAlt, thumbnailUrl, title } = data;
  return (
    <div className="p-5 border-2 border-gray-300 bg-white shadow-lg h-full">
      <img src={thumbnailUrl} alt={thumbnailAlt} />
      <Link href={`/products/${id}`}>
        <a>
          <h2 className="font-bold text-2xl mt-4 mb-2">{title}</h2>
        </a>
      </Link>
    </div>
  );
};
