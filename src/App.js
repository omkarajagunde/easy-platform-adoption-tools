import React, { useContext, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";
import { MdExpandMore } from "react-icons/md";
import { IoIosMove } from "react-icons/io";
// import { ButtonSet, Button } from 'carbon-components-react'
import ScreenComponent from "./components/ScreenComponent";

import "./App.scss";
import { ScreenContext } from "./contexts/ScreenContext";

function App() {
	const { screenState, setScreenState } = useContext(ScreenContext);
	const [state, setState] = useState({
		dragOn: false,
		currentScreen: 1
	});
	const hoveredRef = useRef(null);
	const keyRef = useRef(null);
	const windowFrameRef = useRef(document.getElementById("windowFrame"));

	useEffect(() => {
		console.log("EasyTalk Extension actually started");
		window.addEventListener("keydown", handleKeyDownListener);
		window.addEventListener("mousemove", handleMouseMoveEvent, { passive: true });
		windowFrameRef.current.style.pointerEvents = "none";

		return () => {
			window.removeEventListener("mousemove", handleMouseMoveEvent);
			window.removeEventListener("keydown", handleKeyDownListener);
		};
	}, [screenState]);

	useEffect(() => {
		let elem = document.getElementById("allScreens");
		if (elem && screenState.screenAdded) {
			elem.scrollTop = elem.scrollHeight;
		}
	}, [screenState.walkScreensArr, screenState.screenAdded]);

	useEffect(() => {
		hoveredRef.current = null;
	}, [screenState.currentSelectedScreen]);

	const handleKeyDownListener = (event) => {
		keyRef.target = event.key;

		if (keyRef.target === "d") {
			let arr = screenState.walkScreensArr;
			arr.forEach((screen, idx) => {
				if (idx === screenState.currentSelectedScreen) {
					screen.element = getCSSPath(hoveredRef.target);
				}
			});
			console.log("arr : ", arr);
			setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
		}
	};

	const handleMouseMoveEvent = (e) => {
		if (keyRef.target === "c" && screenState.walkScreensArr.length > 0) {
			hoveredRef.target = document.elementFromPoint(e.clientX, e.clientY);
			let currScreenSettings = screenState.walkScreensArr[screenState.currentSelectedScreen];
			// Remove old bounding boxes on the screen
			let oldelem = document.getElementById("selectionpart");
			if (oldelem) oldelem.remove();

			let oldelem1 = document.getElementById("title-subtitle");
			if (oldelem1) oldelem1.remove();

			let sizes = hoveredRef.target.getBoundingClientRect();
			let div1 = document.createElement("div");
			div1.setAttribute("id", "selectionpart");
			div1.classList.add("selectionpart");
			div1.style.top = `${sizes.top - 10}px`;
			div1.style.left = `${sizes.left - 10}px`;
			div1.style.width = `${sizes.width + 20}px`;
			div1.style.height = `${sizes.height + 20}px`;
			div1.style.boxShadow = `0 0 0 99999px rgb(${currScreenSettings.color.r} ${currScreenSettings.color.g} ${currScreenSettings.color.b} / ${currScreenSettings.opacity}0%)`;
			document.body.appendChild(div1);
		}
	};

	const getCSSPath = (el) => {
		const fullPath = [];
		const fn = (el) => {
			let tagName = el.tagName.toLowerCase();
			let elPath = "";
			if (el.id) {
				elPath += "#" + el.id;
			}
			if (el.classList.length) {
				elPath += "." + [...el.classList].join(".");
			}
			if (el.parentElement) {
				if (el.previousElementSibling || el.nextElementSibling) {
					let nthChild = 1;
					for (let e = el.previousElementSibling; e; e = e.previousElementSibling, nthChild++);
					tagName += `:nth-child(${nthChild})`;
				}
				fn(el.parentElement);
			}
			fullPath.push(tagName + elPath);
		};
		fn(el);
		return fullPath.join(">");
	};

	const handleClose = () => {
		let myobj = document.getElementById("windowFrame");
		myobj.remove();
	};

	const handleStart = () => {
		setState((prevState) => ({ ...prevState, dragOn: true }));
	};

	const handleDrag = () => {
		//
	};

	const handleStop = () => {
		setState((prevState) => ({ ...prevState, dragOn: false }));
	};

	const handleExpanded = () => {
		setState((prevState) => ({ ...prevState, expandFlag: !state.expandFlag }));
	};

	const handleNewWalkScreen = () => {
		let newScreenObj = {
			color: "#00000",
			opacity: "8",
			element: "",
			style: "arrow-1",
			title: "This is demo title",
			subtitle: "This is desmo subtitle",
			dragged: false,
			draggedSizes: {},
			arrowType: "arrow3",
			videoURL: "",
			imageURL: ""
		};
		setScreenState((prevState) => ({ ...prevState, walkScreensArr: [...screenState.walkScreensArr, newScreenObj], screenAdded: true, currentSelectedScreen: prevState.currentSelectedScreen + 1}));
		setState((prevState) => ({ ...prevState, expandFlag: true, currentScreen: 1 }));
	};

	const handleToggleScreen = (screenIdx) => {
		let oldelem = document.getElementById("selectionpart");
		if (oldelem) oldelem.remove();

		let oldelem1 = document.getElementById("title-subtitle");
		if (oldelem1) oldelem1.remove();
		setState((prevState) => ({ ...prevState, expandFlag: true, currentScreen: screenIdx }));
	}

	const handleSaveScreens = () => {
		console.log(JSON.stringify(screenState.walkScreensArr));
		//setState((prevState) => ({ ...prevState, expandFlag: true, currentScreen: 2 }));
	};

	const cssStyle = {
		cursor: state.dragOn ? "grabbing" : null,
		pointerEvents: "all",
	};

	return (
		<Draggable id="dragArea" axis="both" handle=".moveDragArea" defaultPosition={{ x: 0, y: 0 }} onStart={handleStart} onDrag={handleDrag} onStop={handleStop}>
			<div className="dragBox" style={{ ...cssStyle }}>
				<div className="dragBox-titleBar">
					<div>WalkMeEasy</div>
					<div>
						<GrFormClose onClick={handleClose} />
					</div>
				</div>
				<div className="dragBox-menu">
					<div onClick={handleNewWalkScreen}>New +</div>
					<div onClick={() => handleToggleScreen(2)}>Saved</div>
					<div onClick={() => handleToggleScreen(3)}>About</div>
				</div>

				{state.currentScreen === 1 && state.expandFlag && (
					<div className="dragBox-expanded" id="allScreens">
						{screenState.walkScreensArr.length > 0 && (
							<div className="dragBox-guide">
								<div className="dragBox-guide-div">Press 'c' then hover over required element on page then Press 'd' to capture hovered element</div>
							</div>
						)}
						<ScreenComponent />
						{screenState.walkScreensArr.length > 0 && (
							<div onClick={handleSaveScreens} className="dragBox-submit">
								<div onClick={handleSaveScreens}>submit</div>
							</div>
						)}
					</div>
				)}

				{
					state.currentScreen === 2 && state.expandFlag && <div className="dragBox-expanded"> Saved Screen </div>
				}

				{	
					state.currentScreen === 3 && state.expandFlag && <div className="dragBox-expanded"> About Screen </div>
				}
				<div className="dragBox-expandable" style={{ transform: state.expandFlag ? "rotateX(180deg)" : "rotateX(0deg)" }}>
					<MdExpandMore size={24} onClick={handleExpanded} />
					<IoIosMove className="moveDragArea" />
				</div>
			</div>
		</Draggable>
	);
}

export default App;
