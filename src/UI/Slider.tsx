import React from "react";
import ReactDOM from "react-dom";
const Slider = (props: any, sliderCtn: HTMLElement) => {
  return (
    <>
      {ReactDOM.createPortal(
        <React.Fragment>
          <div className="slider_cnt">
            <div className="slider_box">{props.children}</div>
          </div>
        </React.Fragment>,
        document.getElementById("slider")!
      )}
    </>
  );
};

export default Slider;
