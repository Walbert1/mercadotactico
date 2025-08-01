// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { getAllListings } from '../services/listingService';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllListings()
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        setError('Failed to load listings.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Marketplace Listings</h1>
      <div className="listing-grid">
        {listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}
