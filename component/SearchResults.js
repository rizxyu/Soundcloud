export default function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((track, index) => (
        <div key={index} className="track-card">
          <img src={track.thumbnail} alt={track.title} />
          <div className="track-info">
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
            <a href={track.link} target="_blank" rel="noopener noreferrer">
              View on SoundCloud
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
