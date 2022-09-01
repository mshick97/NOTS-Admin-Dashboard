import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider.jsx';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from "../components/DBEntry.jsx";
import TextField from '@mui/material/TextField';
import { debounce } from "debounce";

const CustomerTable = () => {
  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preSearchState, setPreSearchState] = useState([]);

  async function getCustomerData() {
    const url = '/client/customers';

    await axios.get(url, {
      headers: {
        'authorization': accessToken
      }
    })
      .then(res => {
        setCustomers(res.data.customers);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });

    return;
  }

  useEffect(() => {
    getCustomerData();
  }, []);


  if (isLoading === true) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id='loadingBox'>
          <CircularProgress />
        </Box>
      </div>
    )
  }


  if (isLoading === false) {
    const dbArray = [];

    customers.forEach((customer, i) => {
      dbArray.push(
        <DBEntry
          key={`Unique user ${i}`}
          userId={customer._id}
          name={customer.fullName}
          email={customer.email}
          street1={customer.street1}
          street2={customer.street2}
          city={customer.city}
          state={customer.state}
          zip={customer.zip}
          getUpdatedData={() => getUpdatedData()}
        />
      )
    });

    return (
      <div id="tableEntries">

        <div id='tableHeadContainer'>
          <h2 className="tableName">Customers</h2>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            id='searchForm'
          >
            <TextField id="outlined-basic" label="Search by email" variant="outlined" onChange={debounce(e => {
              e.preventDefault();

              const url = '/client/find-user'
              const data = { email: e.target.value };

              axios.post(url, data, {
                headers: {
                  'authorization': accessToken
                }
              }).then(res => {
                if (res.data.foundUser.length > 0) {
                  setPreSearchState(customers);
                  setCustomers(res.data.foundUser)
                }

                // To rerender the app to go back to the previous table of customers if no results are found
                if (res.data.foundUser.length === 0 && preSearchState.length !== 0) setCustomers(preSearchState);
              })
            }, 500)
            }
            />
          </Box>
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
            id='refreshButton'
            onClick={() => getCustomerData()}
          />
        </div>

        <div id="entryHeadersWrapper">
          <h5 className="tableHeading">Name</h5>
          <h5 className="tableHeading">Email</h5>
          <h5 className="tableHeading">Street</h5>
          <h5 className="tableHeading">City</h5>
          <h5 className="tableHeading">State</h5>
          <h5 className="tableHeading">Zip</h5>
        </div>
        {dbArray}
      </div>
    )
  }
}

export default CustomerTable;