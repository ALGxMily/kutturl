import React from "react";
import "./App.css";

export default function Modal(show, children) {
  console.log({ show: show.show, children: children.children });
  const [showModal, setShowModal] = React.useState(show.show);
  const [modalContent, setModalContent] = React.useState(children.children);
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    setShowModal(show.show);
    setModalContent(children.children);
  }, [show.show, children.children]);

  return (
    <>
      {showModal ? (
        <div
          className="modalWrapper"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal"
            style={{
              width: "600px",
              height: "400px",
              backgroundColor: "#121212",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "25px",
            }}
          >
            <div
              className="modalHeader"
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#121212",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px 5px 0 0",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Barlow",
                }}
              >
                Want a custom name?
              </h1>
            </div>
            <div
              className="modalBody"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                backgroundColor: "#121212",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                Make your URL easier to remember and share!
              </p>
              <p style={{ color: "white", fontSize: "1.2rem" }}>
                Example:{" "}
                <span style={{ color: "#FBBD12" }}>
                  https://kutturl.com/{text}
                </span>
              </p>
              <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a custom name"
                style={{
                  width: "300px",
                  height: "25px",
                  backgroundColor: "#121212",
                  color: "white",
                  fontSize: "1.5rem",
                  border: "none",
                  borderBottom: "1px solid white",
                  outline: "none",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {children.url}
              </input>
            </div>
            <div
              className="modalFooter"
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#121212",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0 0 5px 5px",
                marginBottom: "20px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#FBBD12",
                  color: "black",
                  border: "none",
                  padding: "20px",
                  borderRadius: "10px",
                  fontSize: "1.3rem",
                }}
                onClick={() => setShowModal(false)}
              >
                No thanks
              </button>
              <button
                style={{
                  backgroundColor: "#FBBD12",
                  color: "black",
                  border: "none",
                  padding: "20px",

                  borderRadius: "10px",
                  fontSize: "1.3rem",
                  marginLeft: "20px",
                }}
                onClick={() => setShowModal(false)}
              >
                Save it!
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
