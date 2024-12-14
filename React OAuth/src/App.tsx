// Mengimpor dependensi dan komponen yang diperlukan
import "./App.css"; // Gaya global untuk aplikasi
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"; // Library untuk manajemen routing
import { GoogleOAuthProvider } from '@react-oauth/google'; // Library untuk integrasi Google OAuth

// Mengimpor halaman SignIn dan Home
import SignInPage from "./signin"; 
import HomePage from "./home";

// Fungsi utama aplikasi
function App() {
  // Mengambil clientId untuk Google OAuth dari variabel lingkungan
  const clientId = import.meta.env.VITE_CLIENT_ID;
  
  // Mendefinisikan router dengan dua route: "/" untuk halaman SignIn dan "/homepage" untuk halaman Home
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignInPage />} /> 
        <Route path="/homepage" element={<HomePage />} />
      </>
    )
  );

  // Menyediakan konteks GoogleOAuthProvider dan router untuk seluruh aplikasi
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App; // Mengekspor fungsi App agar dapat digunakan di main.tsx