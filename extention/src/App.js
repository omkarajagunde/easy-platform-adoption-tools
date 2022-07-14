import React, { useContext, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";
import { MdExpandMore, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { IoIosMove } from "react-icons/io";
import { ScreenContext } from "./contexts/ScreenContext";
import ScreenComponent from "./components/ScreenComponent";
import "./App.scss";

function App() {
	const { screenState, setScreenState } = useContext(ScreenContext);
	const [state, setState] = useState({
		dragOn: false,
		currentScreen: 1,
		savedScreenContent: [],
		isSaveErrored: false,
		saveMessage: null
	});
	const hoveredRef = useRef(null);
	const keyRef = useRef(null);
	const windowFrameRef = useRef(document.getElementById("windowFrame"));
	const bodyRef = useRef(document.body.getBoundingClientRect())

	useEffect(() => {
		window.addEventListener("api-res", (event) => {
			console.log("RESponse EVENT :: ", event.detail);
			if (event.detail.contentScriptQuery === "postTour"){
				if (event.detail.status === 400){
					setState((prevState) => ({ ...prevState, isSaveErrored: true, saveMessage: event.detail.message }))
					document.getElementById("notifyDiv")?.scrollIntoView()
				}
				if (event.detail.status === 200){
					setState((prevState) => ({ ...prevState, isSaveErrored: false, saveMessage: event.detail.message, savedScreenContent: event.detail.data.tours  }))
					document.getElementById("notifyDiv")?.scrollIntoView()
				}
			}

			if (event.detail.contentScriptQuery === "getTours"){
				if (event.detail.status === 200){
					setState(prevState => ({ ...prevState, savedScreenContent: event.detail.data }))
				}
			}

			if (event.detail.contentScriptQuery === "deleteTour") {
				if (event.detail.status === 200){
					setState(prevState => ({ ...prevState, savedScreenContent: event.detail.data.tours }))
				}
			}
		})

		fetchTours()
	}, [])

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
		window.location.reload()
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
			imageURL: "",
			token: ""
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

	const fetchTours = (token) => {
		let reqOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}

		window.dispatchEvent(new CustomEvent("api-req", { detail: {
				contentScriptQuery: "getTours", 
				reqOptions: reqOptions,
				url: "http://localhost:9001/v1/api/tour?token=" + token || state.token,
			} 
		}))
	}

	const handleSaveScreens = () => {

		if (screenState.tourName.length < 4) {
			setState((prevState) => ({ ...prevState, isSaveErrored: true, saveMessage: "Please provide a unique tour name atleast 4 char(s) len on the top!" }))
			document.getElementById("notifyDiv")?.scrollIntoView()
			return
		}

		let reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tourName: screenState.tourName, walkScreensArr: screenState.walkScreensArr, token: state.token, tourId: screenState.tourId  })
		}

		window.dispatchEvent(new CustomEvent("api-req", { detail: {
				contentScriptQuery: "postTour", 
				reqOptions: reqOptions,
				url: "http://localhost:9001/v1/api/tour",
			} 
		}))

	};

	const handleTokenChange = (eve) => {
		setState((prevState) => ({ ...prevState, token: eve.target.value }));
		fetchTours(eve.target.value)
	}

	const handleEditTour = (content) => {
		setScreenState(prevState => ({ ...prevState, tourName: content.tourName, walkScreensArr: content.arr, tourId: content.id }))
		setState(prevState => ({ ...prevState, currentScreen: 1, isSaveErrored: false, saveMessage: null }))
	}

	const handleCloseNotifier = (eve) => {
		setState((prevState) => ({ ...prevState, saveMessage: null }))
	}

	const handleDeleteTour = (tourContent) => {
		let reqOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		window.dispatchEvent(new CustomEvent("api-req", { detail: {
				contentScriptQuery: "deleteTour", 
				reqOptions: reqOptions,
				url: "http://localhost:9001/v1/api/tour?token=" + state.token + "&tourId=" + tourContent.id,
			} 
		}))
	}

	const handleTourNameChange = (eve) => {
		setScreenState((prevState) => ({ ...prevState, tourName: eve.target.value }));
	}

	const handleStartNewTour = () => {
		setScreenState(prevState => ({ ...prevState, walkScreensArr: [], tourName: "", tourId: null }))
	}

	const cssStyle = {
		cursor: state.dragOn ? "grabbing" : null,
		pointerEvents: "all",
	};

	let dragBoxHeight = document.querySelector(".dragBox")?.getBoundingClientRect().height
	return (
		<Draggable
			id="dragArea"
			axis="both"
			handle=".moveDragArea"
			bounds={{ left: 0, top: 0, right: bodyRef.current.right - 370, bottom: bodyRef.current.bottom - dragBoxHeight }}
			defaultPosition={{ x: 0, y: 0 }}
			onStart={handleStart}
			onDrag={handleDrag}
			onStop={handleStop}>
			
			<div className="dragBox" style={{ ...cssStyle }}>
				<div className="dragBox-titleBar">
					<div className="dragBox-titleText">
						Bee<img width="23px" height="23px" src={document.getElementById("beeURL").innerHTML}/>Guide
					</div>
					<div>
						<GrFormClose onClick={handleClose} />
					</div>
				</div>
				<div className="dragBox-menu">
					<div onClick={() => handleToggleScreen(1)}>Screens</div>
					<div onClick={() => handleToggleScreen(2)}>Saved</div>
					<div onClick={() => handleToggleScreen(3)}>About</div>
				</div>

				{state.currentScreen === 1 && state.expandFlag && (
					<div className="dragBox-expanded" id="allScreens">
						{screenState.walkScreensArr.length > 0 && (

							<div className="dragBox-screen">
								<div className="dragBox-screen-6-input-title">
									<div className="dragBox-screen-6-input-titleText">Unique tour name</div>
									<div className="dragBox-screen-6-tourName"><textarea defaultValue={screenState.tourName} style={{ fontSize: "0.9rem" }} placeholder="e.g. Dashboard home tour" onChange={(eve) => handleTourNameChange(eve)} rows={1} /></div>
								</div>
							</div>
						)}
						<ScreenComponent />
						<div className="dragBox-submit">
							<div onClick={handleNewWalkScreen}>Add new screen +</div>
						</div>
						{
							screenState.tourId && 
							<div className="dragBox-submit" style={{ marginTop: "5px" }}>
								<div onClick={handleStartNewTour}>Create new tour +</div>
							</div>
						}
						{
							screenState.walkScreensArr.length > 0 &&
							<div className="dragBox-submit" onClick={handleSaveScreens} style={{ marginTop: "5px" }}>
								<div>submit</div>
							</div>
						}
						{
							state.saveMessage !== null &&
							<div className="notifyDiv" id="notifyDiv" style={{ color: state.isSaveErrored? "#F47373": "#37D67A" }}>
								<div>{state.saveMessage}</div>
								<div onClick={handleCloseNotifier}> <MdClose /> </div>
							</div>
						}
					</div>
				)}

				{
					state.currentScreen === 2 && state.expandFlag && <div className="dragBox-expanded"> 
						
						{
							state.savedScreenContent.map((content, idx) => {
								return (
									<div className="dragBox-screen">
										<div className="dragBox-screen-1">
											<div className="dragBox-screen-1-title">Tour #{idx + 1}</div>
											<div className="dragBox-screen-1-icons">
												<MdEdit onClick={() => handleEditTour(content)} />
												<MdDelete onClick={() => handleDeleteTour(content)} />
											</div>
										</div>
										<div className="dragBox-screen-2">
											id : { content.id }
										</div>
										<div className="dragBox-screen-2">
											Title : { content.tourName }
										</div>
									</div>
								)
							})
						}
					</div>
				}

				{	
					state.currentScreen === 3 && state.expandFlag && 
					<div className="dragBox-screen-6" style={{ margin: "10px" }}>
						<div className="dragBox-screen-6-input-title">
							<div className="dragBox-screen-6-input-titleText">Enter Token</div>
							<div><textarea style={{ fontSize: "0.9rem" }} defaultValue={state.token} placeholder="e.g. 55e4bef7a37b799522b59b9bd4b0791203e75f21" onBlur={handleTokenChange} rows={2} /></div>
						</div>
						
					</div>
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
