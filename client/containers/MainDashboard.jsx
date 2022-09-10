import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import OverviewContainer from './OverviewContainer.jsx';
import OrdersContainer from './OrdersContainer.jsx';
import CustomTable from './CustomTable.jsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div id="dashboardContainer">
      <div id="groupedButtonsContainer">
        <div id="groupedButtonsBackgound">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button id="overviewButton" onClick={() => navigate('/overview')}>Overview</Button>
            <Button id="ordersButton" onClick={() => navigate('/orders')}>Orders</Button>
            <Button id="customersButton" onClick={() => navigate('/customers')}>Customers</Button>
          </ButtonGroup>
        </div>
      </div>

      <div id="tableContainer">
        <Routes>
          <Route path='/overview' element={<OverviewContainer />} />
          <Route path='/orders' element={<OrdersContainer />} />
          <Route path='/customers' element={<CustomTable />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard;
