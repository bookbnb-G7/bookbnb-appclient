// Request data from the Facebook Graph API.
// Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
async function requestFBEmailAsync(token) {
  const response = await fetch(
    `https://graph.facebook.com/me?fields=email&access_token=${encodeURIComponent(token)}`
  );
  const body = await response.json();
  return body;
}

export default requestFBEmailAsync;