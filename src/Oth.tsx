import { useEffect, useState } from "react";
import "./Oth.css";

import { LogInReturnProps, Othent, useOthentReturnProps } from "othent";
// import { LogInReturnProps, useOthentReturnProps } from "othent";

const API_ID = import.meta.env.VITE_OTHENT_API_ID;

function Oth() {
  const [othent, setOthent] = useState<useOthentReturnProps | null>(null);
  const [user, setUser] = useState<LogInReturnProps | null>(null);
  const [toast, setToast] = useState("");

  Othent({ API_ID: API_ID }).then((oth) => setOthent(oth));

  const login = () => {
    if (!othent) return;
    othent.logIn().then((u) => setUser(u));
  };

  const logout = () => {
    if (!othent) return;
    othent.logOut().then((o) => {
      setToast(JSON.stringify(o));
      setUser(null);
    });
  };

  useEffect(() => {
    if (!toast) return;

    setTimeout(() => setToast(""), 5000);
  }, [toast]);

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      {!othent && <h2>Waiting for othent to initialize</h2>}

      <div className="card">
        {!user && (
          <button disabled={!othent} onClick={() => login()}>
            login
          </button>
        )}

        {user && (
          <button disabled={!othent} onClick={() => logout()}>
            logout
          </button>
        )}
      </div>

      {user && <p className="read-the-docs">{JSON.stringify(user)}</p>}
    </>
  );
}

export default Oth;
