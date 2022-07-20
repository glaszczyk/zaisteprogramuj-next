import { Rating } from "./Rating";

interface ProductProps {
  data: {
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}

export const Product = ({ data }: ProductProps) => {
  const { thumbnailAlt, thumbnailUrl, rating, description } = data;
  return (
    <>
      <img src={thumbnailUrl} alt={thumbnailAlt} />
      <p>{description}</p>
      <Rating rating={rating} />
    </>
  );
};
