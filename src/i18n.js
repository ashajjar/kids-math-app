import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    startScreen: {
                        title: "Kids Math",
                        minNumber: "Minimum Number",
                        maxNumber: "Maximum Number",
                        equationsCount: "How many problems?",
                        groupSize: "Group size",
                        isNegativeAllowed: "Allow negative results",
                        isGeneratingCombinations: "Generate complementing operations",
                        ops: "Operations",
                        advanced: "Advanced",
                        op: {
                            add: "Addition",
                            sub: "Subtraction",
                            mul: "Multiplication",
                            div: "Division"
                        },
                        solve: "Start Solving",
                        print: "Print Exercises",
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
                        minNumber: "Minimale Zahl",
                        maxNumber: "Maximale Zahl",
                        equationsCount: "Wie viele Aufgaben?",
                        groupSize: "Gruppengröße",
                        isNegativeAllowed: "Negative Ergebnisse zulassen",
                        isGeneratingCombinations: "Ergänzende Operationen generieren",
                        ops: "Operationen",
                        advanced: "Erweitert",
                        op: {
                            add: "Addition",
                            sub: "Subtraktion",
                            mul: "Multiplikation",
                            div: "Division"
                        },
                        solve: "Mit dem Lösen beginnen",
                        print: "Aufgaben drucken",
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
