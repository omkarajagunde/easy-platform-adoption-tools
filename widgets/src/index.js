import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

window.PAToolsWidgets = {};
let div = document.createElement("div")
div.id = "windowFrame"
div.attachShadow({ mode: "open" })
document.body.appendChild(div)

const root = ReactDOM.createRoot(div);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

