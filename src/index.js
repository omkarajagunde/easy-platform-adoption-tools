import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ScreenContext } from "./contexts/ScreenContext";
import Content from "./components/Content";

function AppWrapper({ props }) {
	const [screenState, setScreenState] = useState({
		walkScreensArr: [],
		expandFlag: false,
		screenAdded: true,
		currentSelectedScreen: -1,
	});
	const lineRef = useRef(null);
	const draggableRef = useRef(null);

	useEffect(() => {
		/**
		 * When window is tried to resize then we
		 * want to re paint the highlighting as the old
		 * highlighting will be correct
		 */
		window.addEventListener("resize", renderHighlighter);

		/**
		 * This will paint the highlighting for current selected
		 * screen every time when the screenState object is changed
		 */
		renderHighlighter();
		return () => {
			window.removeEventListener("resize", renderHighlighter);
		};
	}, [screenState]);

	const handlePrevious = () => {
		setScreenState((prevState) => ({ ...prevState, currentSelectedScreen: prevState.currentSelectedScreen - 1 }));
	};

	const handleNext = () => {
		setScreenState((prevState) => ({ ...prevState, currentSelectedScreen: prevState.currentSelectedScreen + 1 }));
	};

	const handleContentDrag = (newPosition) => {
		let arr = screenState.walkScreensArr;
		arr.forEach((element, index) => {
			if (index === screenState.currentSelectedScreen) {
				element.dragged = true;
				element.draggedSizes = { left: newPosition.left, top: newPosition.top };
			}
		});

		//setScreenState((prevState) => ({ ...prevState, walkScreensArr: arr }));
		lineRef.target.position();
	};

	const renderHighlighter = () => {
		console.log(screenState);
		// Remove old bounding boxes on the screen
		let oldelem = document.getElementById("selectionpart");
		if (oldelem) oldelem.remove();

		let oldelem1 = document.getElementById("title-subtitle");
		if (oldelem1) oldelem1.remove();

		if (lineRef.target) {
			lineRef.target.remove();
			lineRef.target = null;
		}

		if (draggableRef.target) {
			draggableRef.target.remove();
			draggableRef.target = null;
		}

		let currScreenSettings = screenState.walkScreensArr[screenState.currentSelectedScreen];
		let toggledSelection = document.querySelector(currScreenSettings?.element || null);

		if (toggledSelection) {
			let sizes = toggledSelection.getBoundingClientRect();
			let div1 = document.createElement("div");
			div1.setAttribute("id", "selectionpart");
			div1.classList.add("selectionpart");
			div1.style.top = `${sizes.top - 10}px`;
			div1.style.left = `${sizes.left - 10}px`;
			div1.style.width = `${sizes.width + 20}px`;
			div1.style.height = `${sizes.height + 20}px`;
			div1.style.boxShadow = `0 0 0 99999px rgb(${currScreenSettings.color.r} ${currScreenSettings.color.g} ${currScreenSettings.color.b} / ${currScreenSettings.opacity}0%)`;
			document.body.appendChild(div1);

			let div2 = document.createElement("div");
			div2.setAttribute("id", "title-subtitle");
			div2.classList.add("title-subtitle");
			div2.style.top = currScreenSettings.dragged ? `${currScreenSettings.draggedSizes.top}px` : `${sizes.bottom + 100}px`;
			div2.style.left = currScreenSettings.dragged ? `${currScreenSettings.draggedSizes.left}px` : `${sizes.left - 5}px`;
			document.body.appendChild(div2);

			ReactDOM.render(<Content handlePrevious={handlePrevious} handleNext={handleNext} screenState={screenState} currScreenSettings={currScreenSettings} />, div2);

			lineRef.target = new window.LeaderLine(div2, div1);
			lineRef.target.setOptions({
				color: "white",
				dash: { animation: true },
				startSocket: "auto",
				endPlug: currScreenSettings.arrowType
			});

			// Make Content -> div2 draggable
			draggableRef.target = new window.PlainDraggable(div2);
			draggableRef.target.draggingClass = "";
			draggableRef.target.movingClass = "";
			draggableRef.target.draggableClass = "";
			draggableRef.target.onMove = handleContentDrag;

			draggableRef.target.position()
			lineRef.target.position();
		}
	};

	return (
		<ScreenContext.Provider value={{ screenState, setScreenState }}>
			<App />
		</ScreenContext.Provider>
	);
}

ReactDOM.render(
	<>
		<AppWrapper />
	</>,
	document.getElementById("windowFrame")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
