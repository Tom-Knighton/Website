import "../styles/globals.css";
import "../styles/profile.css";
import { ThemeProvider } from "next-themes";
import NavBar from "../components/navbar";
import { AppProps } from "next/dist/next-server/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <NavBar page={Component.name}></NavBar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
