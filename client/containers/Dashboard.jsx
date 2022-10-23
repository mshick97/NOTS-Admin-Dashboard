import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NotFound from '../components/NotFound';
import OverviewContainer from './OverviewContainer';
import OrdersContainer from './OrdersContainer';
import CustomerTable from './CustomerTable';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { OVERVIEW_ROUTE, ORDERS_ROUTE, CUSTOMERS_ROUTE } from '../constants';
import OrdersTable from '../components/OrdersTable';
import OrderDetails from './OrderDetails';

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
              // Have to slice to grab the first part of path so it works for all nested routes as well
              style={path.slice(0, 9) === '/overview' ? activeStyle : inactiveStyle}>
              Overview
            </Button>

            <Button
              id="ordersButton"
              onClick={() => {
                navigate(ORDERS_ROUTE);
              }}
              style={path.slice(0, 7) === '/orders' ? activeStyle : inactiveStyle}>
              Orders
            </Button>

            <Button
              id="customersButton"
              onClick={() => {
                navigate(CUSTOMERS_ROUTE);
              }}
              style={path.slice(0, 10) === '/customers' ? activeStyle : inactiveStyle}>
              Customers
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div id="tableContainer">
        <Routes>
          <Route path={OVERVIEW_ROUTE} element={<OverviewContainer />} />

          <Route path={ORDERS_ROUTE + '/*'} element={<OrdersContainer />}>
            <Route index element={<OrdersTable />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>

          <Route path={CUSTOMERS_ROUTE} element={<CustomerTable />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
