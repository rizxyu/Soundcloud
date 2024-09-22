import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchResults from '../components/SearchResults';

export default function SearchPage() {
  const router = useRouter();
  const { title } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (title) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`https://blueline-sandy.vercel.app/api/search/soundcloud?title=${encodeURIComponent(title)}`);
          setResults(response.data.result);
        } catch (err) {
          setError('Error fetching search results');
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [title]);

  return (
    <div className="container">
      <h1>Search Results for "{title}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
      }
