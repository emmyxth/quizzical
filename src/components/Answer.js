import React from "react"

export default function Answer(props) {
    let styles
    let textStyle
    if (!props.checkAnswer) {
        if (props.chosen === props.answerChoice) {
            styles = {
                backgroundColor: "#D6DBF5",
                borderColor: "#D6DBF5"
            }
        }
        else {
            styles = {
                backgroundColor: "#F5F7FB"
            }
        }
    }
    else if (props.chosen === props.answerChoice && props.answerChoice === props.correctAnswer) {
        styles = {
            backgroundColor: "#94D7A2",
            borderColor:"#94D7A2"
        }
    }
    else if (props.chosen === props.answerChoice && props.answerChoice !== props.correctAnswer) {
        styles = {
            backgroundColor: "#F8BCBC",
            color: "#8F95B0",
            borderColor:"#8F95B0"
        }
        textStyle = {
            color: "#8F95B0"
        }
    }
    else if (props.chosen !== props.answerChoice && props.answerChoice === props.correctAnswer) {
        styles = {
            backgroundColor: "#94D7A2",
            borderColor:"#94D7A2"
        }
    }
    else { //not clicked and not answer choice
        styles = {
            borderColor: "#8F95B0",
            color: "#white",
            backgroundColor: "#F5F7FB"
        }
        textStyle = {
            color: "#8F95B0"
        }
    }

    return (
    <div>
        <button className="answer--buttons" onClick={() => {props.handleCount(props.answerChoice, props.questionId, props.correctAnswer)}} style={styles}><h1 className="answer--text" style={textStyle}>{props.answerChoice}</h1></button>
    </div>
    )
}