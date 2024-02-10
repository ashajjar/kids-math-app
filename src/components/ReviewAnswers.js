import React from 'react';
import '../styles/ReviewAnswers.css';
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

    return (
        <div className="review-answers">
            <h2>{t('review.title')}</h2>
            <table className="review-table">
                <tbody>
                {equations.map((equation, index) => {
                    const correctAnswer = calculateAnswer(equation);
                    const isCorrect = parseInt(answers[index]) === parseInt(correctAnswer);
                    const answerClass = isCorrect ? 'correct-answer' : 'incorrect-answer';

                    return (
                        <tr key={index}>
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
            <button onClick={onRestart} className="primary-button">{t('review.back')}</button>
        </div>
    );
}

export default ReviewAnswers;
