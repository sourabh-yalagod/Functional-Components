import React, { useState } from "react";
import Text from "./Text";
const App = () => {
  const [showAnswer, setShowAnswer] = useState(null);
  const faq = {
    qna: [
      { id: 1, question: "Question - 1", answer: "Answer - 1" },
      { id: 2, question: "Question - 2", answer: "Answer - 2" },
      { id: 3, question: "Question - 3", answer: "Answer - 3" },
      { id: 4, question: "Question - 4", answer: "Answer - 4" },
    ],
  };

  return (
    <div>
      <Text text={"Questions and Answer"} duration={100} />
      <div className="faq-container">
        <div className="faq-wrapper">
          {faq.qna.map((item, index) => (
            <div key={item.id} className="faq-card">
              <div className="faq-header">
                <p className="faq-question">{item.question}</p>
                <p
                  className="faq-toggle"
                  onClick={() =>
                    setShowAnswer((prev) => (prev === index ? null : index))
                  }
                >
                  {showAnswer === index ? "-" : "+"}
                </p>
              </div>
              {showAnswer === index && (
                <p className="faq-answer">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
