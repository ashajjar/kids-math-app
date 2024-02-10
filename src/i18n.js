import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

await i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    startScreen: {
                        title: "Kids Math",
                        maxNumber: "Maximum Number",
                        maxResult: "Maximum Result (applies for addition only)",
                        equationsCount: "Equation count to generate",
                        groupSize: "Equations group size",
                        isNegativeAllowed: "Allow negative results",
                        isGeneratingCombinations: "Generate complementing operations",
                        ops: "Operations",
                        op: {
                            add: "Addition",
                            sub: "Subtraction",
                            mul: "Multiplication",
                            div: "Division"
                        },
                        solve: "Start Solving",
                        print: "Print Equations",
                    },
                    equations: {
                        next: 'Next',
                        previous: 'Previous',
                        finish: 'Finish',
                    },
                    review: {
                        title: 'Review Answers',
                        back: 'Back to Start'
                    }
                }
            },
            de: {
                translation: {
                    startScreen: {
                        title: "Kinder Mathe",
                        maxNumber: "Maximale Zahl",
                        maxResult: "Maximalergebnis (gilt nur für Addition)",
                        equationsCount: "Anzahl der zu generierenden Gleichungen",
                        groupSize: "Gruppengröße der Gleichungen",
                        isNegativeAllowed: "Negative Ergebnisse zulassen",
                        isGeneratingCombinations: "Ergänzende Operationen generieren",
                        ops: "Operationen",
                        op: {
                            add: "Addition",
                            sub: "Subtraktion",
                            mul: "Multiplikation",
                            div: "Division"
                        },
                        solve: "Mit dem Lösen beginnen",
                        print: "Gleichungen drucken",
                    },
                    equations: {
                        next: 'Weiter',
                        previous: 'Zurück',
                        finish: 'Fertig',
                    },
                    review: {
                        title: 'Antworten überprüfen',
                        back: 'Zurück zum Start'
                    }
                }
            }
        },
        lng: "de", // Default language
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
