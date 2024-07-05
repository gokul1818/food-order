import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ rating }) => {
  const totalStars = 5; // Total number of stars

  // Generate an array of stars based on the rating
  const starsArray = Array.from({ length: totalStars }, (_, index) => {
    if (index < rating) {
      // Render a filled star if index is less than rating
      return <StarIcon key={index} sx={{ fontSize: "12px", color: "gold" }} />;
    } else {
      // Render an outline star if index is equal to or greater than rating
      return <StarOutlineIcon key={index} sx={{ fontSize: "12px" }} />;
    }
  });

  return (
    <div className="star-rating" style={{ display: "flex" }}>
      {starsArray}
    </div>
  );
};

export default StarRating;
