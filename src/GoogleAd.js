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
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "728px", height: "90px" }}
        data-ad-client="ca-pub-5197012541210620"
        data-ad-slot="8545615608"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

export default MyLeaderBoardAd;

// function createAndAppendAdsElement(id, adUnitID) {
//   const adElement = document.createElement("ins");
//   adElement.className = "adsbygoogle";
//   adElement.style.display = "block";
//   adElement.style.width = "100%";
//   adElement.style.height = "100%";
//   adElement.setAttribute("data-ad-client", "ca-pub-5197012541210620");
//   adElement.setAttribute("data-ad-slot", adUnitID);
//   adElement.setAttribute("data-ad-format", "auto");
//   adElement.setAttribute("data-full-width-responsive", "true");

//   return adElement;
// }

// export default createAndAppendAdsElement;
