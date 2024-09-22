import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#40513B",
            colorPrimaryHover: "#40513B",
            borderRadius: "2px",
            boxShadow: "none"
          },
        },
        token: {
          borderRadius: "10px",
          colorPrimary: "#405sfd"
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
