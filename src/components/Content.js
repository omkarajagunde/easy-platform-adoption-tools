import React from "react";
function Content(props) {
	return (
		<div className="title-subtitle-container" id="title-subtitle-container">
			<div className="title-subtitle-container-1">
				#{props.screenState.currentSelectedScreen + 1} - {props.currScreenSettings.title}
			</div>
			<div className="title-subtitle-container-2">{props.currScreenSettings.subtitle}</div>
			<div className="title-subtitle-container-btns">
				<button>Skip</button>
				{props.screenState.currentSelectedScreen > 0 && <button onClick={props.handlePrevious}>Previous</button>}
				{props.screenState.currentSelectedScreen < props.screenState.walkScreensArr.length - 1 && <button onClick={props.handleNext}>Next</button>}
			</div>
		</div>
	);
}

export default Content;
