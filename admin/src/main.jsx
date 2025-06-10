import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);
