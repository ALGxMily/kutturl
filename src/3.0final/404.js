import React from "react";
import "../3.0final/LandingStyle.css";

export default function NotFound() {
  return (
    <div className="wrapper">
      <div className="background">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="content">
          <header className="header">
            <svg
              width="235"
              height="37"
              viewBox="0 0 235 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <path
                d="M30.3074 35.5751L15.3128 16.7656L29.3383 0.125013L18.9742 0.128631L8.40223 13.5259L8.39756 0.132323L0 0.135254L0.00836719 24.1055L8.40223 13.5259L8.40459 20.2758L19.9964 35.5787L30.3074 35.5751ZM8.40641 25.4844L0.0123745 35.5857L8.40993 35.5828L8.40641 25.4844Z"
                fill="#D4ADFC"
              />
              <path
                d="M59.0452 0.114302L59.0526 21.1613C59.0542 25.8916 56.3446 28.6563 51.6143 28.658C46.884 28.6596 44.1193 25.8968 44.1177 21.1665L44.1103 0.119516L35.6065 0.122484L35.6139 21.4353C35.6169 30.1517 40.8277 36.2089 51.6169 36.2051C62.4062 36.2014 67.6127 30.1405 67.6096 21.3178L67.6022 0.0581673L59.0452 0.0611543L59.0452 0.114302Z"
                fill="#D4ADFC"
              />
              <path
                d="M72.873 0.109375L72.8757 7.60339L82.8145 7.59993L82.8243 35.5563L91.275 35.5534L91.2652 7.59698L101.151 7.59352L101.148 0.0995051L72.873 0.109375Z"
                fill="#D4ADFC"
              />
              <path
                d="M106.508 0.0976562L106.51 7.59168L116.449 7.58821L116.459 35.5446L124.91 35.5417L124.9 7.58526L134.786 7.58181L134.783 0.0877863L106.508 0.0976562Z"
                fill="#D4ADFC"
              />
              <path
                d="M163.579 0.0776812L163.587 21.1247C163.588 25.855 160.879 28.6197 156.148 28.6213C151.418 28.623 148.654 25.8602 148.652 21.1299L148.645 0.0828945L140.141 0.0858629L140.148 21.3986C140.151 30.1151 145.362 36.1723 156.151 36.1685C166.94 36.1647 172.147 30.1039 172.144 21.2812L172.136 0.0215462L163.579 0.0245332L163.579 0.0776812Z"
                fill="#D4ADFC"
              />
              <path
                d="M198.143 22.0163C201.969 21.1114 205.901 17.7616 205.899 11.49C205.897 4.89954 201.324 0.0114268 193.99 0.013987L177.407 0.0197754L177.42 35.4702L185.817 35.4673L185.813 23.7745L189.959 23.773L196.447 35.5167L206.12 35.5133L198.143 22.0163ZM185.807 7.56401L192.823 7.56156C195.587 7.5606 197.288 9.10133 197.289 11.493C197.29 13.8316 195.536 15.4267 192.826 15.4276L185.81 15.4301L185.807 7.56401Z"
                fill="#D4ADFC"
              />
              <path
                d="M219.863 28.0145L219.854 0.0581038L211.456 0.0610352L211.468 35.5115L234.004 35.5036L234.001 28.0096L219.863 28.0145Z"
                fill="#D4ADFC"
              />
            </svg>
          </header>
          <div
            className="404"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              height: "70vh",
            }}
          >
            <h1 style={{ fontFamily: "Exo, sans-serif", color: "#D4ADFC" }}>
              <span style={{ color: "#D4ADFC" }}>404</span> |{" "}
            </h1>
            <h1
              style={{
                fontFamily: "Exo, sans-serif",
                color: "#D4ADFC",
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              Link not found
            </h1>
            <button
              className="button"
              style={{
                borderRadius: "10px",
                outline: "none",
                borderRight: "none",
                border: "none",
                padding: "1rem",
                width: "fit-content",
                maxHeight: "50px",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
              }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  fontFamily: "Exo, sans-serif",
                  fontWeight: "bold",
                  height: "100px",
                  border: "none",
                  borderRadius: "10px",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                Go back
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
