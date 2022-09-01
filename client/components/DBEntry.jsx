import React, { useContext } from 'react';
import AuthContext from '../context/AuthProvider.jsx';
import axios from 'axios';


const DBEntry = (props) => {
  const { userId, getUpdatedData } = props; // for async function
  const { name, email, street1, street2, city, state, zip } = props;

  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;

  async function deleteUser() {
    const url = 'http://localhost:3000/client/delete-user'
    await axios.delete(url, {
      headers: {
        'authorization': accessToken
      },
      data: {
        source: userId
      }
    }).then(() => getUpdatedData())
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
