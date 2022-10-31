const mockData = require('../functions/orderDataMock.json');

let avgOrderVal = 0;
let avrOrderSize = 0;

const averagingFunction = (orderData) => {
  let totalPaid = 0;
  let totalOrderedItems = 0;

  for (const customerPurchase in orderData) {
    totalPaid += orderData[customerPurchase].customerPaid.value;
    orderData[customerPurchase].purchasedItems.forEach((item) => {
      return (totalOrderedItems += item.count);
    });
  }

  // Takes total of all orders and divides this by number of orders
  avgOrderVal = Math.round((totalPaid / orderData.length) * 100) / 100;
  // Takes every item ordered in all orders and divides them by the amount of orders
  avrOrderSize = Math.round((totalOrderedItems / orderData.length) * 100) / 100;

  // dispatch({ type: SET_AVG_ORDER_VAL, payload: avgOrderVal });
  // dispatch({ type: SET_AVG_ORDER_SIZE, payload: avrOrderSize });
  return totalOrderedItems;
};

describe('Tests: OrdersTable component', () => {
  averagingFunction(mockData);

  test('should return average of all orders size', () => {
    expect(avrOrderSize).toBe(1.29);
  });

  test('should return average of all orders value', () => {
    expect(avgOrderVal).toBe(3.59);
  });
});
