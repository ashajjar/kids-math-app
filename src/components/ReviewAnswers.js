import React from 'react';
import '../styles/ReviewAnswers.css';

function ReviewAnswers({equations, answers, onRestart}) {
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
        <div className="review-answers">
            <h2>Review Answers</h2>
            <table className="review-table">
                <tbody>
                {equations.map((equation, index) => {
                    const correctAnswer = calculateAnswer(equation);
                    const isCorrect = answers[index] === correctAnswer;
                    const answerClass = isCorrect ? 'correct-answer' : 'incorrect-answer';

                    return (
                        <tr key={index} >
                            <td style={{textAlign: 'right'}} className={answerClass}>
                                {isCorrect ? '✓' : 'X'}
                            </td>

                            <td style={{textAlign: 'left'}}>
                                {equation} = {answers[index]}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button onClick={onRestart} className="primary-button">Back to Start</button>
        </div>
    );
}

export default ReviewAnswers;
