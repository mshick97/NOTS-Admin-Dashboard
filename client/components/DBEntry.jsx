import React from 'react';

const DBEntry = (props) => {
  const { openSnackbar } = props;
  const { userId, deleteUser } = props; // for async function
  const { name, email, street1, street2, city, state, zip } = props;

  const handleDelete = async () => {
    const deleteResult = await deleteUser(userId);

    if (deleteResult.didDelete) {
      return openSnackbar(`User with email ${email} deleted`, 'success');
    }

    if (!deleteResult.didDelete) {
      return openSnackbar('Error deleting user from database', 'error');
    }
  };

  return (
    <div className="entryContainer">
      <div className="deleteWrapper">
        <img src="https://www.svgrepo.com/show/21045/delete-button.svg" className="deleteIcon" onClick={handleDelete} />
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
