import React from 'react';

const DataCard = (props) => {
  const { heading, cardData } = props;

  return (
    <div className="DataCard">
      <div className="dataCardHeader">
        <p>{heading}:</p>
      </div>
      <p>{cardData}</p>
    </div>
  );
};

export default DataCard;
