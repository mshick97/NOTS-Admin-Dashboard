import axios from "axios";

const BASE_URL = 'https://us-central1-nots-admin-dashboard.cloudfunctions.net/server';

export const axiosPublic = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});