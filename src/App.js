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
  console.log(text)
  return(
    <>
    <div className="App" >
      <div className="App-header">
        <p>shareshort</p>
        <div className='inputWrap'>
          <li><a href='/api'>API</a></li>
          <li><a href='/about'>Contact</a></li>
        </div>
    </div>

    </div>
        <div className='contentWrap'>
        <div className='content'>
          <h1>URL Shortner</h1>
          <p>The easy way to shorten your links and share them with your friends</p>
          <div className='inputWrap'>
            <input onChange={(text)=> setText(text.target.value) } type='text' placeholder='Paste your link here'/>
              <ButtonShort text={text}/>
            </div>
            </div>
            
            </div>
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
