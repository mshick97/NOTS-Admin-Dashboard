import React from 'react';
import { BillingAddress } from '../types/orderType';

interface BillingDetailsProps {
  name: string;
  address: BillingAddress;
  email: string;
}

const BillingDetails = (props: BillingDetailsProps) => {
  const { name, address, email } = props;

  return (
    <div id="billingDetails">
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
