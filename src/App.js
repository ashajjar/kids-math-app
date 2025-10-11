import React, {useState} from 'react';
import StartScreen from './components/StartScreen';
import EquationDisplay from './components/EquationDisplay';
import ReviewAnswers from './components/ReviewAnswers';
import './i18n'; // Path to your i18n config file
import Header from "./components/Header";
import CookieBanner from "./components/CookieBanner";

function App() {
    const [step, setStep] = useState(1);
    const [settings, setSettings] = useState({});
    const [equations, setEquations] = useState([]);
    const [answers, setAnswers] = useState([]);

    const handleStart = (userSettings) => {
        setSettings(userSettings);
        const generatedEquations = generateEquations(userSettings);

        setEquations(generatedEquations);
        setAnswers(new Array(generatedEquations.length).fill(''));
        setStep(2);
    };

    const handlePrint = (userSettings) => {
        setSettings(userSettings);
        const generatedEquations = generateEquations(userSettings);
        printEquations(generatedEquations, userSettings.groupSize);
    };

    const handleRestart = () => {
        // Reset the application state to initial
        setStep(1);
        setSettings({});
        setEquations([]);
        setAnswers([]);
    };

    const handleFinishEquations = (submittedAnswers) => {
        setAnswers(submittedAnswers);
        setStep(3); // Move to the review step
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StartScreen onStart={handleStart} onPrint={handlePrint}/>;
            case 2:
                return <EquationDisplay
                    equations={equations}
                    onFinish={handleFinishEquations}
                    groupSize={settings.groupSize}/>;
            case 3:
                return <ReviewAnswers equations={equations} answers={answers} onRestart={handleRestart}/>;
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <div className="App">
            <Header/>
            {renderStep()}
            <CookieBanner/>
        </div>
    );
}

function generateComplementingEquations(equations, a, b, operation) {
    let c;
    switch (operation) {
        case 'addition':
            c = a + b;
            equations.push(`${c} - ${b}`);
            equations.push(`${c} - ${a}`);
            break;
        case 'subtraction':
            c = a - b;
            equations.push(`${a} - ${c}`);
            equations.push(`${b} + ${c}`);
            break;
        case 'multiplication':
            c = a * b;
            if (c !== 0) {
                equations.push(`${c} ÷ ${a}`);
                equations.push(`${c} ÷ ${b}`);
                break;
            }
            equations.pop();
            a++;
            b++;
            c = a * b;
            equations.push(`${a} × ${b}`);
            equations.push(`${c} ÷ ${a}`);
            equations.push(`${c} ÷ ${b}`);
            break;
        case 'division':
            c = a / b;
            equations.push(`${c} × ${b}`);
            equations.push(`${c} ÷ ${a}`);
            break;
        default:
            break;
    }
}

function generateEquations(settings) {
    const {maxNumber, numEquations, operations, allowNegativeResults, maxResult, isGeneratingCombinations} = settings;

    const numEquationsModifier = isGeneratingCombinations ? 3 : 1;
    let number = (numEquations / numEquationsModifier) + (isGeneratingCombinations ? 1 : 0);
    const equations = [];
    const operationSymbols = {
        addition: '+',
        subtraction: '-',
        multiplication: '×',
        division: '÷'
    };
    const enabledOperations = Object.entries(operations)
        .filter(([op, isEnabled]) => isEnabled)
        .map(([op]) => op);

    for (let i = 0; i < number; i++) {
        let a = Math.floor(Math.random() * (maxNumber + 1));
        let b = Math.floor(Math.random() * (maxNumber + 1));
        const operation = enabledOperations[Math.floor(Math.random() * enabledOperations.length)];
        const symbol = operationSymbols[operation];


        if (!allowNegativeResults && operation === 'subtraction' && a < b) {
            [a, b] = [b, a]; // Swap to avoid negative result
        }

        if (operation === 'division') {
            if (b === 0) {
                b = 1; // adjust to avoid division by zero
            }
            a = a * b; // to make sure only integers are generated
        }

        if (operation === 'addition' && a + b > maxResult + 1) {
            let diff = Math.floor(((a + b) - maxResult + 1) / 2);
            a -= diff;
            b -= diff;
        }

        const equation = `${a} ${symbol} ${b}`;
        equations.push(equation);
        isGeneratingCombinations && generateComplementingEquations(equations, a, b, operation);
    }

    return equations;
}

const printEquations = (equations, groupSize) => {
    let printableContent = `
      <style>
        .print-container { display: flex; flex-wrap: wrap; justify-content: space-around; }
        .equation-table { margin: 10px; width: 30%; border-collapse: collapse; page-break-inside: avoid; }
        .equation-table td { border: 1px solid black; padding: 10px; text-align: center; }
        .answer-space { width: 50px; }
      </style>
    `;

    printableContent += '<div class="print-container">';

    for (let i = 0; i < equations.length; i += groupSize) {
        printableContent += '<table class="equation-table">';
        for (let j = i; j < i + groupSize && j < equations.length; j++) {
            printableContent += `<tr><td>${equations[j]}</td><td class="answer-space"></td></tr>`;
        }
        printableContent += '</table>';
    }

    printableContent += '</div>';

    const newWindow = window.open('');
    newWindow.document.write(printableContent);
    newWindow.document.close(); // Close the document for writing
    newWindow.focus(); // Focus on the new window
    newWindow.print();
    newWindow.close();
};

export default App;
