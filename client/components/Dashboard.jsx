import React, { Component } from 'react';
import Table from './Table.jsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Dashboard = () => {
  return (
    <div id="dashboardContainer">
      <div id="groupedButtonsContainer">
        <div id="groupedButtonsBackgound">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button id="dashboardButton">Dashboard</Button>
            <Button id="ordersButton">Orders</Button>
            <Button id="customersButton">Customers</Button>
          </ButtonGroup>
        </div>
      </div>
      <div id="tableContainer">

      </div>
      <Table />
    </div>
  )
}

export default Dashboard;
