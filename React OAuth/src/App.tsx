import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import SignInPage from "./signin";
import HomePage from "./home";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-in" element={<HomePage />} />
      </>
    )
  );

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
