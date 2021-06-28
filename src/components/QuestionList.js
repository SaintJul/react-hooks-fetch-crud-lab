import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => 
      //console.log(data) 
      setQuestions(data) 
      
    )
  }, [])

  const ques = questions.map((ques2) =>
  <QuestionItem
  key={ques2.id}
  question = {ques2}
  onDeleteClick={handleDeleteClick}
  onAnswerChange={handleAnswerChange}
  />)

  function handleAnswerChange(id, newPost){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": newPost
      }),
    })
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{ques}</ul>
      </section>
  );
}

export default QuestionList;
