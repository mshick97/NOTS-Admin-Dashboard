import React from 'react'

const DataCard = (props) => {
  const { heading, cardData } = props;

  return (
    <div className='DataCard'>
      <p>{heading}: {cardData}</p>
    </div>
  )
}

export default DataCard;