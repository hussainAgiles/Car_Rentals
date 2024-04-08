import API from './APIClients';


export const handleReservationCard = async () => {
    try {
      const response = await API.get(
        `https://api.agilefleets.online/api/fetch-reservation-details`,
      );
      return response.data; // Adjust based on the actual structure of your API response
    } catch (error) {
      console.error('Error fetching resrvation:', error);
      throw error; // Rethrow the error to be caught by the calling code
    }
  };