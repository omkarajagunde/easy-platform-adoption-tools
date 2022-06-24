import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

window.PAToolsWidgets = {};
let div = document.createElement("div")
div.id = "windowFrame"
div.attachShadow({ mode: "open" })
document.body.appendChild(div)

window.walkScreensArr = [
    {
        "color": {
            "r": 105,
            "g": 118,
            "b": 137,
            "a": 1
        },
        "opacity": "7",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(1).bx--col-lg-3.mainGrid-leftPanel>div:nth-child(1).mainGrid-avatar-and-details>div:nth-child(3).mainGrid-envSelector>div.bx--form-item>fieldset.bx--radio-button-group.bx--radio-button-group--label-right",
        "style": "arrow-1",
        "title": "Environment Selector",
        "subtitle": "This is the environment selector, you can choose from dev, stage, prod and query data accordingly",
        "dragged": true,
        "draggedSizes": {
            "left": 428,
            "top": 72.40625
        },
        "arrowType": "arrow2",
        "videoURL": "",
        "imageURL": ""
    },
    {
        "color": {
            "r": 244,
            "g": 115,
            "b": 115,
            "a": 1
        },
        "opacity": "8",
        "element": "html>body:nth-child(2)>div:nth-child(1)#__next>main>div.App>div:nth-child(2).bx--grid.mainGrid>div:nth-child(1).bx--row.mainGrid-row>div:nth-child(2).bx--col-lg-13.mainGrid-rightPanel>div.trialGrid>div:nth-child(2).trialGrid-filtersLine",
        "style": "arrow-1",
        "title": "Filters",
        "subtitle": "On specific environment selected you can apply different filters in order to see speific data",
        "dragged": true,
        "draggedSizes": {
            "left": 468.4375,
            "top": 392
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
        "subtitle": "From here you can see the statisctics",
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
        "subtitle": "From here we can see the analytics like distribution of orders, concentration of orders by PARTS etc...",
        "dragged": false,
        "draggedSizes": {},
        "arrowType": "arrow3",
        "videoURL": "",
        "imageURL": "https://media2.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif"
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
        "title": "Table view",
        "subtitle": "This is the table view to see all the orders details",
        "dragged": true,
        "draggedSizes": {
            "left": 404.4375,
            "top": 43.5
        },
        "arrowType": "arrow3",
        "videoURL": "https://www.youtube.com/embed/dYjdzpZv5yc",
        "imageURL": ""
    }
]

const root = ReactDOM.createRoot(div);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

