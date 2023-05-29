import React, { useState } from 'react';
import './App.css';
import { questionsProva1, questionsProva2, questionsProva3 } from './questionsBank';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
        <button onClick={onCancel}>Revisar Respostas</button>
          <button onClick={onConfirm}>Finalizar Exame</button>
        </div>
      </div>
    </div>
  );
};

const App = ({ questionBankParam }) => {
  let questions;
  if (questionBankParam === '1') {
    questions = questionsProva1;
  } else if (questionBankParam === '2') {
    questions = questionsProva2;
  } else if (questionBankParam === '3') {
    questions = questionsProva3;
  } else {
    questions = [];
  }

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  const handleOptionSelect = (selectedOptionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
    setShowNavigation(false);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowResult(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setShowNavigation(true);
  };

  if (showResult) {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswerIndex) {
        correctAnswers++;
      }
    });

    return (
      <div className="App">
        <div className="container">
          <h1>Resultado</h1>
          <div className="result">
            Você acertou {correctAnswers} de {questions.length} questões.
          </div>
          <div className="answer-summary">
            <h2>Respostas:</h2>
            {questions.map((question, index) => (
              <p key={index}>
                <strong>{question.question}</strong>
                <br />
                Sua resposta: {question.options[answers[index]]}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Questão {questionIndex + 1}</h1>
        <div className="question">{questions[questionIndex].question}</div>
        <div className="options">
          {questions[questionIndex].options.map((option, index) => (
            <div
              className={`option ${answers[questionIndex] === index ? 'selected' : ''}`}
              key={index}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
        {showNavigation && (
          <div className="navigation-buttons">
            {questionIndex > 0 && (
              <button onClick={() => setQuestionIndex(questionIndex - 1)}>Anterior</button>
            )}
            {questionIndex < questions.length - 1 && (
              <button onClick={() => setQuestionIndex(questionIndex + 1)}>Próxima</button>
            )}
            {questionIndex === questions.length - 1 && (
              <button onClick={handleSubmit}>Submeter</button>
            )}
          </div>)
        }
        {showConfirmation && (
          <ConfirmationModal
            message='Clique em "Finalizar Exame" para concluir. Você não poderá alterar mais nenhuma resposta após esse passo. Caso tenha alguma dúvida pode clicar em "Revisar Respostas".'
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default App;