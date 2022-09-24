import React from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import OverviewContainer from './OverviewContainer.jsx';
import OrdersContainer from './OrdersContainer.jsx';
import CustomerTable from '../components/CustomerTable.jsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // For UI (the navigation buttons) to demonstrate what page the admin is on
  const activeStyle = {
    color: '#FFFFFF',
    backgroundColor: '#ad2525'
  };
  const inactiveStyle = {
    color: '#ad2525',
    backgroundColor: '#FFFFFF'
  };
  
  return (
    <div id="dashboardContainer">
      <div id="groupedButtonsContainer">
        <div id="groupedButtonsBackgound">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              id="overviewButton"
              onClick={() => {navigate('/overview')}}
              style={path === '/overview' ? activeStyle : inactiveStyle}>
              Overview
            </Button>

            <Button
              id="ordersButton"
              onClick={() => navigate('/orders')}
              style={path === '/orders' ? activeStyle : inactiveStyle}>
              Orders
            </Button>

            <Button
              id="customersButton"
              onClick={() => navigate('/customers')}
              style={path === '/customers' ? activeStyle : inactiveStyle}>
              Customers
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div id="tableContainer">
        <Routes>
          <Route path='/overview' element={<OverviewContainer />} />
          <Route path='/orders' element={<OrdersContainer />} />
          <Route path='/customers' element={<CustomerTable />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard;
