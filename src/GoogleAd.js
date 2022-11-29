import React, { Component } from "react";

class MyLeaderBoardAd extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  //display ad
  // <ins
  //   className="adsbygoogle"
  //   style={{ display: "block" }}
  //   data-ad-client="ca-pub-5197012541210620"
  //   data-ad-slot="8545615608"
  //   data-ad-format="auto"
  //   data-full-width-responsive="true"
  // ></ins>

  render() {
    return (
      <div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "728px", height: "90px" }}
          data-ad-client="ca-pub-5197012541210620"
          data-ad-slot="8545615608"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

export default MyLeaderBoardAd;
