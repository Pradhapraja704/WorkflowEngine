import axios from "axios";

const API = "http://localhost:8080";

export const createRequest = (data) => {
  return axios.post(`${API}/requests`, data);
};

export const getRequests = () => {
  return axios.get(`${API}/requests`);
};

export const approveRequest = (id, role) => {
  return axios.put(`${API}/requests/${id}/approve?role=${role}`);
};

export const getExecutionLogs = (requestId) => {
  return axios.get(`${API}/logs/request/${requestId}`);
};