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

interface ProductCsrProps {
  data: ProductDetails;
}
export const ProductCsrDetails = ({ data }: ProductCsrProps) => {
  const { id, thumbnailAlt, thumbnailUrl, rating, description, title } = data;
  return (
    <div className="p-6 border-2 border-gray-300 bg-white shadow-lg h-full ">
      <img
        className="object-scale-down aspect-square w-fit h-auto"
        src={thumbnailUrl}
        alt={thumbnailAlt}
      />
      <Link href={`\product-csr?product=${id}`}>
        <h2 className="font-bold text-2xl mt-4 mb-2">{title}</h2>
      </Link>
      <p>{description}</p>
      <Rating rating={rating} />
    </div>
  );
};
