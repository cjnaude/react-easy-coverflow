import React from "react";
import CheckIcon from "./checkIcon";

/* Props:
    - slide (obj)
    - isLeft (bool)
    - numToActive (int)
    - isSelected (bool)
    - isUnselectable (bool)
    - onSlideClick (func)
    - selectItem (func)
*/
class CoverFlowSlide extends React.Component {
  constructor(props) {
    super(props);

    this._onSelect = this._onSelect.bind(this);
    this._onSlideClick = this._onSlideClick.bind(this);
  }

  _onSelect(e) {
    e.stopPropagation();  //So that the click does not go through to the slide
    this.props.selectItem(this.props.slide.id);
  }

  _onSlideClick() {
    this.props.onSlideClick(this.props.slide.id);
  }

  render () {
    const { slide, isLeft, numToActive, isSelected, isUnselectable } = this.props;

    //Do not render slides that are offscreen
    if (numToActive > 4) {
      return <div className={"coverflow-slide"}></div>;
    }

    //Set the isActive variable
    let isActive = (numToActive === 0);

    /* --- Assign the correct classes based on the props --- */

    //Used to move left slides a bit more left, and right slides more right
    //And sets z-index
    let slideShift = { zIndex: 1000 };
    //Base class that all slides have
    let slideClasses = ["cf-slide-inner"];

    if (isActive) {
      slideClasses.push("cf-active-slide");
    }
    else { //If not the active slide, then we need to apply a left/right transform
      if (isLeft) {
        slideClasses.push("cf-trans-left");
        slideShift = {
          transform: "translate3d(-130%,0,0)",
          zIndex: 1000 - numToActive
        };
      }
      else {  //If not left, then right
        slideClasses.push("cf-trans-right");
        slideShift = {
          transform: "translate3d(30%,0,0)",
          zIndex: 1000 - numToActive
        };
      }
    }

    /* --- Select button --- */
    //Need this otherwise it will be a regular pointer over the area where the button is invisible
    let selectButtonStyle = {};
    if (!isActive) {
      selectButtonStyle = {
        ...selectButtonStyle,
        cursor: "pointer"
      };
    }

    //Set the select button's text and text classes
    let selectButtonTxt = slide.isDisabled ? 
      "NOT AVAILABLE" : 
      (isSelected ? "SELECTED" : "CLICK TO SELECT");
    let selectButtonTxtClasses = ["cf-slide-htext"];
    if (isUnselectable) {
      if (isSelected) {
        //Is unselectable and selected so we change the text to deselect
        selectButtonTxt = "DESELECT";
      }
    }
    else {
      if (isSelected) {
        //Is not unselectable and is selected so we 'disable' the button
        selectButtonTxtClasses.push("cf-slide-htext-greyed");
      }
    }

    //Set the background image of the slide
    let bgImage;
    bgImage = ["url(", slide.image, ")"].join("");

    //Check if the slide's heading is overflowing and needs to scroll
    let shouldScrollHeading = false;
    if (slide.name.length >= 30) {
      shouldScrollHeading = true;
    }

    // Render component
    return (
      <div
        className={"coverflow-slide"}
        style={slideShift}
      >
        <div
          className={slideClasses.join(" ")}
          onClick={this._onSlideClick}
          style={{
            backgroundImage: bgImage,
          }}
        >
          {/* --- Slide Content --- */}
          {/* Slide heading */}
          <div className={["cf-slide-heading", !isActive ? "cf-hidden" : ""].join(" ")}>
            <p
              className={["cf-slide-htext", shouldScrollHeading ? "cf-slide-heading-scroll" : ""].join(" ")}
            >
              <span>
                {slide.name}
              </span>
            </p>
          </div>

          {/* Slide select button (do not render it if it is not active or a neighbour to active) */}
          {
            (numToActive <= 1) ? <button
              style={selectButtonStyle}
              className={[
                "cf-slide-select-button",
                !isActive ? "cf-hidden" : ((selectButtonTxt === "CLICK TO SELECT") ? "select-button-pulse" : "")
              ].join(" ")}
              onClick={this._onSelect}
              disabled={slide.isDisabled || (!isActive)}
            >
              <p className={selectButtonTxtClasses.join(" ")}>
                {selectButtonTxt}
              </p>
            </button> : null
          }

          {/* Selected Tick (do not render if not selected) */}
          {
            (isSelected) ? <CheckIcon
              className={"cf-sel-check"}
            /> : null
          }
        </div>
      </div>
    );
  }
}

export default CoverFlowSlide;
