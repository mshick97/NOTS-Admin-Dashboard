import React from 'react';

interface DBEntryProps {
  openSnackbar: (snackbarMessage: string, snackbarSeverity: string) => void;
  userId: string;
  deleteUser: (userId: string) => Promise<{ didDelete: boolean }>;
  name: string;
  email: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

const DBEntry = (props: DBEntryProps) => {
  const { openSnackbar, userId, deleteUser, name, email, street1, street2, city, state, zip } = props; // userId and deleteUser for async function

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
