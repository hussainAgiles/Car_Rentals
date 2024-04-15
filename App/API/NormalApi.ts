import API from './APIClients';
import {Base_url} from './Constants';

export const handleLogin = async ({body}: {body: object}) => {
  try {
    const response = await API.post(Base_url + 'login?', body);
    return response.data;
  } catch (error) {
    console.error('Error fetching home promotion:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchResrvationDetails = async () => {
  try {
    const response = await API.get(Base_url + 'fetch-reservation-details');
    // console.log('response here ===  ', response.data.reservation_details);
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
    // console.log('response here ===  ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Resrvations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchInsurance = async ({body}: {body: string}) => {
  try {
    const response = await API.get(
      Base_url + `fetch-insurance-details/${body}`,
    );
    // console.log("response here ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching Resrvations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const handleAddons = async ({
  model_id,
  frequency,
}: {
  model_id: string;
  frequency: string;
}) => {
  try {
    const response = await API.get(
      Base_url + `vehicle-addons/${model_id}/${frequency}`,
    );
    // console.log("response here ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching Resrvations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const createPayment = async ({body}: {body: object}) => {
  try {
    const response = await API.post(Base_url + 'create-payment?', body);
    // console.log('payment creation response here ===  ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching home Payment:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
}

export const fetchPayments = async (id: string) => {
  try {
    const response = await API.get(
      Base_url + `fetch-payment/${id}`,
    );
    // console.log("payment history ===  ",response.data.reservation_payment)
    return response.data;
  } catch (error) {
    console.error('Error fetching Payment history :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const updatePayment = async ({body}: {body: object}) => {
  try {
    const response = await API.post(
      Base_url + 'update-payment-status?', body
    );
    // console.log("Status changed response ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching Payment Status :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchFleetReport = async () => {
  try {
    const response = await API.get(
      Base_url + `fetch-all-fleet-master`,  
    );
    // console.log("response here ===  ",response.data)
    return response.data.fleet_details;
  } catch (error) {
    console.error('Error fetching Fleet reports :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};




