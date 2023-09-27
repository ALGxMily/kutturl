import AnimatedBg from "react-animated-bg";
import "./App.css"
function Test(){
    return(
        <AnimatedBg
        colors={["red", "salmon", "gold"]}
        duration={0.5}
        delay={4} // it will wait 4 seconds before next transition starts
        timingFunction="ease-out"
        className="section-styles"
      >
        <h2>Duration and Delay</h2>
        <p>
          Each color will be visible for 4 seconds and will change to another in
          500ms
        </p>
      </AnimatedBg>
    )
}

export default Test;