import axios from "axios";
require('dotenv').config();

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : 'https://us-central1-nots-admin-dashboard.cloudfunctions.net/server';

export const axiosPublic = axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});