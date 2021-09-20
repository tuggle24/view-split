import React from "react";
import ReactDOM from "react-dom";
import { ViewSplit } from "react-view-split";
import "./main.css";

function App() {
  const options = {
    dividerSize: 10,
  };
  return (
    <div className="App">
      <h1 className="title">Split View Example</h1>
      <ViewSplit options={options}>
        <div>s</div>
        <div>p</div>
        <div>l</div>
        <div>i</div>
        <div>t</div>
      </ViewSplit>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
