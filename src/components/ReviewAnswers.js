import React from 'react';

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
        <div>
            <h2>Review Answers</h2>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <tbody>
                {equations.map((equation, index) => {
                    const correctAnswer = calculateAnswer(equation);
                    const isCorrect = answers[index] === correctAnswer;
                    return (
                        <tr key={index} style={{color: isCorrect ? 'green' : 'red', borderBottom: '1px solid black'}}>
                            <td style={{textAlign: 'right'}}>
                                {isCorrect ? '✓' : 'X'}
                            </td>
                            <td style={{borderRight: '1px solid black'}}></td>
                            <td></td>
                            <td style={{textAlign: 'left'}}>
                                {equation} = {answers[index]}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button onClick={onRestart}>Back to Start</button>
        </div>
    );
}

export default ReviewAnswers;
