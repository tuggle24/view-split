import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SplitView } from "divider-react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p>Hello Vite + React! Don't forget me!</p>
      <p>So this will work!!!!</p>
      <SplitView>
        <div>a</div>
        <div>b</div>
        <div>d</div>
        <div>f</div>
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
