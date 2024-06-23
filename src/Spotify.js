import axios from 'axios';

const clientId = '75f92a6deb394a809a000fc9f9011725';
const clientSecret = 'bd331c8fd8c7433c88cd8937eac73519';

const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
    'grant_type': 'client_credentials'
  }), {
    headers: {
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
};

const getMusicData = async (accessToken) => {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      q: 'year:2023 market:IN',
      type: 'track',
      limit: 50
    }
  });
  return response.data.tracks.items;
};

export { getAccessToken, getMusicData };
