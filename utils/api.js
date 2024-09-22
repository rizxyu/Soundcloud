const apiEndpoint = 'https://api-id.wzblueline.xyz/';

const searchSoundCloud = async (title) => {
  const response = await fetch(`${apiEndpoint}/api/search/soundcloud?title=${title}`);
  const results = await response.json();
  return results;
};

const downloadSoundCloud = async (url) => {
  const response = await fetch(`${apiEndpoint}/api/dl/soundcloud?url=${url}`);
  const downloadLink = await response.json();
  return downloadLink;
};

export { searchSoundCloud, downloadSoundCloud }
