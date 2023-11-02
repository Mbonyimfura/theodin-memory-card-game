import React from 'react'
import './SingleCard.css'
function Singlecard({card,handleChoice,flipped,disabled}) {
    const handleClick=()=>{
    if(!disabled){
      handleChoice(card)
    }
    }
  return (
    <div>
         <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
              <img className='front' src={card.src} alt='card front'/>
            </div>
            <div>
            <img className='back'
            src='/img/cover.png' 
            onClick={handleClick}
            alt='card back'></img>
            </div>
          </div> 
    </div>
  )
}

export default Singlecard