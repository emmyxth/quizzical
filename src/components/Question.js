import React from "react"
import Answer from "./Answer"

export default function Question(props) {
    let id = 0
    const rawAnswers = props.allAnswers
    const formattedAnswers = rawAnswers.map((answer) => {
        id++
        return (
            <div>
                <Answer
                answerChoice={answer}
                correctAnswer={props.correctAnswer}
                chosen={props.chosenAnswer} //CHANGE
                checkAnswer={props.checkAnswer}
                questionId={props.id}
                handleCount={props.handleCount}
                key={id}
            />
            </div>
        )
    })

    return (
        <div>
            <div className="question--text">
                <h1>{props.question}</h1>
            </div>
            <div className="answers--container"> 
                {formattedAnswers}
            </div>
            <hr />
        </div>
    )
}