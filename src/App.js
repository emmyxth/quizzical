import React from "react"
import Question from "./components/Question"
import {decode} from 'html-entities'

export default function App() {
  const [gameActive, setActive] = React.useState(false)
  const [allQuestions, setAllQuestions] = React.useState([])
  const [checkAnswer, setCheckAnswer] = React.useState(false)
  const [countCorrect, setCorrect] = React.useState(0)

  const editedData = []
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(res => res.json())
      .then(data => {
        let id = 1
        data.results.forEach(element => {
          const allAnswers = []
          const random = Math.floor(Math.random() * 4) //position of correct answer, the rest is incorrect answers
          let j = 0;
          for (let i = 0; i < 4; i++) {
            if (i === random) {
              allAnswers.push(decode(element.correct_answer))
            }
            else {
              allAnswers.push(decode(element.incorrect_answers[j]))
              j++
            }
          }
          const questionObject = {
            question: decode(element.question),
            allAnswers: allAnswers,
            correctAnswer: element.correct_answer,
            chosenAnswer: "",
            id: id
          }
          id++
          editedData.push(questionObject)
        })
        setAllQuestions(editedData)
      })
  }, [gameActive])

  function handleClick() {
    setActive(true)
  }

  function handleCheck() { //change to checkNOW
    setCheckAnswer(prevCheck => !prevCheck)
  }

  function restart() {
    setActive(false)
    setCheckAnswer(false)
    setCorrect(0)
  }

  function handleCount(answer, questionId, correct) {
    setAllQuestions(prevQuestions => {
      return prevQuestions.map((question) => {
        return question.id === questionId ? {...question, chosenAnswer: answer} : question
      })
    })

    if (correct === answer) {
        setCorrect(prevCount => prevCount + 1)
      }
    }

  const questionSet = allQuestions.map((element) => {
    return (
    <Question 
      id={element.id}
      key={element.id}
      question={element.question}
      correctAnswer={element.correctAnswer}
      allAnswers={element.allAnswers}
      chosenAnswer={element.chosenAnswer}
      checkAnswer={checkAnswer}
      handleCount={handleCount}
      />
    )
  })



  return (
    <main>
      <img className="blob2" src="../images/blob 2.png"/>
      {gameActive && 
      <div>
        {questionSet}
        {checkAnswer && <h1>You got {countCorrect}/10 correct!</h1>}
        <div className="play--check--container">
          {checkAnswer ? 
          <button className="play--again--button" onClick={restart}>Play Again</button>
          :
          <button className="check--answer--button" onClick={handleCheck}>Check Answers</button>
          }
        </div>
      </div>}

      {!gameActive && 
      <div>
        <h1 className="welcome--header">Quizzical</h1>
        <h2 className="welcome--description">Let's test your general knowledge!</h2>
        <div className="welcome--button--container">
          <button onClick={handleClick} className="welcome--button">Start</button>
        </div>
      </div>}
      <img className="blob1" src="../images/blob 1.png"/>
    </main>
  )
}
