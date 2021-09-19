import React from "react";
import ReactDOM from "react-dom";
import { SplitView } from "divider-react";
import "./main.css";

function App() {
  const options = {
    dividerSize: 10,
  };
  return (
    <div className="App">
      <h1 className="title">Split View Example</h1>
      <SplitView options={options}>
        <div>s</div>
        <div>p</div>
        <div>l</div>
        <div>i</div>
        <div>t</div>
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
