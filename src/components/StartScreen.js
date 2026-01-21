import React, {useEffect, useState} from 'react';
import '../styles/StartScreen.css';
import {useTranslation} from 'react-i18next';
import {trackEvent} from '../analytics';


const STORAGE_KEY = 'math_app_settings_v1';

const DEFAULT_SETTINGS = {
    minNumber: 0,
    maxNumber: 10,
    maxResult: 10,
    numEquations: 60,
    operations: {
        addition: true,
        subtraction: false,
        multiplication: false,
        division: false
    },
    groupSize: 5,
    allowNegativeResults: false,
    isGeneratingCombinations: false,
};

function loadSavedSettings() {
    try {
        const raw = typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        const parsed = JSON.parse(raw);
        const merged = {
            ...DEFAULT_SETTINGS,
            ...parsed,
            operations: {
                ...DEFAULT_SETTINGS.operations,
                ...(parsed && parsed.operations ? parsed.operations : {}),
            },
        };
        if (merged.isGeneratingCombinations) merged.groupSize = 3;
        return merged;
    } catch (_) {
        return DEFAULT_SETTINGS;
    }
}


function StartScreen(props) {
    const {t} = useTranslation();
    const savedSettings = loadSavedSettings();
    const [minNumber, setMinNumber] = useState(savedSettings.minNumber);
    const [maxNumber, setMaxNumber] = useState(savedSettings.maxNumber);
    const [maxResult, setMaxResult] = useState(savedSettings.maxResult);
    const [numEquations, setNumEquations] = useState(savedSettings.numEquations);
    const [operations, setOperations] = useState(savedSettings.operations);
    const [groupSize, setGroupSize] = useState(savedSettings.groupSize);
    const [allowNegativeResults, setAllowNegativeResults] = useState(savedSettings.allowNegativeResults);
    const [isGeneratingCombinations, setIsGeneratingCombinations] = useState(savedSettings.isGeneratingCombinations);

    useEffect(() => {
        try {
            const settingsToSave = {
                minNumber,
                maxNumber,
                maxResult,
                numEquations,
                operations,
                groupSize: isGeneratingCombinations ? 3 : groupSize,
                allowNegativeResults,
                isGeneratingCombinations,
            };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
        } catch (_) {
        }
    }, [
        minNumber,
        maxNumber,
        maxResult,
        numEquations,
        operations,
        groupSize,
        allowNegativeResults,
        isGeneratingCombinations,
    ]);

    const handleAllowNegativeResultsChange = (e) => {
        setAllowNegativeResults(e.target.checked);
    };

    const handleIsGeneratingCombinationsChange = (e) => {
        setIsGeneratingCombinations(e.target.checked)
        setGroupSize(3);
    };

    const handleGroupSizeChange = (e) => {
        if (isGeneratingCombinations) {
            setGroupSize(3);
            return;
        }
        setGroupSize(parseInt(e.target.value));
    };

    const handleMinNumberChange = (e) => {
        setMinNumber(parseInt(e.target.value));
    };

    const handleNumberChange = (e) => {
        setMaxNumber(parseInt(e.target.value));
    };

    const handleMaxResultChange = (e) => {
        setMaxResult(parseInt(e.target.value));
    };

    const handleNumEquationsChange = (e) => {
        setNumEquations(parseInt(e.target.value));
    };

    const handleOperationChange = (e) => {
        setOperations({...operations, [e.target.name]: e.target.checked});
    };

    const handlePrint = (e) => {
        e.preventDefault();
        // Check if at least one operation is selected
        if (!operations.addition && !operations.subtraction && !operations.multiplication && !operations.division) {
            setError('Please select at least one operation.');
            return;
        }
        if (minNumber > maxNumber) {
            setError('Minimum number cannot be greater than maximum number.');
            return;
        }
        setError(''); // Clear any existing error
        // analytics: printing worksheet
        trackEvent('print_sheet', {
            ops: Object.keys(operations).filter(k => operations[k]).join(','),
            minNumber,
            maxNumber,
            numEquations,
            groupSize,
            maxResult,
            allowNegativeResults,
            isGeneratingCombinations,
        });
        props.onPrint({
            minNumber,
            maxNumber,
            numEquations,
            operations,
            groupSize,
            allowNegativeResults,
            maxResult,
            isGeneratingCombinations
        });
    };


    const [error, setError] = useState(''); // State to handle error message

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if at least one operation is selected
        if (!operations.addition && !operations.subtraction && !operations.multiplication && !operations.division) {
            setError('Please select at least one operation.');
            return;
        }
        if (minNumber >= maxNumber) {
            setError('Minimum number cannot be greater than maximum number.');
            return;
        }
        setError(''); // Clear any existing error
        // analytics: start solving session
        trackEvent('start_session', {
            ops: Object.keys(operations).filter(k => operations[k]).join(','),
            minNumber,
            maxNumber,
            numEquations,
            groupSize,
            maxResult,
            allowNegativeResults,
            isGeneratingCombinations,
        });
        props.onStart({
            minNumber,
            maxNumber,
            numEquations,
            operations,
            groupSize,
            allowNegativeResults,
            maxResult,
            isGeneratingCombinations,
        });
    };

    return (
        <div className="start-screen">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="start-screen-row">
                        <label>
                            {t('startScreen.minNumber')}
                            <input type="number" value={minNumber} onChange={handleMinNumberChange}/>
                        </label>
                        <label>
                            {t('startScreen.maxNumber')}
                            <input type="number" value={maxNumber} onChange={handleNumberChange}/>
                        </label>
                        <label>
                            <span className="label-with-help">
                                {t('startScreen.maxResult')}
                                <span
                                    className="help-icon"
                                    title={t('startScreen.maxResultAdditionOnly')}
                                    aria-label={t('startScreen.maxResultAdditionOnly')}
                                >
                                    ?
                                </span>
                            </span>
                            <input type="number" value={maxResult} onChange={handleMaxResultChange}/>
                        </label>
                    </div>

                    <div className="start-screen-row">
                        <label>
                            {t('startScreen.equationsCount')}
                            <input type="number" value={numEquations} onChange={handleNumEquationsChange}/>
                        </label>
                        <label>
                            {t('startScreen.groupSize')}
                            <input type="number" value={groupSize} onChange={handleGroupSizeChange}
                                   disabled={isGeneratingCombinations}/>
                        </label>
                    </div>

                    <fieldset className="operations-group">
                        <legend>{t('startScreen.ops')}</legend>
                        <label>
                            <input type="checkbox" name="addition" checked={operations.addition}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.add')}
                        </label>
                        <label>
                            <input type="checkbox" name="subtraction" checked={operations.subtraction}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.sub')}
                        </label>
                        <label>
                            <input type="checkbox" name="multiplication" checked={operations.multiplication}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.mul')}
                        </label>
                        <label>
                            <input type="checkbox" name="division" checked={operations.division}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.div')}
                        </label>
                    </fieldset>

                    <fieldset className="operations-group">
                        <legend>{t('startScreen.advanced')}</legend>
                        <label>
                            <input
                                type="checkbox"
                                checked={allowNegativeResults}
                                onChange={handleAllowNegativeResultsChange}
                            />
                            {t('startScreen.isNegativeAllowed')}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={isGeneratingCombinations}
                                onChange={handleIsGeneratingCombinationsChange}
                            />
                            {t('startScreen.isGeneratingCombinations')}
                        </label>
                    </fieldset>

                    {error && <div style={{color: 'red'}}>{error}</div>}
                    <div className="button-container">
                        <button type="button" onClick={handlePrint}>{t('startScreen.print')}</button>
                        <button type="submit" className={"secondary-button"}>{t('startScreen.solve')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StartScreen;
