import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from "./DBEntry.jsx";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoading: true
    }
  }

  async componentDidMount() {
    const customerArray = [];
    try {
      const url = 'http://localhost:3000/client/customers';
      await axios.get(url).then(res => {
        this.setState({ customers: res.data, isLoading: false });
      })
    }
    catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { isLoading, customers } = this.state;

    const dbArray = [];
    customers.forEach(customer => {
      dbArray.push(
        <DBEntry
          key={`Customer key ${customer._id}`}
          name={customer.fullName}
          email={customer.email}
          street1={customer.street1}
          street2={customer.street2}
          city={customer.city}
          state={customer.state}
          zip={customer.zip}
        />
      )
    });

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )
    }

    return (
      <div id="tableEntries">
        <h2>Customers</h2>
        <div id="entryHeadersWrapper">
          <h5 className="tableHeading">Name</h5>
          <h5 className="tableHeading">Email</h5>
          <h5 className="tableHeading">Street 1</h5>
          <h5 className="tableHeading">Street 2</h5>
          <h5 className="tableHeading">City</h5>
          <h5 className="tableHeading">State</h5>
          <h5 className="tableHeading">Zip</h5>
        </div>
        {dbArray}
      </div>
    )
  }
}

export default Table;