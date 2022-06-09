import React, { Component } from 'react';
import axios from 'axios';
import CustomizedSnackbars from './snackbar.jsx'

class DBEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userId, updateTable } = this.props;
    async function deleteUser() {
      const url = 'http://localhost:3000/client/delete-user'
      await axios.delete(url, {
        headers: {},
        data: {
          source: userId
        }
      }).then(() => updateTable())
    }

    return (
      <div id="entryContainer">
        <div className='deleteWrapper'>
          <img src='https://www.svgrepo.com/show/21045/delete-button.svg' className='deleteIcon' onClick={deleteUser} />
        </div>
        <div id="entryWrapper">
          <div className="entryBox">
            <p className='dataEntry'>{this.props.name}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.email}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.street1} {this.props.street2}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.city}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.state}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.zip}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DBEntry;