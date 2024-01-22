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
                        equationsCount: "Equation count to generate",
                        groupSize: "Equations group size",
                        isNegativeAllowed: "Allow negative results",
                        ops: "Operations",
                        op: {
                            add: "Addition",
                            sub: "Subtraction",
                            mul: "Multiplication",
                            div: "Division"
                        },
                        solve: "Start Solving",
                        print: "Print Equations",
                    }
                }
            },
            de: {
                translation: {
                    startScreen: {
                        title: "Kinder Mathe",
                        maxNumber: "Maximale Zahl",
                        equationsCount: "Anzahl der zu generierenden Gleichungen",
                        groupSize: "Gruppengröße der Gleichungen",
                        isNegativeAllowed: "Negative Ergebnisse zulassen",
                        ops: "Operationen",
                        op: {
                            add: "Addition",
                            sub: "Subtraktion",
                            mul: "Multiplikation",
                            div: "Division"
                        },
                        solve: "Mit dem Lösen beginnen",
                        print: "Gleichungen drucken",
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
