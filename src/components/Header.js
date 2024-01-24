import React from 'react';
import i18n from "../i18n";
import '../styles/Header.css'
import {useTranslation} from "react-i18next";
import logo from '../resources/logo.png'

function Header() {
    const {t} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language).catch(err => console.error(err));
    };

    return (
        <header>
            <img src={logo} alt="Logo"/>
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>
        </header>
    );
}

export default Header;
