import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from './DBEntry.jsx';
import TextField from '@mui/material/TextField';
import CustomSnackbar from './CustomSnackbar.jsx';
import useErrorRedirect from '../hooks/useErrorRedirect.jsx';
import { debounce } from 'debounce';

const CustomerTable = () => {
  document.title = 'NOTS Admin | Customers';

  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  // For managing customers from getCustomerData function and findUser function
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preSearchState, setPreSearchState] = useState([]);

  // For custom snackbar
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    setOpen(false);
  };

  async function getCustomerData() {
    const GET_CUSTOMERS_URL = '/api/users';

    await axiosPrivate
      .get(GET_CUSTOMERS_URL)
      .then((res) => {
        setCustomers(res.data.customers);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        redirect(err);
      });

    return;
  }

  async function findUser(e) {
    const FIND_USER_URL = '/api/users/find_user';
    const data = { email: e.target.value };

    await axiosPrivate
      .post(FIND_USER_URL, data)
      .then((res) => {
        if (res.data.foundUser.length > 0) {
          setPreSearchState(customers);
          setCustomers(res.data.foundUser);
        }

        // To rerender the app to go back to the previous table of customers if no results are found
        if (res.data.foundUser.length === 0 && preSearchState.length !== 0) setCustomers(preSearchState);
      })
      .catch((err) => {
        console.log(err);
        redirect(err);
      });
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  if (isLoading) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id="loadingBox">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!isLoading) {
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
          getCustomerData={() => getCustomerData()}
          openSnackbar={openSnackbar}
        />
      );
    });

    return (
      <div id="table">
        <div id="tableHeadContainer">
          <h2 className="tableName">Customers</h2>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" id="searchForm">
            <TextField
              id="outlined-basic"
              label="Search by email"
              variant="outlined"
              onChange={debounce((e) => {
                // e.preventDefault();
                findUser(e);
              }, 500)}
            />
          </Box>
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
            id="refreshButton"
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

        {open ? <CustomSnackbar handleSnackbarClose={handleSnackbarClose} message={snackbarMessage} severity={snackbarSeverity} /> : null}
      </div>
    );
  }
};

export default CustomerTable;
