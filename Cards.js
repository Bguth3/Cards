class Card {
 constructor(value, suit){
   if(!isNaN(Number(value)))
      this._value = Number(value)
   else if(typeof value === 'string'){
      this._value = determineValue(value)
    }
   else
     this._value = 0

  this._suit = suit
}

get suit(){
  return this._suit
}

get value(){
  return this._value
}
}

let determineValue = function(val){
  if(val == 'k' || val == 'K')
    return 13
  else if(val == 'j' || val == 'J')
    return 11
  else if(val == 'a' || val == 'A')
    return 14
  else if(val == 'q' || val == 'Q')
    return 12
  else{
    return 0
  }
}

let reverseDetermineValue = function(val){
  if(val == 13)
    return 'King'
  else if(val == 11)
    return 'Jack'
  else if(val == 14)
    return 'Ace'
  else if(val == 12)
    return 'Queen'
  else
    return val

}


let testForPair = function(c){
  let isPair = 0
  let counter = 0
  for(let i=0; i<c.length; i++){
    counter = 0
    isPair = c[i].value
    for(let ind=0; ind<c.length; ind++){

        if(isPair == c[ind].value){
        counter++
      }

      if(counter>=2) break
    }
    if(counter>=2) break
  }
  if(counter>=2)
  return isPair
  else {
    return 0
  }
}

let testForThrees = function(c, v){
  let arr = c.filter(function(card){
    return card.value != v
  })
  if(arr.length < 3){
    return v
  }

  let val = arr[0].value
  let counter = 0
  arr = arr.filter(function(card){
    return card.value == val
  })

if(arr.length == 3){
  return val
}
  else {
    return 0
  }
}

let testForFullHouse = function(three, c){
  let arr = c.filter(function(card){
    return card.value!=three
  })
  if(testForPair(arr))
    return(arr[0].value)
  else {
    return 0
  }
}

let testForTwoPairs = function(v, c){
  let arr = c.filter(function(card){
    return card.value!=v
  })
  let val2 = testForPair(arr)
  if(val2 != 0)
  return val2
  else {
    return 0
  }
}

let testFours = function(val, c){
  let arr = c.filter(function(card){
    return card.value != val
  })
  if(arr.length == 1){
  return val
}
  else {
    return 0
  }
}

let testForStraight = function(c){
   c.sort(function(card1, card2){
    return (card1.value - card2.value)
  })
  let total = 0

  for(let i=0; i<c.length; i++){
    total = total + c[i].value
  }
  if(total/5==c[2].value && c[0].value+4==c[4].value)
    return true
  else {
    return false
  }

}

let testForFlush = function(c){
  let type = c[0].suit
  let arr = c.filter(function(card){
    return card.suit == type
  })
  return (arr.length == c.length)

}

let testForRoyal = function(c){
  return (determineHighCard(c) == 14)
}

let determineHighCard = function(c){
  let high = c[0].value
  for(let i=0; i<c.length; i++){
    if(c[i].value > high)
      high = c[i].value
  }
  return high
}

let determineSuit = function(s){
  if(s == 'h' || s== 'H')
  return "Hearts"
  else if(s == 's' || s == 'S')
  return "Spades"
  else if(s == 'd' || s == 'D')
  return "Diamonds"
  else if(s == 'c' || s == 'C')
  return "Clubs"
  else {
    return 'Invalid suit'
  }
}

let testToRun = function(c){
let run = true
  try{
  c.forEach(function(card){
    if((determineSuit(card.suit)!= "Spades" && determineSuit(card.suit)!= "Hearts" &&
    determineSuit(card.suit)!= "Clubs" && determineSuit(card.suit)!= "Diamonds") ||
    (card.value < 2 || card.value > 14)){
      console.log(`Invalid card: ${card.value} of suit ${card.suit}`)
      run = false

    }
  })
}
catch(err){
  console.log('Not enough cards: you must use a five card hand')
  run = false
}
if(c.length!=5){
  console.log(`Invalid number of cards: ${cards.length}`)
  run = false
}
return run

}


let readline = require('readline')
let cards = [null, null, null, null, null]
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


rl.question('Input your hand: ', function(hand) {

  rl.close()
  let s = hand
  let str = s.split(" ")
  let ctr = 0
  str.forEach(function(s){
    s.trim()
    if(s.length!=0){
  cards[ctr] = new Card(s.substring(0,s.length-1), s.substring
    (s.length-1,s.length))
    ctr++
}
  })

  let runnable = testToRun(cards)
if(runnable){
  let pairVal = testForPair(cards)

  if(pairVal!=0) {
    let threeVal = testForThrees(cards,pairVal)
    if(threeVal!= 0 && threeVal!= pairVal){
        console.log(`Full house with three ${reverseDetermineValue(threeVal)}s and two ${reverseDetermineValue(pairVal)}s` )
      }
    else if(threeVal == pairVal){
        let secondPairVal = testForFullHouse(threeVal, cards)
          if(secondPairVal != 0){
          console.log(`Full house with three ${reverseDetermineValue(threeVal)}s and two ${reverseDetermineValue(secondPairVal)}s` )
        }
          else{
            let fourVal = testFours(threeVal, cards)
            if(fourVal!=0){
              console.log(`Four of a kind with four ${reverseDetermineValue(fourVal)}s`)
        }
            else{
              console.log(`Three of a kind with three ${reverseDetermineValue(threeVal)}s`)
      }
      }
    }
    else{
      let secondPairVal = testForTwoPairs(pairVal, cards)
        if(secondPairVal!=0){
        console.log(`Two Pairs: pair of ${reverseDetermineValue(pairVal)}s and a pair of ${reverseDetermineValue(secondPairVal)}s`)
      }
        else{
        console.log(`Pair of ${reverseDetermineValue(pairVal)}s`)
      }
    }


  }

  else {
    if(testForStraight(cards)){
      if(testForFlush(cards)){
        if(testForRoyal(cards)){
          console.log(`Royal flush with ${determineSuit(cards[0].suit)}!`)
        }
        else{
          console.log(`Straight flush with ${determineSuit(cards[0].suit)}!`)
        }
      }
      else{
        console.log('You have a straight!')
      }
    }

    else{
      if(testForFlush(cards)){
        console.log(`Flush with ${determineSuit(cards[0].suit)}`)
      }
      else{
        console.log(`Your high card is a ${reverseDetermineValue(determineHighCard(cards))}`)
      }
    }
  }
}
})
