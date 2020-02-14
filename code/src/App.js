import React, { useEffect, useState } from 'react'
import { HappyThoughts } from './HappyThoughts'
import { HappyForm } from './HappyForm'

import "./App.css";
import "./HappyThoughts.css";
import "./HappyForm.css";


export const App = () => {
  const [thoughts, setThoughts] = useState([])

  useEffect(() => {
    fetch("https://jennifershappythoughts.herokuapp.com/")
      .then(res => res.json()
        .then(json => setThoughts(json))
      )
  }, [])


  const onLiked = (thoughtId) => {
    console.log('Logging in the App.js')
    const updatedThoughts = thoughts.map(thought => {
      if (thought._id === thoughtId) {
        thought.hearts += 1
      }
      return thought
    })
    setThoughts(updatedThoughts)
  }



  return (
    <div className="mainContainer">
      <HappyForm />
      <div>
        {thoughts.map(thought => (
          <div>
            <HappyThoughts key={thought._id} thought={thought} onLiked={onLiked} />
          </div>
        ))}
      </div>

    </div>
  )
}
