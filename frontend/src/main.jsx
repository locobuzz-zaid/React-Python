// import ReactDOM from "react-dom";
import "antd/dist/reset.css";
// import "antd/dist/antd.min.css";
import React from "react";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
