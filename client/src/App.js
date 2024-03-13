import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import AdminRoute from "./admin/AdminRoute";
import { ContextAdminStore} from './ContextAdminStore';
import { AdminProvider } from "./contextStore/AdminAuthContext";
import LanguageProvider from "./contextStore/LanguageContext";
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
function App() {
  return (
    <Router>
      
            <Switch>
            <Route path="/admin">
              <ContextAdminStore>
                <AdminProvider> {/* Provide AdminAuthContext */}
                  <AdminRoute />
                </AdminProvider>
                </ContextAdminStore>
              </Route>
             
              <Route path="/">
              <LanguageProvider> 
                {/* Main routes for front-end */}
                <I18nextProvider i18n={i18n}>
                <MainRoutes />
                </I18nextProvider>
                </LanguageProvider>
             {/* Render footer for front-end */}
              </Route>
            
            </Switch>
        
    </Router>
  );
}

export default App;
