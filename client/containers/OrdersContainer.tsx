import React from 'react';
import { Outlet } from 'react-router-dom';

const OrdersContainer = () => {
  document.title = 'NOTS Admin | Orders';

  return (
    <section id="ordersContainer">
      <h2 className="tableName">Orders</h2>
      <Outlet />
    </section>
  );
};

export default OrdersContainer;
