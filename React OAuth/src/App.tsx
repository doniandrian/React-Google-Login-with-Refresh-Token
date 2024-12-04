import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import SignInPage from "./signin";
import HomePage from "./home";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/signed-in" element={< HomePage />} />
            <Route path="/" element={<SignInPage/>} />
          </>
        )
      )}
    />
  );
}

export default App;
