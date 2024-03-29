import React from 'react';
import { PurchasedItem } from '../types/orderType';

const PurchasedItemDetails = (props: { item: PurchasedItem }) => {
  const { variantImage, productName, variantSKU, count, rowTotal } = props.item;

  return (
    <div className="purchasedItemDetails">
      <img src={variantImage.url} width="50px" height="50px" />
      <p>{productName}</p>
      <p>{!variantSKU ? '---' : variantSKU}</p>
      <p>{count}</p>
      <p>{rowTotal.string}</p>
    </div>
  );
};

export default PurchasedItemDetails;
