import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import App from './App'

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  // window.sessionActions = sessionActions;
}

declare global {
  interface Window {
    csrfFetch: typeof csrfFetch;
    store: typeof store;
  }
}

function Root() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  );
}





export default Root;