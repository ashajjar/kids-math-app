import React from 'react';
import i18n from "../i18n";
import '../styles/Header.css'
import logo from '../resources/logo.png'

function Header({ onHome }) {
    const changeLanguage = (language) => {
        i18n.changeLanguage(language).catch(err => console.error(err));
    };

    return (
        <header>
            <div
                className="brand"
                onClick={onHome}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (!onHome) return;
                    if (e.key === 'Enter' || e.key === ' ') onHome();
                }}
            >
                <img src={logo} alt="Logo"/>
            </div>
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>
        </header>
    );
}

export default Header;
