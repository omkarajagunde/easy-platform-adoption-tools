import React from "react";
function Content(props) {
	return (
		<div className="title-subtitle-container" id="title-subtitle-container">
			<div className="title-subtitle-container-1">
				#{props.screenState.currentSelectedScreen + 1} - {props.currScreenSettings.title}
			</div>
			<div className="title-subtitle-container-2">{props.currScreenSettings.subtitle}</div>
			{
				props.currScreenSettings.imageURL.length > 4 &&
				<img src={props.currScreenSettings.imageURL} width="100%"/>
			}
			{
				props.currScreenSettings.videoURL.length > 4 &&
				<iframe width="100%"
					src={props.currScreenSettings.videoURL} 
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen 
				/>
				
			}
			<div className="title-subtitle-container-btns">
				<button>Skip</button>
				{props.screenState.currentSelectedScreen > 0 && <button onClick={props.handlePrevious}>Previous</button>}
				{props.screenState.currentSelectedScreen < props.screenState.walkScreensArr.length - 1 && <button onClick={props.handleNext}>Next</button>}
			</div>
		</div>
	);
}

export default Content;
