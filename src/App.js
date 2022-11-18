// import TipCalculator from './AlgoExpert/React_Components/Question1_TipCalculator/TipCalculator';
// import QuestionList from './AlgoExpert/React_Components/Question_List/Question_List';
// import QuestionListAlgoExpertSolution from './AlgoExpert/React_Components/Question_List/Question_List_AlgoExpert_Solution';
// import Quiz from './AlgoExpert/React_Components/Quiz/Quiz';
import QuizAlgoExpertSolution from './AlgoExpert/React_Components/Quiz/Quiz_AlgoExpert_Solution';
// import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    // <TipCalculator/>
    // <QuestionList/>
    // <QuestionListAlgoExpertSolution/>
    // <Quiz/>
    <QuizAlgoExpertSolution/>
    // <GrandParent />
  );
}

// const texts = [
//   { name: "text1", atributes: [1, 2, 3] },
//   { name: "text2", atributes: [4, 5] },
// ];

// const GrandParent = () => {
//   const [currentText, setCurrentText] = useState(0);

//   return (
//     <>
//       <Parent text={texts[currentText]} />
//       <div style={{display:"flex", alignItems:"center",justifyContent:"space-around"}}>
//         <button onClick={()=>setCurrentText(prev=>prev-1 > -1 ? prev-1: prev)}>Back</button>
//         <button onClick={()=>setCurrentText(prev=>prev+1<texts.length ? prev+1: prev)}>Next</button>
//       </div>
//     </>
//   );
// };

// const Parent = ({ text }) => {
//   const [textIndexSelected, setTextIndexSelected] = useState(-1);

//   useEffect(()=>{
//     setTextIndexSelected(-1)
//   },[text])

//   return (
//     <>
//       <h2 style={{textAlign:"center"}}>{text.name}</h2>
//       {text.atributes.map((atribute, index) => (
//         <Child
//           key={index}
//           index={index}
//           text={atribute}
//           selectedIndex={textIndexSelected}
//           onSelect={setTextIndexSelected}
//         />
//       ))}
//     </>
//   );
// };

// const Child = ({ index, text, selectedIndex, onSelect }) => {
//   const selectedBackground = index === selectedIndex ? "red" : "blue";
//   return (
//     <div
//       style={{
//         cursor: "pointer",
//         backgroundColor: selectedBackground,
//         color: "white",
//         padding: "10px",
//         margin: "10px 10px",
//         textAlign: "center",
//       }}
//       onClick={() => onSelect(index)}
//     >
//       {text}
//     </div>
//   );
// };

export default App;
