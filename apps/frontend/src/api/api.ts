// apps/frontend/src/api/api.ts
import axios from "../utils/axios.customize";

const API_BASE_URL = 'http://localhost:3000';
const PDF_ANALYSIS_URL = 'http://localhost:4500';

export interface TenderNoticeInterface {
  'title-titre-eng': string;
  'tenderStatus-appelOffresStatut-eng': string;
  'gsinDescription-nibsDescription-eng': string;
  'unspscDescription-eng': string;
  'noticeType-avisType-eng': string;
  'procurementMethod-methodeApprovisionnement-eng': string;
  'selectionCriteria-criteresSelection-eng': string;
  'limitedTenderingReason-raisonAppelOffresLimite-eng': string;
  'tradeAgreements-accordsCommerciaux-eng': string;
  'regionsOfOpportunity-regionAppelOffres-eng': string;
  'regionsOfDelivery-regionsLivraison-eng': string;
  'contractingEntityName-nomEntitContractante-eng': string;
  'contractingEntityAddressLine-ligneAdresseEntiteContractante-eng': string;
  'contractingEntityAddressCity-entiteContractanteAdresseVille-eng': string;
  'contractingEntityAddressProvince-entiteContractanteAdresseProvince-eng': string;
  'contractingEntityAddressCountry-entiteContractanteAdressePays-eng': string;
  'endUserEntitiesName-nomEntitesUtilisateurFinal-eng': string;
  'endUserEntitiesAddress-adresseEntitesUtilisateurFinal-eng': string;
  'contactInfoAddressLine-contactInfoAdresseLigne-eng': string;
  'contactInfoCity-contacterInfoVille-eng': string;
  'contactInfoProvince-contacterInfoProvince-eng': string;
  'contactInfoCountry-contactInfoPays-eng': string;
  'noticeURL-URLavis-eng': string;
  'attachment-piecesJointes-eng': string;
  'tenderDescription-descriptionAppelOffres-eng': string;
}

export const getaccountAPI = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/auth/account`);
  return response.data;
};

export const loginAPI = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password });
  return response;
};

export const fetchTendersAPI = async (params: Record<string, any>) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await axios.get(`${API_BASE_URL}/api/v1/tenders/search`, {
      params,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.data) {
      return { success: false, message: "Failed to fetch tenders" };
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.name === "AbortError") {
      return { success: false, message: "Search timed out after 5 seconds. Please try again." };
    }
    return { success: false, message: error.response?.data?.message || "Failed to fetch tenders" };
  }
};

export const forgotPasswordAPI = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/auth/forgotpassword`, { email });
  return response;
};

export const resetPasswordAPI = async (newPassword: string, refreshToken: string, accessToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/v1/auth/resetpassword`, { newPassword, refreshToken, accessToken });
  return response;
};

export const getCompletion = async () => {
  const response = await axios.post(`${API_BASE_URL}/api/completion`);
  return response.data;
};

export const getOpenTenderNoticesFromDB = async () => {
  const response = await axios.get(`${API_BASE_URL}/getOpenTenderNoticesFromDB`);
  return response?.data?.slice(0, 20);
};

export const generateLeads = async (formData: any) => {
  const response = await axios.post(`${API_BASE_URL}/generateLeads`, formData);
  return response.data;
};

export const getOpenTenderNotices = () => {
  window.location.href = `${API_BASE_URL}/getOpenTenderNotices`;
};

export const getFilteredTenderNoticesFromDB = async () => {
  const response = await axios.get(`${API_BASE_URL}/getFilteredTenderNoticesFromDB`);
  return response.data;
};

export const filterOpenTenderNotices = async (prompt: string) => {
  const response = await axios.post(`${API_BASE_URL}/filterOpenTenderNotices`, { prompt });
  return response.data;
};

export const getOpenTenderNoticesToDB = async () => {
  const response = await axios.post(`${API_BASE_URL}/getOpenTenderNoticesToDB`);
  return response.data;
};

export const analyzePdf = async (formData: FormData) => {
  const response = await axios.post(`${PDF_ANALYSIS_URL}/analyze_pdf`, formData);
  return response.data;
};

export const getRfpAnalysis = async (rfpData: any) => {
  const response = await axios.post(`${API_BASE_URL}/getRfpAnalysis`, rfpData);
  return response.data;
};

export const getBidsAPI = async (params: Record<string, any>) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/bids`, { params });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getSingleBidAPI = async (bidId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/bids/${bidId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateBidStatusAPI = async (bidId: string, newStatus: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/v1/bids/${bidId}`, { newStatus });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const sendBidNotificationsAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/bids/send-notifications`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateUserProfileAPI = async (profileData: any, accessToken: string | null) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/user/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};