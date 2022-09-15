import axios from "axios";

const BASE_URL = 'https://us-central1-nots-admin-dashboard.cloudfunctions.net/server';

export const axiosPublic = axios.create({
  baseURL: BASE_URL
  // baseURL: 'http://localhost:3000',
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});