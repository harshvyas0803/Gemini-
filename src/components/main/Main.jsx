import React, { useContext } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Main = () => {
  const {
    onSent, recentPrompt, showResult, loading, resultData, setInput, input
  } = useContext(Context);
  
  const showNotification = () => {
    toast('🦄 The feature will be available soon!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onSent(input);
      setInput(''); // Clear the input after submission
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior if needed
      handleSubmit();
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello...</span></p>
              <p>How can I help you today</p>
            </div>
            <span>Example:</span>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize a concept</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Hey user! explore "Dark Mode"</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Find the error in the following code...</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data" aria-live="polite">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Enter Prompt' 
              aria-label="Enter prompt" 
              onKeyDown={handleKeyDown} // Attach the key down event handler
            />
            <div>
              <img 
                src={assets.gallery_icon} 
                alt="Gallery Icon" 
                onClick={showNotification}
              />
              <img 
                src={assets.mic_icon} 
                onClick={showNotification}
                alt="Mic Icon" 
              />
              {input ? (
                <img 
                  src={assets.send_icon} 
                  alt="Send Icon" 
                  onClick={handleSubmit} 
                  style={{ cursor: 'pointer' }} 
                />
              ) : null}   
            </div>
          </div>
          <p className="bottom-info">
            The info may be correct may be not ✧˖°
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

