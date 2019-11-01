import "./coverFlow.css";
import React from "react";
import { Swipeable } from "react-swipeable";
import CoverFlowSlide from "./coverFlowSlide";
import CoverFlowNav from "./coverFlowNav";

/* Props:
    - slides (array)
    - selectedSlides (array)
    - selectedSlide (int - id)
    - onSlideSelect (func)
*/
class CoverFlow extends React.Component {
  constructor(props) {
    super(props);
    const firstItemID = props.slides[0] ? props.slides[0].id : null;
    this.state = {
      deltaX: 0,  //Local state to control swiping left/right between slides
      activeItemID: firstItemID
    };

    //Get the screen width
    let screenWidth = 700; //Default for if screen object is not available
    if (window.screen) {
      screenWidth = window.screen.width;
    }

    //Set the swipe range
    this.swipeRange = screenWidth / 10;
    this.swipeRange = Math.min(this.swipeRange, 100); //Set the max
    this.swipeRange = Math.max(this.swipeRange, 60); //Set the min


    this._onSwitching = this._onSwitching.bind(this);
    this._onSwiped = this._onSwiped.bind(this);
    this._onClick = this._onClick.bind(this);
    this._setActiveItem = this._setActiveItem.bind(this);
  }

  //Called while swiping the coverflow
  _onSwitching(deltaX, nextItemID, prevItemID) {
    if (deltaX - this.state.deltaX > this.swipeRange) {
      if (nextItemID !== null) {
        this.setState({
          deltaX: deltaX,
          activeItemID: nextItemID,
        });
        return;
      }
      this.setState({
        deltaX: deltaX
      });
      return;
    }
    if (deltaX - this.state.deltaX < (-1 * this.swipeRange)) {
      if (prevItemID !== null) {
        this.setState({
          deltaX: deltaX,
          activeItemID: prevItemID,
        });
        return;
      }
      this.setState({
        deltaX: deltaX
      });
      return;
    }
  }

  //Called when the swipe is complete
  _onSwiped() {
    //Settimeout so that onClick will run before onSwiped
    //This helps prevent a click happening when a swipe was intended
    setTimeout(() => {
      this.setState({
        deltaX: 0
      });
    }, 1);
  }

  //Called when a slide is clicked
  _onClick(itemID) {
    //This check is so that we don't trigger a click at the end of a swipe
    if (this.state.deltaX === 0) {
      if (itemID === this.props.activeItemID) {
        this.props.onSlideSelect(itemID);
      }
      else {
        this.setState({
          activeItemID: itemID,
        });
      }
    }
  }

  _setActiveItem(itemID) {
    this.setState({
      activeItemID: itemID,
    });
  }

  render() {
    const { slides, selectedSlide=null, selectedSlides=[], onSlideSelect } = this.props;
    const { activeItemID } = this.state;

    //If there are no slides, return an empty component
    if (slides.length === 0) {
      return null;
    }

    //Figure out how many slides are being rendered
    const lastSlideIndex = slides.length - 1;

    //Calculate the index of the active item
    let activeItemIndex;
    for (let i = 0; i <= lastSlideIndex; i++) {
      if (slides[i].id === activeItemID) {
        activeItemIndex = i;
        break;
      }
    }

    //Set vars for the next and prev item IDs
    let nextItemID = null;
    let prevItemID = null;
    if (activeItemIndex > 0) {
      prevItemID = slides[activeItemIndex-1].id;
    }
    if (activeItemIndex < lastSlideIndex) {
      nextItemID = slides[activeItemIndex+1].id;
    }

    const isMultiSelectable = selectedSlides.length > 0;

    return (
      <div className={"coverflow-cont"}>

        {/* --- Slides --- */}
        <Swipeable
          className={"coverflow-swipe"}
          trackMouse={true}
          onSwiping={({ deltaX }) => this._onSwitching(deltaX, nextItemID, prevItemID)}
          onSwiped={this._onSwiped}
          delta={this.swipeRange}
          style={{ transform:"translate3d(-" + (activeItemIndex * 100) + "%,0,0)" }}
        >
          {slides.map((curSlide, index) => {
            let isLeft = (index < activeItemIndex);
            let isSelected;
            if (isMultiSelectable) {
              isSelected = (selectedSlides.indexOf(curSlide.id) >= 0);
            }
            else {
              isSelected = (selectedSlide === curSlide.id)
            }

            return (
              <CoverFlowSlide
                key={curSlide.id}
                slide={curSlide}
                isLeft={isLeft}
                numToActive={Math.abs(index-activeItemIndex)}
                isSelected={isSelected}
                isUnselectable={isMultiSelectable}
                onSlideClick={this._onClick}
                selectItem={onSlideSelect}
              />
            );
          })}
        </Swipeable>

        {/* --- Arrow nav --- */}
        <CoverFlowNav
          nextItemID={nextItemID}
          prevItemID={prevItemID}
          setActiveItem={this._setActiveItem}
        />
      </div>
    );
  }
}

export default CoverFlow;
