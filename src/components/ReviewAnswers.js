import React from 'react';
import '../styles/ReviewAnswers.css';
import {useTranslation} from "react-i18next";

function ReviewAnswers({equations, answers, onRestart}) {
    // Function to calculate the correct answer for an equation WITHOUT using eval (CSP-safe)
    const calculateAnswer = (equation) => {
        try {
            const expr = (equation || '')
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/\s+/g, '');

            const value = evaluateExpression(expr);
            if (value === null || Number.isNaN(value)) return null;
            return value.toString();
        } catch (error) {
            console.error('Error calculating equation:', error);
            return null;
        }
    };

    // Simple shunting-yard based evaluator supporting +, -, *, / and parentheses
    const evaluateExpression = (expr) => {
        if (!expr) return null;

        const output = [];
        const ops = [];

        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const isOp = (c) => c === '+' || c === '-' || c === '*' || c === '/';

        // Tokenize numbers (integers) and operators/parentheses
        const tokens = [];
        let i = 0;
        while (i < expr.length) {
            const ch = expr[i];
            if (/[0-9]/.test(ch)) {
                let num = ch;
                i++;
                while (i < expr.length && /[0-9]/.test(expr[i])) {
                    num += expr[i++];
                }
                tokens.push({ type: 'num', value: Number(num) });
                continue;
            }
            if (ch === '(' || ch === ')') {
                tokens.push({ type: ch });
                i++;
                continue;
            }
            if (isOp(ch)) {
                // Handle unary minus
                if (ch === '-' && (tokens.length === 0 || (tokens[tokens.length - 1].type !== 'num' && tokens[tokens.length - 1].type !== ')'))) {
                    // Parse negative number
                    i++;
                    let num = '';
                    while (i < expr.length && /[0-9]/.test(expr[i])) {
                        num += expr[i++];
                    }
                    if (num.length === 0) return null; // lone '-'
                    tokens.push({ type: 'num', value: -Number(num) });
                    continue;
                }
                tokens.push({ type: 'op', value: ch });
                i++;
                continue;
            }
            // Unknown character
            return null;
        }

        // Shunting-yard to RPN
        for (const t of tokens) {
            if (t.type === 'num') {
                output.push(t.value);
            } else if (t.type === 'op') {
                while (
                    ops.length &&
                    ops[ops.length - 1].type === 'op' &&
                    precedence[ops[ops.length - 1].value] >= precedence[t.value]
                ) {
                    output.push(ops.pop().value);
                }
                ops.push(t);
            } else if (t.type === '(') {
                ops.push(t);
            } else if (t.type === ')') {
                while (ops.length && ops[ops.length - 1].type !== '(') {
                    output.push(ops.pop().value);
                }
                if (!ops.length) return null; // mismatched parens
                ops.pop(); // remove '('
            }
        }
        while (ops.length) {
            const top = ops.pop();
            if (top.type === '(' || top.type === ')') return null; // mismatched
            output.push(top.value);
        }

        // Evaluate RPN
        const stack = [];
        for (const t of output) {
            if (typeof t === 'number') {
                stack.push(t);
            } else if (isOp(t)) {
                if (stack.length < 2) return null;
                const b = stack.pop();
                const a = stack.pop();
                let r;
                switch (t) {
                    case '+': r = a + b; break;
                    case '-': r = a - b; break;
                    case '*': r = a * b; break;
                    case '/': r = b === 0 ? NaN : a / b; break;
                    default: return null;
                }
                stack.push(r);
            } else {
                return null;
            }
        }
        if (stack.length !== 1) return null;
        return stack[0];
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
