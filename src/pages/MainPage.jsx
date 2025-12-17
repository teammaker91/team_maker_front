import { useState, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import LoginPage from "./LoginPage.jsx";

function MainPage() {
  const [modal, setModal] = useState(null); // "login" | "register" | null

  // Auto-open login after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setModal("login");
    }, 4000);

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, []);

  return (
    <>
      <Layout openModal={setModal} />

      {modal && (
        <LoginPage
          defaultTab={modal === "login" ? "login" : "register"}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

export default MainPage;
