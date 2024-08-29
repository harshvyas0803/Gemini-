import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Function to load a saved prompt
  const loadPrompt = (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  // Function to handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`sidebar ${extended ? 'expanded' : 'collapsed'} ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon}
          alt="Menu"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="Recent Message" />
                  <p>{item.slice(0, 18)}</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <span>Dark Mode</span>
          <label className="switch">
            <input 
              type="checkbox" 
              onChange={handleThemeToggle}
              checked={isDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="bottom-item recent-entry">
          <a href="https://blog.google/technology/ai/google-gemini-ai/" target="_blank" rel="noopener noreferrer">
            <img src={assets.question_icon} alt="Help" /> 
            <p>About</p> 
          </a>
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
