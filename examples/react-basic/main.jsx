import React from "react";
import ReactDOM from "react-dom";
import { SplitView } from "divider-react";
import "./main.css";

const afterDrag = (sizes) => {
  console.log("In app:", sizes);
};

function App() {
  const options = {
    divide: "horizontal",
    afterDrag,
  };
  return (
    <div className="App">
      <h1 className="title">Split View Example</h1>
      <SplitView options={options}>
        <div>a</div>
        <div>b</div>
        <div>d</div>
        <div>h</div>
      </SplitView>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
