import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextHostProvider } from "./context/AuthContextHost";
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextHostProvider>
      <SearchContextProvider>
        <AuthContextProvider>
          <DarkModeContextProvider>
            <App />
          </DarkModeContextProvider>
        </AuthContextProvider>
      </SearchContextProvider>
    </AuthContextHostProvider>
  </React.StrictMode>
);
