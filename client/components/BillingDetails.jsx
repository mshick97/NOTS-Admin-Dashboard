import React from 'react';

const BillingDetails = (props) => {
  const { name, address, email } = props;
  console.log(name, address, email);

  return (
    <div id="BillingDetails">
      <h3>Billing Details</h3>
      <p>Name: {name}</p>

      <div className="addressWrapper">
        <p>Address: </p>
        <div className="addressSpans">
          <span>{address.line1}</span>
          <span>{address.line2}</span>
          <span>
            {address.city} {address.state} {address.postalCode}
          </span>
        </div>
      </div>

      <p>Email: {email}</p>
    </div>
  );
};

export default BillingDetails;
