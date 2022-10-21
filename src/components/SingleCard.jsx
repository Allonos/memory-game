import React from 'react'
import classes from './SingleCard.module.css';

function SingleCard({ handleChoice, disabled, flipped, ...rest }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(rest.card);
    }
  }

  return (
    <div className={classes.card}>
      <div className={`${flipped ? classes.flipped : ''}`}>
        <img className={classes.front} src={rest.card.url} alt='card font' />
        <img
          className={classes.back}
          src={rest.coverImg}
          onClick={handleClick}
          alt='card back'
        />
      </div>
    </div >
  )
}

export default SingleCard