import { useState } from 'react';
import './Header.css';
import TeamUnderLine from './TeamUnderLine.svg';
import SectionLine from './sectionLine.svg';

function Header() {
    const [activeSection, setActiveSection] = useState("projects");
    const handleSearch = () => console.log('Search triggered');

    return (
        <header className="header">
            <div className="logo-container">
                <p className='logoText'>TeamMaker</p>
                <img src={TeamUnderLine} alt="Team underline" className="team-under-line" />
            </div>

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Текст" 
                    className="search-bar"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className='search-button' onClick={handleSearch}>⌕</button>
            </div>

            <nav className='header-sections'>
                {['projects', 'members', 'aboutUs'].map((section, index) => (
                    <button
                        key={section}
                        className={`section-btn ${activeSection === section ? "active" : ""}`}
                        onClick={() => setActiveSection(section)}
                    >
                        {section === 'projects' ? 'Проекты' : section === 'members' ? 'Участники' : 'О нас'}
                    </button>
                ))}
                <img
                    src={SectionLine}
                    alt="section line"
                    className="section-line"
                    style={{
                        left: activeSection === "projects" ? "5px" :
                              activeSection === "members" ? "40px" : "68%"
                    }}
                />
            </nav>

            <nav className="logSections">
                <button className='log-btn'>Регистрация</button>
                <button className='log-btn'>Вход</button>
            </nav>
        </header>
    );
}

export default Header;
