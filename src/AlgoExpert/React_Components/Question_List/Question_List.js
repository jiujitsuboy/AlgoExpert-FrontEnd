import React, { useEffect, useState } from "react";
import classes from "./Question_List.module.css"

// const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
// const SUBMISSIONS_API_BASE_URL =
//   "https://api.frontendexpert.io/api/fe/submissions";

const createCategoryMap = (categories) => {
  
  const questionMap = new Map();

  categories.forEach((question) => {
    if (questionMap.has(question.category)) {
      const prevArray = [...questionMap.get(question.category)];
      prevArray.push({ name: question.name, id: question.id });
      questionMap.set(question.category, prevArray);
    } else {
      questionMap.set(question.category, [
        { name: question.name, id: question.id },
      ]);
    }
  });

  return questionMap;
};

const createSubmissionMap = (submissions) => {
  const submissionsMap = new Map();

  submissions.forEach((submission) => {
    submissionsMap.set(submission.questionId, submission.status);
  });

  return submissionsMap;
};

export default function QuestionList() {
  // Write your code here.

  const [questions, setQuestions] = useState(new Map());
  const [submissions, setSubmissions] = useState(new Map());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const questionsResp = await fetch(QUESTIONS_API_BASE_URL)
        // const questionsJson = await questionsResp.json()

        // const submissionsResp = await fetch(SUBMISSIONS_API_BASE_URL)
        // const submissionsJson = await submissionsResp.json()
        const questionsJson = [
          { id: "sign-up-form", name: "Sign-Up Form", category: "HTML" },
          { id: "item-cart", name: "Item Cart", category: "HTML" },
          {
            id: "spaghetti-recipe",
            name: "Spaghetti Recipe",
            category: "HTML",
          },
          { id: "blog-post", name: "Blog Post", category: "HTML" },
          { id: "rainbow-circles", name: "Rainbow Circles", category: "CSS" },
          { id: "navbar", name: "Navbar", category: "CSS" },
          { id: "pig-emoji", name: "Pig Emoji", category: "CSS" },
          { id: "purchase-form", name: "Purchase Form", category: "CSS" },
          {
            id: "algoexpert-products",
            name: "AlgoExpert Products",
            category: "CSS",
          },
          {
            id: "testing-framework",
            name: "Testing Framework",
            category: "JavaScript",
          },
          {
            id: "array-methods",
            name: "Array Methods",
            category: "JavaScript",
          },
          { id: "event-target", name: "Event Target", category: "JavaScript" },
          { id: "debounce", name: "Debounce", category: "JavaScript" },
          { id: "this-binding", name: "This Binding", category: "JavaScript" },
          { id: "promisify", name: "Promisify", category: "JavaScript" },
          { id: "throttle", name: "Throttle", category: "JavaScript" },
          { id: "curry", name: "Curry", category: "JavaScript" },
          {
            id: "infinite-scroll",
            name: "Infinite Scroll",
            category: "DOM Manipulation",
          },
          { id: "stopwatch", name: "Stopwatch", category: "DOM Manipulation" },
          {
            id: "tic-tac-toe",
            name: "Tic Tac Toe",
            category: "DOM Manipulation",
          },
          { id: "todo-list", name: "Todo List", category: "DOM Manipulation" },
          { id: "typeahead", name: "Typeahead", category: "DOM Manipulation" },
          { id: "tier-list", name: "Tier List", category: "DOM Manipulation" },
          { id: "toasts", name: "Toasts", category: "DOM Manipulation" },
          { id: "sudoku", name: "Sudoku", category: "DOM Manipulation" },
          {
            id: "questions-list",
            name: "Questions List",
            category: "DOM Manipulation",
          },
        ];
        const submissionsJson = [
          { questionId: "blog-post", status: "CORRECT" },
          { questionId: "throttle", status: "INCORRECT" },
          { questionId: "stopwatch", status: "PARTIALLY_CORRECT" },
          { questionId: "pig-emoji", status: "CORRECT" },
          { questionId: "todo-list", status: "CORRECT" },
          { questionId: "testing-framework", status: "CORRECT" },
          { questionId: "array-methods", status: "INCORRECT" },
          { questionId: "spaghetti-recipe", status: "PARTIALLY_CORRECT" },
          { questionId: "algoexpert-products", status: "PARTIALLY_CORRECT" },
          { questionId: "curry", status: "CORRECT" },
          { questionId: "toasts", status: "INCORRECT" },
          { questionId: "tic-tac-toe", status: "CORRECT" },
          { questionId: "event-target", status: "CORRECT" },
          { questionId: "debounce", status: "PARTIALLY_CORRECT" },
          { questionId: "item-cart", status: "CORRECT" },
          { questionId: "typeahead", status: "CORRECT" },
          { questionId: "tier-list", status: "PARTIALLY_CORRECT" },
          { questionId: "sudoku", status: "CORRECT" },
          { questionId: "rainbow-circles", status: "INCORRECT" },
          { questionId: "infinite-scroll", status: "CORRECT" },
          { questionId: "navbar", status: "PARTIALLY_CORRECT" },
        ];

        const categoriesMap = createCategoryMap(questionsJson);
        const submissionsMap = createSubmissionMap(submissionsJson);

        setQuestions(categoriesMap);
        setSubmissions(submissionsMap);
      } catch (e) {
        console.log(e);
      }
    };
    fetchQuestions();
  }, []);

  //Mi error fue no utilizar mas componentes. Decidi crear un arreglo con los divs necesarios, y aunque funciona, no respeta el principio de componentes de React
  let elements = [];

  questions.forEach((values, key) => {
    
    let totalCorrect = values
      .map(value=>submissions.get(value.id))
      .filter((value) => value === "CORRECT")
      .reduce((val1) => val1 + 1, 0);

    elements.push(
      <div key={key} className={classes.category}>
        <h2>
          {key} - {totalCorrect}/{values.length}
        </h2>
        {values.map((value) => {          
          const submissionStatus = submissions.get(value.id)   
          const style = submissionStatus ? submissionStatus.toLowerCase().replace("_", "-") : "unattempted"

          let questionStatus  

         if(style === "correct"){            
            questionStatus = `${classes.status} ${classes.correct}`
         }
         else if(style === "partially-correct"){
            questionStatus = `${classes.status} ${classes.partially_correct}`
         }
         else if(style === "incorrect"){
            questionStatus = `${classes.status} ${classes.incorrect}`
         }
         else{
            questionStatus = `${classes.status} ${classes.unattempted}`
         }
             

          return (
            <div className={classes.question}>
              <div className={questionStatus}></div>               
              <h3>{value.name}</h3>
            </div>
          );
        })}
      </div>
    );
  });

  return <>{elements.length > 0 && elements}</>;
}
