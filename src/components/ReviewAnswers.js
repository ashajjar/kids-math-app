import React from 'react';

function ReviewAnswers({ equations, answers, onRestart }) {
    // Function to calculate the correct answer for an equation
    const calculateAnswer = (equation) => {
        // This is a simple parser for basic arithmetic equations
        // You might need a more robust solution for complex equations
        try {
            // eslint-disable-next-line no-eval
            return eval(equation.replace('×', '*').replace('÷', '/')).toString();
        } catch (error) {
            console.error('Error calculating equation:', error);
            return null;
        }
    };

    return (
        <div>
            <h2>Review Answers</h2>
            <ul>
                {equations.map((equation, index) => {
                    const correctAnswer = calculateAnswer(equation);
                    const isCorrect = answers[index] === correctAnswer;
                    return (
                        <li key={index}>
                            {equation} = {answers[index]} - {isCorrect ? 'Correct' : 'Incorrect'}
                        </li>
                    );
                })}
            </ul>
            <button onClick={onRestart}>Back to Start</button>
        </div>
    );
}

export default ReviewAnswers;
