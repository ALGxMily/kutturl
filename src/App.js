import './App.css';
import AnimatedBg from "react-animated-bg";
import ButtonShort, { FinalPage } from './ButtonLoader/ButtonShort';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { MdContentPaste } from "react-icons/md";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/urls" element={<Urls />} />
      <Route path="/login" element={<Login />} />
      <Route path="/finalpage" element={<FinalPage />} />
    </Routes>
    );
}
function Home() {
  const [text, setText] = React.useState('');
  const focused = React.useRef(null);
  const refButton = React.useRef(null);
  const handleKeyPress = React.useCallback((event) => {
    // check if the Shift key is pressed
    if (event.ctrlKey === true && event.key === 'v') {
      // do something
      focused.current.focus();
      navigator.clipboard.readText()
      .then(text => {
        setText(text)
        console.log('Pasted content: ', text);
        if(refButton.current){
          refButton.current.click()
        }else{
          console.log('no ref')
        }

        
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
    }
  }, []);

  React.useEffect(() => {

    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  return(
    <>
    <div className="App" >
      <div className="App-header">
        <img src='logo-center.svg'/>
        <div className='inputWrap'>
          <li><a href='/urls'>My Urls</a></li>
          <li><a href='/login'>Log In</a></li>
        </div>
    </div>
    </div>
        <div className='contentWrap'>
        <div className='content'>
          <h2>Easy, convenient, prettier</h2>
          <p>Shorten your URL's like a boss.</p>
          </div>
          <div className='inputWrap'>
            <input ref={focused} onChange={(text)=> setText(text.target.value) } type='text' placeholder='Paste your link here'></input>
            <ButtonShort text={text} buttonRef={refButton}/>
            </div>
            </div>
            <footer>
              <div className='footerWrap'>
                <div className='footerContent'>
                  {/* <img src='logo-center.svg'/> */}
                  </div>
                  <p>&copy; 2022 kuturl.xyz</p>
                  </div>
            </footer>
</>
           )}
function Urls() {
  return(
    <div className='apiWrap'>
      <h1>API</h1>
      <p>Our API is free to use and easy to integrate. You can use it to shorten links, get analytics, and more.</p>
      </div>
  )
}
function Login() {
  return(
    <div className='aboutWrap'>
      <h1>Contact</h1>
      </div>
  )
}
export default App;
