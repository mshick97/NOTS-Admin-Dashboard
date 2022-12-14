import React from 'react';

const DataCard = (props: { heading: string; cardData: string; id: string }) => {
  const { heading, cardData } = props;

  return (
    <div className="DataCard">
      <div className="dataCardHeader">
        <p className="dataCardHeading">{heading}</p>
      </div>
      <p className="cardData">{cardData}</p>
    </div>
  );
};

export default DataCard;
