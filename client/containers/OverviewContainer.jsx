import React from 'react';
import useTestStripe from '../api/useTestStripe';

const OverviewContainer = () => {
  document.title = 'NOTS Admin | Overview';

  // const stripeTest = useTestStripe();

  // if (!stripeTest.isLoading) console.log(stripeTest.data);

  return (
    <div id="OverviewContainer">
      <h1>Overview Container</h1>
    </div>
  );
};

export default OverviewContainer;
