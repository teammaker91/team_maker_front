import { useState, useRef, useEffect } from 'react';
import './Header.css';
import TeamUnderLine from './TeamUnderLine.svg';
import SectionLine from './sectionLine.svg';

function Header() {
    const [activeSection, setActiveSection] = useState("projects");
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

    const buttonRefs = {
        projects: useRef(null),
        members: useRef(null),
        aboutUs: useRef(null)
    };

    const updateLinePosition = () => {
        const activeButton = buttonRefs[activeSection].current;
        if (activeButton) {
            const rect = activeButton.getBoundingClientRect();
            const parentRect = activeButton.parentNode.getBoundingClientRect();
            setLineStyle({
                left: rect.left - parentRect.left + rect.width / 2 - 40, // center it
                width: 90 // you can make this rect.width if you want it to match
            });
        }
    };

    // Runs when section changes OR window resizes
    useEffect(() => {
        updateLinePosition();
        window.addEventListener('resize', updateLinePosition);
        return () => window.removeEventListener('resize', updateLinePosition);
    }, [activeSection]); // re-run on activeSection change

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
                {['projects', 'members', 'aboutUs'].map((section) => (
                    <button
                        key={section}
                        ref={buttonRefs[section]}
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
                        left: `${lineStyle.left}px`,
                        width: `${lineStyle.width}px`
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
