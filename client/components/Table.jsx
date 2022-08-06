import React, { useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DBEntry from "./DBEntry.jsx";
import TextField from '@mui/material/TextField';

const Table = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = true;

  const getUpdatedData = async () => {
    try {
      const url = 'http://localhost:3000/client/customers';
      await axios.get(url).then(res => {
        setCustomers(customers => customers.push(res.data));
        setIsLoading(false);
      })
    }
    catch (err) {
      console.log(err.message);
    }
  }

  try {
    const url = 'http://localhost:3000/client/customers';
    axios.get(url).then(res => {
      setCustomers(customers => customers.push(res.data));
      setIsLoading(false);
    })
  }
  catch (err) {
    console.log(err.message);
  }

  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex' }} id='loadingBox'>
        <CircularProgress />
      </Box>
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
          updateTable={() => getUpdatedData()}
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
            id='searchForm'>
            <TextField id="outlined-basic" label="Search by email" variant="outlined" onChange={(e) => {
              const url = 'http://localhost:3000/client/find-user'
              const data = { email: e.target.value };
              axios.post(url, data).then(res => {
                if (res.data.length !== 0) setCustomers(customers => customers.push(res.data));
                if (res.data.length === 0) getUpdatedData();
              })
            }}
            />
          </Box>
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
            id='refreshButton'
            onClick={getUpdatedData}
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

export default Table;

// class Table extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       customers: [],
//       isLoading: true
//     }
//     this.getUpdatedData = this.getUpdatedData.bind(this);
//   }

//   async componentDidMount() {
//     try {
//       const url = 'http://localhost:3000/client/customers';
//       await axios.get(url).then(res => {
//         this.setState({ customers: res.data, isLoading: false });
//       })
//     }
//     catch (err) {
//       console.log(err.message);
//     }
//   }

//   async getUpdatedData() {
//     const customerArray = [];
//     try {
//       const url = 'http://localhost:3000/client/customers';
//       await axios.get(url).then(res => {
//         this.setState({ customers: res.data, isLoading: false });
//       })
//     }
//     catch (err) {
//       console.log(err.message);
//     }
//   }

//   render() {
//     const { isLoading, customers } = this.state;

//     const dbArray = [];
//     customers.forEach((customer, i) => {
//       dbArray.push(
//         <DBEntry
//           key={`Unique user ${i}`}
//           userId={customer._id}
//           name={customer.fullName}
//           email={customer.email}
//           street1={customer.street1}
//           street2={customer.street2}
//           city={customer.city}
//           state={customer.state}
//           zip={customer.zip}
//           updateTable={() => this.getUpdatedData()}
//         />
//       )
//     });

//     if (isLoading) {
//       return (
//         <Box sx={{ display: 'flex' }} id='loadingBox'>
//           <CircularProgress />
//         </Box>
//       )
//     }

//     return (
//       <div id="tableEntries">
//         <div id='tableHeadContainer'>
//           <h2 className="tableName">Customers</h2>
//           <Box
//             component="form"
//             sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
//             noValidate
//             autoComplete="off"
//             id='searchForm'>
//             <TextField id="outlined-basic" label="Search by email" variant="outlined" onChange={(e) => {
//               const url = 'http://localhost:3000/client/find-user'
//               const data = { email: e.target.value };
//               axios.post(url, data).then(res => {
//                 if (res.data.length !== 0) this.setState({ customers: res.data });
//                 if (res.data.length === 0) this.getUpdatedData();
//               })
//             }}
//             />
//           </Box>
//           <img
//             src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
//             id='refreshButton'
//             onClick={this.getUpdatedData}
//           />
//         </div>
//         <div id="entryHeadersWrapper">
//           <h5 className="tableHeading">Name</h5>
//           <h5 className="tableHeading">Email</h5>
//           <h5 className="tableHeading">Street</h5>
//           <h5 className="tableHeading">City</h5>
//           <h5 className="tableHeading">State</h5>
//           <h5 className="tableHeading">Zip</h5>
//         </div>
//         {dbArray}
//       </div>
//     )
//   }
// }

// export default Table;