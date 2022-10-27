import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
import "../App.css";
import { CSpinner } from "@coreui/react";
import { Tooltip } from "rsuite";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes,
    Outlet,
    useSearchParams,
    useParams, useOutletContext ,createSearchParams, useNavigate
  } from "react-router-dom";
export default function ButtonLoader ({text,buttonRef}) {
    const [loading, setLoading] = React.useState(false);
    const [url, setUrl] = React.useState(null);
    const [key, setKey] = React.useState(null);
    const navigateto = useNavigate()



    function openLinklink() {
        fetch(`https://cors-anywhere.herokuapp.com/https://custom-urlshortner-backend.herokuapp.com/shorturladd?url=${text}`, {
            method: "GET",
            headers: {
                "Allow-Access-Control-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
    })
    .then(response => response.json())
.then(response => {
    console.log(response)
    setUrl(response.url)
    setKey(response.key)
    setLoading(true)
    // navigateto({
    //     pathname: `/finalpage`,
    //     search:createSearchParams({url: url}).toString()
    // })

})
// .finally(() => {
//     setLoading(false);
//     navigateto('/finalpage')
// })
    .catch(err => {
        console.log('error',err)
        console.trace(err)
        setLoading(false);
        
    })
    }

 function fetchData() {

      setLoading(true);
    const button = document.querySelector('.button');
     
        
    fetch(`https://shrtlnk.dev/api/v2/link`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "api-key": "zTru6ZSXtP0vhPTJwm3qqTvp4qiUtpJGn7t13zV4EbZPr"
        },
        body: JSON.stringify({
            "url": text
        })
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        //set button style display none
        button.style.display = 'none';

        setLoading(false);
        setUrl(res.shrtlnk);
        setKey(res.key)
        navigateto({
            pathname: `/finalpage`,
            search:createSearchParams({url: url}).toString()
        })
    })
    .catch(err => {
        console.log(err)
    })
    }
      return (
        <>
        <div className="buttonWrap" >
          <button ref={buttonRef} className="button" onClick= {openLinklink} disabled={loading}>
            {loading && (

                <span>Loading...</span>

            )}
            {loading && <span></span>}
            {!loading && <span>Shorten</span>}
          </button>

        </div>
        </>
      );

  }
 export function FinalPage() {

    const [searchParams] = useSearchParams()
    const [url, setUrl] = React.useState("LOADING");
    const[tooltip, setTooltip] = React.useState(false)
    const navigateto = useNavigate()
    useEffect(() => {
    setUrl(searchParams.get('url'))
    
    }, [searchParams])
    
    const copy = () => {
        navigator.clipboard.writeText(url);
    }
    const redirectToProfile = () => {
        navigateto({
            pathname: `/urls`,
        })
    }

    return (
        <div className="finalPage">
            <h1>Your link is <Tooltip title="Click to copy"><a href="#" onClick={()=>copy()}>{url}</a></Tooltip></h1>
            <button className="finalpageURLButton" onClick={redirectToProfile}>Your URLs</button>

        </div>
    );
}