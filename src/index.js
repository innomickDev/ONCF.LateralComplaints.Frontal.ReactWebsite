import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from "history";
import { unregister } from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import "./assets/custom.scss";
import fr from "./translations/fr.json";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";

const hist = createBrowserHistory();
setDefaultTranslations({ fr });
if (localStorage.getItem("lang")) {
  setDefaultLanguage(localStorage.getItem("lang").split("-")[0]);
} else {
  setDefaultLanguage(`${process.env.REACT_APP_LANG_NAME}`);
}


const store = configureStore();
const rootElement = document.getElementById("root");
const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={hist}>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};
// change default component here
renderApp(Main);

if (module.hot) {
  module.hot.accept("./Pages/Components/Login", () => {
    const NextApp = require("./Pages/Components/Login").default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();
