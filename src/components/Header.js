// Header.js

import React from 'react';
import i18n from "../i18n";
import '../styles/Header.css'
import {useTranslation} from "react-i18next";
function Header() {
    const {t} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language).then(console.log).catch(err => console.error(err));
    };

    return (
        <header>
            <h1>{t('startScreen.title')}</h1>
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                {/* Add more language options as needed */}
            </select>
        </header>
    );
}

export default Header;
