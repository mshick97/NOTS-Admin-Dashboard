import React, { Component } from 'react';

class DBEntry extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="entryContainer">
        <div id="entryWrapper">
          <div className="entryBox">
            <p className='dataEntry'>{this.props.name}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.email}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.street1}</p>
          </div>
          <div className="entryBox">
            <p className='dataEntry'>{this.props.street2}</p>
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