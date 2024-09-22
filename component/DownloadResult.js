export default function DownloadResult({ data }) {
  return (
    <div className="download-result">
      <h2>{data.title}</h2>
      <img src={data.cover} alt={data.title} />
      <a href={data.music} download>
        Download Song
      </a>
    </div>
  );
}
