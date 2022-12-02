import React, { Component  } from 'react'

class MyLeaderBoardAd extends Component {

    componentDidMount() {
     (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

   render () {
    return(
        <div>
        <ins className = "adsbygoogle"
                style = { {display:"inline-block",width:"728px",height:"90px"} }
                data-ad-client = "ca-pub-5197012541210620"
                data-ad-slot = "8545615608"></ins>
        </div>)
    }
}

export default MyLeaderBoardAd