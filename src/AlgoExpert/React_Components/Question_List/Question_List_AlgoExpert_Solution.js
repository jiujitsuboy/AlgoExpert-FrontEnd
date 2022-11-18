import React, { useEffect, useState } from "react";
// import classes from "./Question_List.module.css"
import "./Question_List.css";

// const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
// const SUBMISSIONS_API_BASE_URL =
//   "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionListAlgoExpertSolution() {
  // Write your code here.

  const [questions, submissions] = useQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const submissionsByQuestion = getSubmissionsByQuestion(submissions);
  const categories = Object.keys(questionsByCategory);

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          questions={questionsByCategory[category]}
          submissionsByQuestion={submissionsByQuestion}
        ></Category>
      ))}
    </>
  );
}

const Category = ({ category, questions, submissionsByQuestion }) => {
  const totalQuestions = questions.length;
  const numQuestionsCorrect = questions.reduce((sum, question) => {
    return submissionsByQuestion[question.id] === "CORRECT" ? sum + 1 : sum;
  }, 0);
  return (
    <div className="category">
      <h2>
        {category} - {numQuestionsCorrect} / {totalQuestions}
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </div>
  );
};

const Question = ({ question, submissionsByQuestion }) => {
  const submissionStatus = submissionsByQuestion[question.id];
  const statusClass =
    submissionStatus == null
      ? "unattempted"
      : submissionStatus.toLowerCase().replace("_", "-");
  return (
    <div className="question">
      <div className={`status ${statusClass}`} />
      <h3>{question.name}</h3>
    </div>
  );
};

const useQuestionsAndSubmissions = () => {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //  const [questionResponse, submissionResponse] = await Promise.all([fetch(QUESTIONS_API_BASE_URL), fetch(SUBMISSIONS_API_BASE_URL)])

      //  const [question, submission] = await Promise.all([questionResponse.json(), submissionResponse.json()])

      const questions = [
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
      const submissions = [
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

      setQuestions(questions);
      setSubmissions(submissions);
    };
    fetchData();
  }, []);

  return [questions, submissions];
};

const getQuestionsByCategory = (questions) => {
  const questionsByCategory = {};

  questions.forEach(({ category, ...question }) => {
    if (!questionsByCategory.hasOwnProperty(category)) {
      questionsByCategory[category] = [];
    }

    questionsByCategory[category].push(question);
  });
  return questionsByCategory;
};

const getSubmissionsByQuestion = (submissions) => {
  const submissionsByQuestion = {};
  submissions.forEach(({ questionId, status }) => {
    submissionsByQuestion[questionId] = status;
  });
  return submissionsByQuestion;
};
