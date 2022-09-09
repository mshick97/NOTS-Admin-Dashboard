import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';


const DBEntry = (props) => {
  const { userId, getCustomerData } = props; // for async function
  const { name, email, street1, street2, city, state, zip } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();
  async function deleteUser() {
    const DELETE_CUSTOMER_URL = '/customers'
    await axiosPrivate.delete(DELETE_CUSTOMER_URL, {
      data: {
        source: userId
      }
    }).then(() => getCustomerData())
  }

  return (
    <div id="entryContainer">
      <div className='deleteWrapper'>
        <img src='https://www.svgrepo.com/show/21045/delete-button.svg' className='deleteIcon' onClick={deleteUser} />
      </div>
      <div id="entryWrapper">
        <div className="entryBox">
          <p className='dataEntry'>{name}</p>
        </div>
        <div className="entryBox">
          <p className='dataEntry'>{email}</p>
        </div>
        <div className="entryBox">
          <p className='dataEntry'>{street1} {street2}</p>
        </div>
        <div className="entryBox">
          <p className='dataEntry'>{city}</p>
        </div>
        <div className="entryBox">
          <p className='dataEntry'>{state}</p>
        </div>
        <div className="entryBox">
          <p className='dataEntry'>{zip}</p>
        </div>
      </div>
    </div>
  )
}

export default DBEntry;
