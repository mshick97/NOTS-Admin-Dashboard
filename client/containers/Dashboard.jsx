import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import OverviewContainer from './OverviewContainer';
import OrdersContainer from './OrdersContainer';
import CustomerTable from '../components/CustomerTable';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { OVERVIEW_ROUTE, ORDERS_ROUTE, CUSTOMERS_ROUTE } from '../constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // For UI (the navigation buttons) to demonstrate what page the admin is on
  const activeStyle = {
    color: '#FFFFFF',
    backgroundColor: '#ad2525',
  };
  const inactiveStyle = {
    color: '#ad2525',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div id="dashboardContainer">
      <div id="groupedButtonsContainer">
        <div id="groupedButtonsBackgound">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              id="overviewButton"
              onClick={() => {
                navigate(OVERVIEW_ROUTE);
              }}
              style={path === '/overview' ? activeStyle : inactiveStyle}>
              Overview
            </Button>

            <Button
              id="ordersButton"
              onClick={() => {
                navigate(ORDERS_ROUTE);
              }}
              style={path === '/orders' ? activeStyle : inactiveStyle}>
              Orders
            </Button>

            <Button
              id="customersButton"
              onClick={() => {
                navigate(CUSTOMERS_ROUTE);
              }}
              style={path === '/customers' ? activeStyle : inactiveStyle}>
              Customers
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div id="tableContainer">
        <Routes>
          <Route path={OVERVIEW_ROUTE} element={<OverviewContainer />} />
          <Route path={ORDERS_ROUTE} element={<OrdersContainer />} />
          <Route path={CUSTOMERS_ROUTE} element={<CustomerTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
