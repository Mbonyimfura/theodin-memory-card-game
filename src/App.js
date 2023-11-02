import './App.css'
import {useEffect, useState} from 'react';
import Singlecard from './components/Singlecard';
const cardImages=[
  {'src':'/img/helmet-1.png',matched:false},
  {'src':'/img/potion-1.png',matched:false},
  {'src':'/img/ring-1.png',matched:false},
  {'src':'/img/scroll-1.png',matched:false},
  {'src':'/img/shield-1.png',matched:false},
  {'src':'/img/sword-1.png',matched:false},
]
function App() {
const [cards,setCards] = useState([]);
const [turns,setTurns] = useState(0);
const [choiceOne,setChoiceOne] = useState(null);
const [choiceTwo,setChoiceTwo] = useState(null);
const [disabled,setDisbled] = useState(false);
  //Shuffle cards
  const shuffleCards=()=>{
    const shuffledCard=[...cardImages,...cardImages]
    .sort(()=>Math.random() - 0.5)
    .map((card)=>({...card, id: Math.random()}));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCard);
    setTurns(0);
  }
  //handle choice
  const handleChoice=(card)=>{
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compare two selected choice
  useEffect(()=>{
   if( choiceOne && choiceTwo){
    setDisbled(true)
    if(choiceOne.src === choiceTwo.src){
    setCards(prevCards=>{
      return prevCards.map(card=>{
        if(card.src === choiceOne.src){
          return { ...card, matched:true}
        }else{
          return card
        }
      })
    })
      resetTurn()
    }else{
  
    setTimeout(()=>  resetTurn(),1000)
    }
  
   }
  },[choiceOne,choiceTwo])

  //reset choices and increase turn
  const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns + 1)
    setDisbled(false)
  }
  //start newe game automatically
  useEffect(()=>{
    shuffleCards();
  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card=>(
        <Singlecard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}/>
        
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App