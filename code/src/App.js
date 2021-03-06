import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { HappyThoughts } from './components/HappyThoughts'
import { HappyForm } from './components/HappyForm'
import './styling/App.css';
import './styling/HappyThoughts.css';
import './styling/HappyForm.css';

export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [updated, setUpdated] = useState('')

  useEffect(() => {
    fetch('https://jennifershappythoughts.herokuapp.com/')
      .then((res) => res.json()
        .then((json) => setThoughts(json))
        .then((json) => setUpdated(Date.now()))
      )
  }, [])

  const onLiked = (thoughtId) => {
    const updatedThoughts = thoughts.map((thought) => {
      if (thought._id === thoughtId) {
        thought.heart += 1
      }
      return thought
    })
    setThoughts(updatedThoughts)
  }

  return (
    <div className="mainContainer">
      <HappyForm />
      <div>
        {thoughts.map((thought) => (
          <div>
            <HappyThoughts
              key={thought._id}
              thought={thought}
              onLiked={onLiked} />
          </div>
        ))}

      </div>
      <p>{moment(updated).fromNow()}</p>
    </div>
  )
}
