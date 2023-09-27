import React from "react";
import loadingAnimation from "../../src/lottie/link_loading.json";
import Lottie from "lottie-react";

export default function Test() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        // the animation has square borders that make the animation covered around a square
        // this is a workaround to make the
      />
    </div>
  );
}
