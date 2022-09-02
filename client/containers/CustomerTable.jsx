import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from '../context/AuthProvider.jsx';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from "../components/DBEntry.jsx";
import TextField from '@mui/material/TextField';
import { debounce } from "debounce";

const CustomerTable = () => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const accessToken = auth.accessToken;

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preSearchState, setPreSearchState] = useState([]);

  // If there is an error with the async request and refresh token has expired, navigate user to login but persist their state
  const navigate = useNavigate();
  const location = useLocation();

  async function getCustomerData() {
    const GET_CUSTOMERS_URL = '/customers';

    await axiosPrivate.get(GET_CUSTOMERS_URL)
      .then(res => {
        setCustomers(res.data.customers);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
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
          getCustomerData={() => getCustomerData()}
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

              const FIND_USER_URL = '/customers/find_user'
              const data = { email: e.target.value };

              axiosPrivate.post(FIND_USER_URL, data, {
                headers: {
                  'authorization': accessToken
                }
              }).then(res => {
                if (res.data.foundUser.length > 0) {
                  setPreSearchState(customers);
                  setCustomers(res.data.foundUser);
                }

                // To rerender the app to go back to the previous table of customers if no results are found
                if (res.data.foundUser.length === 0 && preSearchState.length !== 0) setCustomers(preSearchState);
              })
                .catch(err => {
                  console.log(err);
                  // refreshToken();
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