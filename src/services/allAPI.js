import serverURL from '../services/serverURL'
import commonAPI from './commonAPI'

// registerAPI
export const registerAPI = async (reqBody) =>{
    return await commonAPI("POST", `${serverURL}/auth/signup`,reqBody)
}

// loginAPI
export const loginAPI = async (reqBody) =>{
    return await commonAPI("POST", `${serverURL}/auth/login`,reqBody)
}

// getUserAPI
export const getUserAPI = async (userId) =>{
    return await commonAPI("GET", `${serverURL}/auth/getuser/${userId}`,null)
}

// createPrescription
export const createPrescriptionAPI = async (reqBody) =>{
    return await commonAPI("POST", `${serverURL}/pre/create-pre`,reqBody)
}

// getPrescription
export const getPrescriptionAPI = async (presId) =>{
    return await commonAPI("GET", `${serverURL}/pre/get-pre/${presId}`,null)
}

// editPrescrption
export const editPrescriptionAPI = async (id, reqBody) =>{
    return await commonAPI("PUT", `${serverURL}/pre/edit-pre/${id}`,reqBody)
}

// getAllPresciptions
export const getAllPrescriptionsAPI = async (userId) =>{
    return await commonAPI("GEt", `${serverURL}/pre/get-allpre/${userId}`)
}

// getMedicineRecommentation
export const getMedicineRecommentationAPI = async (query) => {
  try {
    const res = await fetch(
      `https://api.fda.gov/drug/ndc.json?search=generic_name:${query}*&limit=10`
    );
    const data = await res.json();

    const meds = data.results?.map((item) => item.generic_name)?.flat() || [];

    const clean = [...new Set(meds)]
      .filter((name) => /^[a-zA-Z\s\-]+$/.test(name) && name.length < 50)
      .map((name) => ({ name }));

    return clean;
  } catch (err) {
    console.error("OpenFDA API error:", err);
    return [];
  }
};


