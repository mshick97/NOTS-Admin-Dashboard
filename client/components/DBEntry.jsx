import React from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import useErrorRedirect from '../hooks/useErrorRedirect.jsx';

const DBEntry = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const { openSnackbar } = props;
  const { userId, getCustomerData } = props; // for async function
  const { name, email, street1, street2, city, state, zip } = props;

  async function deleteUser() {
    const DELETE_CUSTOMER_URL = `/api/users/${userId}`;

    await axiosPrivate
      .delete(DELETE_CUSTOMER_URL)
      .then(() => {
        openSnackbar(`User with email ${email} deleted`, 'success');
        getCustomerData();
      })
      .catch((err) => {
        console.log(err);
        openSnackbar('Error deleting user from database', 'error');
        redirect(err);
      });
  }

  return (
    <div id="entryContainer">
      <div className="deleteWrapper">
        <img src="https://www.svgrepo.com/show/21045/delete-button.svg" className="deleteIcon" onClick={deleteUser} />
      </div>
      <div id="entryWrapper">
        <div className="entryBox">
          <p className="dataEntry">{name}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{email}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">
            {street1} {street2}
          </p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{city}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{state}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{zip}</p>
        </div>
      </div>
    </div>
  );
};

export default DBEntry;
