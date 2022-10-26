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
export default function ButtonLoader ({text}) {
    console.log("text button", text)
    const [loading, setLoading] = React.useState(false);
    const [url, setUrl] = React.useState(null);
    const [key, setKey] = React.useState(null);
    const navigateto = useNavigate()
    //useeffect in class component
    React.useEffect(() => {
        const result = document.querySelector('.result');
        result.style.display = 'none';
    }, []);

    const link = () => {
        const result = document.querySelector('.result');
        result.style.display = 'block';
    }

    function openLinklink() {
        navigateto({
            pathname: `/finalpage`,
            search:createSearchParams({url: url}).toString()
        })
        fetch(`localhost:5005/short?url=${url}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin" : "*",
            }
    })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data", data)
                    
                })
    .catch(err => {
        console.log('error',err)
        setLoading(false);
        
    })
    }

    const fetchData = () => {

      setLoading(true);
    const button = document.querySelector('.button');
     
    loading === true ? button.style.display = 'none' : button.style.display = 'flex';
        
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
        link();
        setLoading(false);
        setUrl(res.shrtlnk);
        setKey(res.key);

    })
    .catch(err => {
        console.log(err)
    })
    }
      return (
        <>
        <div className="buttonWrap" >
          <button className="button" onClick={fetchData} disabled={loading}>
            {loading && (
                <div>
                <CSpinner color="dark"/>
                </div>
            )}
            {loading && <span></span>}
            {!loading && <span>Shorten</span>}
          </button>

        </div>
        <div className='result'>
                <button onClick={openLinklink}>Link is ready</button>
        </div>
        </>
      );

  }

 export function FinalPage() {

    const [searchParams] = useSearchParams()
    const [url, setUrl] = React.useState("LOADING");
    const[tooltip, setTooltip] = React.useState(false)
    useEffect(() => {
    setUrl(searchParams.get('url'))
    
    }, [searchParams])
    
    const copy = () => {
        navigator.clipboard.writeText(url);
    }
    return (
        <div className="finalPage">
            <h1>Your link is <Tooltip title="Click to copy"><a href="#" onClick={()=>copy()}>{url}</a></Tooltip></h1>
        </div>
    );
}