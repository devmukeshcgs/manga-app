import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const searchManga = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

export const getMangaDetails = async (mangaId) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${mangaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    throw error;
  }
};

// Add more functions as needed

const getTokens = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', '<your_username>');
  params.append('password', '<your_password>');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  try {
    const response = await axios.post(
      'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
      params
    );
    const { access_token, refresh_token } = response.data;
    return { accessToken: access_token, refreshToken: refresh_token };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

// const fetchData = async () => {
//   try {
//     const response = await axios.get('https://api.mangadex.org/your-endpoint', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     // Handle response data
//   } catch (error) {
//     console.error('API request error:', error);
//     // Handle error
//   }
// };


// const refreshAccessToken = async (refreshToken) => {
//   const params = new URLSearchParams();
//   params.append('grant_type', 'refresh_token');
//   params.append('refresh_token', refreshToken);
//   params.append('client_id', '<your_client_id>');
//   params.append('client_secret', '<your_client_secret>');

//   try {
//     const response = await axios.post(
//       'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
//       params
//     );
//     const { access_token } = response.data;
//     return access_token;
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     throw error;
//   }
// };
