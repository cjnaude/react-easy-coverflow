import React from "react";
import PrevIcon from "./prevIcon";
import NextIcon from "./nextIcon";

/* Props:
    - nextItemID (int?)
    - prevItemID (int?)
    - setActiveItem (func)
*/
class CoverFlowNav extends React.Component {
  constructor(props) {
    super(props);

    this._onNavNext = this._onNavNext.bind(this);
    this._onNavPrev = this._onNavPrev.bind(this);
  }

  _onNavNext() {
    this.props.setActiveItem(this.props.nextItemID);
  }

  _onNavPrev() {
    this.props.setActiveItem(this.props.prevItemID);
  }

  render() {
    const { nextItemID, prevItemID } = this.props;

    /* --- Arrow nav --- */
    return (
      <div className="cf-button-nav">
        {/* Prev slide button */}
        <button
          disabled={(prevItemID === null)}
          onClick={this._onNavPrev}
        >
          <PrevIcon
            className={"cf-nav-button-icon"}
            style={{ fill: (prevItemID === null) ? "rgba(255,255,255,0.3)" : "#fff" }}
          />
        </button>
        {/* Next slide button */}
        <button
          disabled={(nextItemID === null)}
          onClick={this._onNavNext}
        >
          <NextIcon
            className={"cf-nav-button-icon"}
            style={{ fill: (nextItemID === null) ? "rgba(255,255,255,0.3)" : "#fff" }}
          />
        </button>
      </div>
    );
  }
}

export default CoverFlowNav;
