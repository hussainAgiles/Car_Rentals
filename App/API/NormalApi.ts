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


export const fetchResrvationDetails = async () => {
  try {
    const response = await API.get(
      Base_url + 'fetch-reservation-details',
    );
    console.log("response here ===  ",response.data.reservation_details)
    return response.data.reservation_details;
  } catch (error) {
    console.error('Error fetching Resrvations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchRentalDetails = async ({body}: {body: string}) => {
  try {
    const response = await API.get(
      Base_url + `edit-reservation-details/${body}`,
      
    );
    console.log("response here ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching Resrvations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};