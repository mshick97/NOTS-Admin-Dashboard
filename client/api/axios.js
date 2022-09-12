import axios from "axios";

const BASE_URL = 'https://us-central1-nots-admin-dashboard.cloudfunctions.net/server';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});