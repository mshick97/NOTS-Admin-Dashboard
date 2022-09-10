const axios = require('axios');
require('dotenv').config();

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const NOTS_HAIR_SITE_ID = process.env.NOTS_HAIR_SITE_ID;
const WEBFLOW_API_URL = 'https://api.webflow.com'

const overviewController = {};

overviewController.getTotalRevenue = async (req, res, next) => {
  // const overviewData = await axios.get(`${WEBFLOW_API_URL}/sites/${NOTS_HAIR_SITE_ID}/orders`, {
  //   headers: { 'Authorization': `Bearer ${WEBFLOW_API_KEY}` }
  // });

  // res.locals.overviewData = overviewData;
  return next();
}

module.exports = overviewController;