import React, { useContext, useState } from "react";
import { MdDelete, MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { TwitterPicker } from "react-color";

import "../App.scss";
import { ScreenContext } from "../contexts/ScreenContext";

function ScreenComponent() {
	const { screenState, setScreenState } = useContext(ScreenContext);

	const handleDeleteScreen = (idx) => {
		setScreenState((prevState) => ({ ...prevState, walkScreensArr: screenState.walkScreensArr.filter((screen, index) => index !== idx), screenAdded: false }));
	};

	const handleToggle = (idx) => {
		setScreenState((prevState) => ({ ...prevState, currentSelectedScreen: idx }));
	};

	const enableScreenSelection = (idx) => {
		return {
			pointerEvents: idx === screenState.currentSelectedScreen ? "all" : "none",
			filter: idx !== screenState.currentSelectedScreen ? "blur(1px)" : null,
		};
	};

	const handleOpacityChanger = (eve, idx) => {
		let arr = screenState.walkScreensArr;
		arr.forEach((element, index) => {
			if (index === idx) {
				element.opacity = eve.target.value;
			}
		});

		setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
	};

	const handleChangeColor = (color, idx) => {
		let arr = screenState.walkScreensArr;
		arr.forEach((element, index) => {
			if (index === idx) {
				element.color = color.rgb;
			}
		});

		setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
	};

	const handleTitleChange = (eve, idx) => {
		let arr = screenState.walkScreensArr;
		arr.forEach((element, index) => {
			if (index === idx) {
				element.title = eve.target.value;
			}
		});

		setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
	};

	const handleSubtitleChange = (eve, idx) => {
		let arr = screenState.walkScreensArr;
		arr.forEach((element, index) => {
			if (index === idx) {
				element.subtitle = eve.target.value;
			}
		});

		setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
	};

	return screenState.walkScreensArr.map((screen, idx) => (
		<div className="dragBox-screen">
			<div className="dragBox-screen-1">
				<div className="dragBox-screen-1-upDown">
					<div onClick={() => handleToggle(idx)}>{idx === screenState.currentSelectedScreen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}</div>
					<div>
						<HiArrowUp />
					</div>
					<div>
						<HiArrowDown />
					</div>
				</div>
				<div className="dragBox-screen-1-title">screen #{idx + 1}</div>
				<div className="dragBox-screen-1-delete">
					<MdDelete onClick={() => handleDeleteScreen(idx)} />
				</div>
			</div>
			<div className="dragBox-screen-2" style={enableScreenSelection(idx)}>
				<div style={{ width: "100%" }}>
					<TwitterPicker width="100%" colors={["#F47373", "#697689", "#37D67A"]} onChangeComplete={(color) => handleChangeColor(color, idx)} />
				</div>
			</div>
			<div className="dragBox-screen-3" style={enableScreenSelection(idx)}>
				<div>opacity</div>
				<div>
					<input onChange={(eve) => handleOpacityChanger(eve, idx)} value={screen.opacity} type="number" min={0} max={10} step={1}></input>
				</div>
			</div>
			<div className="dragBox-screen-4" style={enableScreenSelection(idx)}>
				<div>style</div>
				<div>
					<select>
						<option>Dashed arrow</option>
						<option>One color</option>
						<option>Dashed arrow</option>
						<option>Gradient arrow</option>
					</select>
				</div>
			</div>
			<div className="dragBox-screen-5" style={enableScreenSelection(idx)}>
				<div>Element</div>
				<div className="dragBox-screen-5-select" style={{ color: screen.element.length > 4 ? null : "red" }}>
					{screen.element.length > 4 ? "Selected" : "Not Selected"}
				</div>
			</div>
			<div className="dragBox-screen-6" style={enableScreenSelection(idx)}>
				<div className="dragBox-screen-6-input-title">
					<input value={screen.title} onChange={(eve) => handleTitleChange(eve, idx)} type="text" maxLength="100" />
				</div>
				<div className="dragBox-screen-6-input-subtitle">
					<textarea value={screen.subtitle} onChange={(eve) => handleSubtitleChange(eve, idx)} rows={1} maxLength="200" />
				</div>
			</div>
		</div>
	));
}

export default ScreenComponent;
