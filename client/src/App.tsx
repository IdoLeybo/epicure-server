import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import AdminSystem from "./components/admin/AdminSystem";
import UserSystem from "./components/homepage/UserSystem";
import Welcome from "./components/welcome/Welcome";

function App() {
  const [inProp, setInProp] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [token, setToken] = useState(localStorage.getItem("user"));

  useEffect(() => {
    setInProp(true);
    Aos.init({ duration: 500, delay: 50 });
  }, []);

  return (
    <div>
      {!token && !admin ? (
        <Welcome setToken={setToken} setAdmin={setAdmin} />
      ) : token && !admin ? (
        <UserSystem inProp={inProp} setToken={setToken} />
      ) : (
        admin && <AdminSystem setAdmin={setAdmin} />
      )}
    </div>
  );
}

export default App;
