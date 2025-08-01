// client/src/components/ListingCard.jsx
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      {listing.images && listing.images.length > 0 && (
        <img src={`http://localhost:5000/${listing.images[0].image_url}`} alt={listing.title} />
      )}
      <h3>{listing.title}</h3>
      <p>${listing.price.toFixed(2)}</p>
      <Link to={`/listing/${listing.id}`}>View Details</Link>
    </div>
  );
}
