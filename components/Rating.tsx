interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return <p className="text-blue-600 font-bold">{rating}</p>;
};
