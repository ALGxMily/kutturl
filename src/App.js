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
      <Route path="/about" element={<About />} />
      <Route path="/api" element={<Api />} />
      <Route path="/finalpage" element={<FinalPage />} />
    </Routes>
    );
}
function Home() {
  const [text, setText] = React.useState('');

  return(
    <>
    <div className="App" >
      <div className="App-header">
        <img src='logo-center.svg'/>
        <div className='inputWrap'>
          <li><a href='/api'>My Urls</a></li>
          <li><a href='/about'>Log In</a></li>
        </div>
    </div>
    </div>
        <div className='contentWrap'>
        <div className='content'>
          <h2>Easy, convenient, prettier</h2>
          <p>Shorten your URL's like a boss.</p>
          </div>
          <div className='inputWrap'>
            <input onChange={(text)=> setText(text.target.value) } type='text' placeholder='Paste your link here'></input>              <ButtonShort text={text}/>
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
function Api() {
  return(
    <div className='apiWrap'>
      <h1>API</h1>
      <p>Our API is free to use and easy to integrate. You can use it to shorten links, get analytics, and more.</p>
      </div>
  )
}
function About() {
  return(
    <div className='aboutWrap'>
      <h1>Contact</h1>
      </div>
  )
}
export default App;
