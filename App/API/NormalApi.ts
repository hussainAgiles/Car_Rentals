import API from './APIClients';
import { Base_url } from './Constants';


export const handleLogin = async ({body}: {body: object}) => {
  try {
    const response = await API.post(
      Base_url + 'login?',
      body,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching home promotion:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};