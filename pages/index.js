import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadData, setDownloadData] = useState(null);
  const router = useRouter();

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const soundCloudRegex = /^https:\/\/soundcloud\.com\/.+/;
    if (soundCloudRegex.test(input)) {
      try {
        const response = await axios.get(`https://api-id.wzblueline.xyz/api/dl/soundcloud?url=${encodeURIComponent(input)}`);
        setDownloadData(response.data.result);
      } catch (err) {
        setError('Failed to fetch download link');
      } finally {
        setLoading(false);
      }
    } else {
      router.push(`/search?title=${encodeURIComponent(input)}`);
    }
  };

  return (
    <div className="container">
      <h1>SoundCloud Downloader</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter SoundCloud link or search a song..."
          value={input}
          onChange={handleInput}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Go'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {downloadData && (
        <div className="download-result">
          <h2>{downloadData.title}</h2>
          <img src={downloadData.cover} alt={downloadData.title} />
          <a href={downloadData.music} download>
            Download Song
          </a>
        </div>
      )}
    </div>
  );
}
