var array = [
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(1).bx--col-lg-3.mainGrid-leftPanel>div:nth-child(1).mainGrid-avatar-and-details>div:nth-child(3).mainGrid-envSelector>div.bx--form-item>fieldset.bx--radio-button-group.bx--radio-button-group--label-right",
        "style": "arrow-1",
        "title": "Environment Selector",
        "subtitle": "From here you can select a specific environment for which you can query data",
        "dragged": true,
        "draggedSizes": {
            "left": 343,
            "top": 75.40625
        },
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(1).bx--col-lg-3.mainGrid-leftPanel>div:nth-child(2).bx--side-nav__navigation.mainGrid-leftPanelNav>div:nth-child(2).bx--side-nav__submenu.leftSideBarMenuItem",
        "style": "arrow-1",
        "title": "Trial Orders",
        "subtitle": "This is the navigation, from here you can view different orders",
        "dragged": true,
        "draggedSizes": {
            "left": 485,
            "top": 456.40625
        },
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(2).bx--col-lg-13.mainGrid-rightPanel>div.trialGrid>div:nth-child(2).trialGrid-filtersLine",
        "style": "arrow-1",
        "title": "Filters",
        "subtitle": "These are the filters from here we can control the date between which we want to see the data, and apply field based filters as well",
        "dragged": true,
        "draggedSizes": {
            "left": 269.4375,
            "top": 399
        },
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(2).bx--col-lg-13.mainGrid-rightPanel>div.trialGrid>div:nth-child(3).trialGrid-sectionsToggler>div:nth-child(1).bx--tabs--scrollable>ul:nth-child(2).bx--tabs--scrollable__nav>li:nth-child(1).bx--tabs--scrollable__nav-item.bx--tabs__nav-item--selected.bx--tabs--scrollable__nav-item--selected>button.bx--tabs--scrollable__nav-link",
        "style": "arrow-1",
        "title": "Statistics",
        "subtitle": "From here you can see the statistics for the Trial Orders",
        "dragged": false,
        "draggedSizes": {},
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(2).bx--col-lg-13.mainGrid-rightPanel>div.trialGrid>div:nth-child(3).trialGrid-sectionsToggler>div:nth-child(1).bx--tabs--scrollable>ul:nth-child(2).bx--tabs--scrollable__nav>li:nth-child(2).bx--tabs--scrollable__nav-item>button#tab-2.bx--tabs--scrollable__nav-link",
        "style": "arrow-1",
        "title": "Analytics",
        "subtitle": "From here you can view the analytics for the chosen filters",
        "dragged": false,
        "draggedSizes": {},
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(2).bx--col-lg-13.mainGrid-rightPanel>div.trialGrid>div:nth-child(3).trialGrid-sectionsToggler>div:nth-child(2).bx--tab-content>div.trialGrid-dataTable>div:nth-child(1).bx--data-table-container",
        "style": "arrow-1",
        "title": "Table View",
        "subtitle": "From here you can see the indivisual orders",
        "dragged": true,
        "draggedSizes": {
            "left": 337.4375,
            "top": 126.5
        },
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": ""
    }
]

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
            startSocket: "auto"
        });

        // Make Content -> div2 draggable
        draggableRef.target = new window.PlainDraggable(div2);
        draggableRef.target.draggingClass = "";
        draggableRef.target.movingClass = "";
        draggableRef.target.draggableClass = "";
        draggableRef.target.onMove = handleContentDrag;
    }
};