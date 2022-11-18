import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import "./Quiz.css"

// const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {

  const questions = useQuizQuestions()

  return (
    <>
      <QuizDisplay questions={questions}/>
    </>
  );
}

const QuizDisplay = ({questions})=>{     

    const [currentIndex, setCurrentIndex] =  useState(0)
    const [backButtonDisabled, setBackButtonDisabled] = useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    const [chosenAnswers, setChosenAnswers] = useState(new Array(questions.length))

    const numQuestions = questions.length
    

    const changeButtonsStateHandler = useCallback((index,chosenAnswers, numQuestions)=>{
        
        const backButtonPredicate = numQuestions===0 || index===0
        const nextButtonPredicate = numQuestions === 0 || chosenAnswers===undefined || (index+1)>=numQuestions

        console.log("chosenAnswers:", chosenAnswers===undefined, ", nextButtonPredicate: ", nextButtonPredicate)

        if(backButtonDisabled !== backButtonPredicate){
            setBackButtonDisabled(backButtonPredicate)
        }
        if(nextButtonDisabled !== nextButtonPredicate) {
            setNextButtonDisabled(nextButtonPredicate)
        }
             
    },[backButtonDisabled, nextButtonDisabled])

    const prevQuestion=()=>{
        setCurrentIndex(prev=>{
            const newCurrentIndex = prev-1
            changeButtonsStateHandler(newCurrentIndex, chosenAnswers[newCurrentIndex] , numQuestions)            
            return newCurrentIndex})        
    }
    const nextQuestion=()=>{        
        setCurrentIndex(prev=>{
            const newCurrentIndex = prev+1
            changeButtonsStateHandler(newCurrentIndex, chosenAnswers[newCurrentIndex] , numQuestions)            
            return newCurrentIndex})        
    }

    const onChosenAnswerHandler = (questionIndex, answerIndex)=>{        
        setChosenAnswers(prev => {
            const newChosenAnswers = [...prev]
            newChosenAnswers[questionIndex] = answerIndex
            changeButtonsStateHandler(currentIndex,newChosenAnswers[questionIndex] , numQuestions)
            return newChosenAnswers
        })         
    } 


    return (
        <>              
            <Question index={currentIndex} text={questions[currentIndex].question} answers={questions[currentIndex].answers} correctAnswer={questions[currentIndex].correctAnswer} onChosenAnswer={onChosenAnswerHandler} selectedAnswerIndex={chosenAnswers[currentIndex]}/>
            <button disabled={backButtonDisabled} onClick={prevQuestion}>Back</button>
            <button disabled={nextButtonDisabled} onClick={nextQuestion}>Next</button>
        </>
    )
}

const Question = ({index: questionIndex, text, answers, correctAnswer, onChosenAnswer, selectedAnswerIndex})=>{    

    return (
        <>
            <h1>{text}</h1>
            {answers.map((answer, index)=><Answer key={answer} 
            questionIndex={questionIndex}   
            answerIndex = {index}         
            text={answer}
            selectedAnswerIndex={selectedAnswerIndex}
            correctAnswer={correctAnswer} 
            onChosenAnswer={onChosenAnswer}/>)}
        </>
    )
}

const Answer = ({questionIndex, answerIndex, text, selectedAnswerIndex, correctAnswer, onChosenAnswer})=>{ 
    if(selectedAnswerIndex!==undefined){    
        if(answerIndex === selectedAnswerIndex){
            const classValue = answerIndex === correctAnswer ? "answer correct" : "answer incorrect"
            return (
                <h2 className={classValue}>{text}</h2>
            )
        }
        else{
            return (
                <h2 className="answer">{text}</h2>
            )
        }
                
    }
    else {
        return (
            <h2 className="answer" onClick={()=>onChosenAnswer(questionIndex, answerIndex)}>{text}</h2>
        )
    }
}

const useQuizQuestions = ()=>{

    const initialValue = {question:"", answers: [],correctAnswer: -1}
    const [quiz, setQuiz] = useState([initialValue])

    useEffect(()=>{
        const fetchData = async ()=>{
            // const quizResponse = await fetch(QUIZ_API_BASE_URL)
            // const quiz = await quizResponse.json()
            // setQuiz(quiz)
            setQuiz([{"question":"Which of the following is a built-in React hook?","answers":["useState","useFetch","useLocalStorage","useTimeout"],"correctAnswer":0},{"question":"What is the correct order of these lifecycle phases?","answers":["unmount, update, mount","mount, update, unmount","update, mount, unmount","mount, unmount, update"],"correctAnswer":1},{"question":"What is reconciliation?","answers":["The process of converting the virtual DOM to DOM nodes.","The process of combining two virtual DOM trees into one.","The algorithm used by React to determine which state updates to batch together.","The algorithm used by React to determine which elements changed between renders."],"correctAnswer":3}])
        }
        fetchData()
     },[])

     return quiz     
}