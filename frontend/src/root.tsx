import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import App from './App'

import configureStore from "./store";
import * as sessionActions from './store/session';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import "./index.css";

declare global {
  interface Window {
    csrfFetch: typeof csrfFetch;
    store: typeof store;
    sessionActions : typeof sessionActions;
  }
}

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

export type AppDispatch = typeof store.dispatch


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