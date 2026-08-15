import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { ChatProvider } from "./contexts/ChatContext";
import { AIProvider } from "./providers/AIProvider";
import { PlanProvider } from "./contexts/PlanContext";

import {

AuthProvider,

} from "./contexts/AuthContext";

import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/utilities.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
       <AuthProvider>
        <AIProvider>
         <PlanProvider>
           <ChatProvider>
             <App />
           </ChatProvider>
         </PlanProvider>
       </AIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);