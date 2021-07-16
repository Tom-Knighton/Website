import "../styles/globals.css";
import "../styles/profile.css";
import { ThemeProvider } from "next-themes";
import NavBar from "../components/navbar";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { chatHubRegistration } from "../middleware/chatHub";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(chatHubRegistration)));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <NavBar page={Component.name}></NavBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
