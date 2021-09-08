import React, { useState } from "react";
import ReactDOM from "react-dom";
import Divider from "../../index.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p>Hello Vite + React! Don't forget me!</p>
      <p>So this will work!!!!</p>
      <Divider>
        <div>a</div>
        <div>b</div>
      </Divider>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
