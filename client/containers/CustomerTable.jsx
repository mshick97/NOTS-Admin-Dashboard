import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from '../components/DBEntry';
import TextField from '@mui/material/TextField';
import CustomSnackbar from '../components/CustomSnackbar';
import { debounce } from 'debounce';
import useGetCustomerData from '../api/useGetCustomerData';
import useFindUser from '../api/useFindUser';

const CustomerTable = () => {
  document.title = 'NOTS Admin | Customers';

  // Custom Axios API hooks that cache with React Query
  const getCustomerData = useGetCustomerData();
  const findUser = useFindUser();

  // For managing customers from getCustomerData function and findUser function
  const [customerList, setCustomerList] = useState([]);

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

  const handleSearch = () => {
    // when React renders a couple times this prevents extra rerenders on top of that
    if (findUser.data === undefined) return;

    // only want to rerender if the data coming back from the server has results
    if (findUser.data.length > 0) {
      return setCustomerList(findUser.data);
    }

    // if there is no data in the result because nothing was found, use cache / refetch to rerender
    if (findUser.data.length === 0) return setCustomerList(getCustomerData.data);
  };

  useEffect(() => {
    if (!getCustomerData.isLoading) {
      setCustomerList(getCustomerData.data);
    }
  }, [getCustomerData.isLoading]);

  useEffect(() => {
    if (!findUser.isLoading) {
      handleSearch();
    }
    // want to render an effect when the results from the server are back; without this useEffect the UI is one behind setState action... very weird
  }, [findUser.isLoading]);

  if (getCustomerData.isLoading) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id="loadingBox">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div id="table">
      <div id="tableHeadContainer">
        <h2 className="tableName">Customers</h2>
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" id="searchForm">
          <TextField
            id="outlined-basic"
            label="Search by email"
            variant="outlined"
            onChange={debounce(async (e) => {
              e.preventDefault(); // so user cannot hit enter and refresh page
              if (e.target.value === '') {
                return setCustomerList(getCustomerData.data);
              }
              return await findUser.mutateAsync(e);
            }, 500)}
          />
        </Box>
        <img
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
          id="refreshButton"
          onClick={getCustomerData.refetch}
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

      {customerList.map((customer, i) => {
        return (
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
            getCustomerData={getCustomerData.refetch}
            openSnackbar={openSnackbar}
          />
        );
      })}

      {open ? <CustomSnackbar handleSnackbarClose={handleSnackbarClose} message={snackbarMessage} severity={snackbarSeverity} /> : null}
    </div>
  );
};

export default CustomerTable;
