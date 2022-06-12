import React from "react";
function Content(props) {

	const handleSkipClick = () => {
		props.handleSkipClick()
	}

	return (
		<div className="title-subtitle-container" id="title-subtitle-container">
			<div className="title-subtitle-container-1">
				#{props.state.currentSelectedScreen + 1} - {props.currScreenSettings.title}
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
				{!props.state.flowTriggeredFromHotspots && <button onClick={handleSkipClick}>Skip</button>}
				{props.state.currentSelectedScreen > 0 && !props.state.flowTriggeredFromHotspots && <button onClick={props.handlePrevious}>Previous</button>}
				{props.state.currentSelectedScreen < props.state.walkScreensArr.length - 1 && !props.state.flowTriggeredFromHotspots && <button onClick={props.handleNext}>Next</button>}
				{props.state.flowTriggeredFromHotspots && <button onClick={props.handleBackToHotspots}>Back to Feature spots</button>}
			</div>
		</div>
	);
}

export default Content;
