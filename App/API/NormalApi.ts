import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const fetchViolations = async (id:string) => {
  try {
    const response = await API.get(
      Base_url + `fetch-violation/${id}`,  
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Voilations :', error);
  }
}
// export const fetchInvoiceReport = async ({slug}: {slug: string}) => {
//  console.log("Slug === ",slug)
//   try {
//     const response = await API.get(
//       Base_url + `perfoma-invoice?invoiceslug=${slug}`, 
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Fleet reports :', error);
//     throw error; // Rethrow the error to be caught by the calling code
//   }
// };

// export const fetchAgreementReport = async ({slug}: {slug: string}) => {
 
//   try {
//     const response = await API.get(
//       Base_url + `fetch-agreement-details/${slug}`, 
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Fleet Agreement :', error);
//     throw error; // Rethrow the error to be caught by the calling code
//   }
// };

export const createVoilation = async ({body}: {body: object}) => {
  // console.log("Body received in api === ",body)
  try {
    const response =  await API.post(Base_url + 'create-violation?', body)
    // console.log("response here ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating Voilations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchViolationTypes = async () => {
  // console.log("enter")
  try {
    const response = await API.get(
      Base_url + `lookupdata/VIOLATIONS_TYPES`,  
    );
    return response.data.lookups;
  } catch (error) {
    console.error('Error fetching Voilation Types :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const deleteViolations = async (id:string) => {
  // console.log("Api delete == ",id)
  try {
    const response = await API.post(
      Base_url + `delete-violation/${id}`,  
    );
    // console.log("Response on delete === ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error Deleting Voilations :', error);
  }
}

export const fetchSvg = async (reservation_id: string) => {
  let body = {
    reservation_id:reservation_id
  }
  try {
    const response = await API.post(
      Base_url + 'fetch-updated-mobile-svg-layout', body
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Payment Status :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};


export const fetchCustomers = async () => {
  try {
    const response = await API.get(
      Base_url + `fetch-customers-and-counters-type`,  
    );
    // console.log("Normal api Violation types response ===  ",response.data)
    return response.data.customers;
  } catch (error) {
    console.error('Error fetching Customers:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};


export const createPenalties = async ({body}: {body: object}) => {
  // console.log("Body received in api === ",body)
  try {
    const response =  await API.post(Base_url + 'create-penalties?', body)
    // console.log("response here in Api ===  ",response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating Voilations :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchPenaltyTypes = async () => {
  try {
    const response = await API.get(
      Base_url + `lookupdata/PENALTIES_TYPES`,  
    );
    // console.log("enter 2")
    // console.log("Normal api Violation types response ===  ",response.data)
    return response.data.lookups;
  } catch (error) {
    console.error('Error Fetching Penalty Types :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchPenalty = async (id:string) => {
  try {
    const response = await API.get(
      Base_url + `fetch-penalties/${id}`,  
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching Penalty History :', error);
  }
}


export const fetchCustomer = async () => {
  
  try {
    const response = await API.get(
      Base_url + 'fetch-customers-and-counters-type', 
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Payment Status :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const deletePenalty = async (id:string) => {
  try {
    const response = await API.post(
      Base_url + `delete-penalties/${id}`,  
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching Penalty History :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const createDamage = async ({body}: {body: object}) => {
  try {
    const response = await API.post(
      Base_url + 'create-damage', body
    );
    console.log("responsedata",response.data)
    return response.data;

  } catch (error) {
    console.error('Error fetching Payment Status :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const deleteDamage = async (id: string) => {

  try {
    const response = await API.post(
      Base_url + 'delete-damage/'+ id
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Payment Status :', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchDefaultCurrency = async () => {
  try {
    const response = await API.get(
      Base_url + `fetch_default_currency`,  
    );
    // console.log("Fetching Currency",response.data)
    return response.data.parameter_value;
  } catch (error) {
    console.error('Error Fetching Currency:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const fetchMaintenanceReport = async () => {
  try {
    const response = await API.get(
      Base_url + `fetch-services`,  
    );
    // console.log("Fetching maintenance",response.data)
    return response.data;
  } catch (error) {
    console.error('Error Fetching Maintenance Report:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};







