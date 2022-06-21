import React, { useState, useRef, useContext } from "react";
import "./logreg.css";
import axios from "axios";
import { TaxStore } from "../App";
const HOST = "http://localhost/api/";

function LogReg2() {
  const store = useContext(TaxStore);
  const [loader, setLoader] = useState(false);
  const email = useRef();
  const password = useRef();
  const handelLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    const em = email.current.value;
    const pass = password.current.value;
    axios
      .post(HOST + "auth/validate.php", {
        email: em,
        password: pass,
      })
      .then(({ data }) => {
        if (data.code == 200) {
          const d = { uid: data.uid, isLogin: true };
          store.setUser({ uid: data.uid, isLogin: true });
          store.setPages(5);
        }
      });
    setLoader(false);
  };
  return (
    <>
      <div className="logregcontainer">
        <div className="formcontainer">
          <form action="" method="POST" onSubmit={handelLogin}>
            <h4>Login</h4>
            <input
              type="email"
              placeholder="Email id"
              name="email"
              ref={email}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              ref={password}
            />
            {loader ? (
              <button disabled>
                <box-icon
                  color="white"
                  name="loader"
                  animation="spin"
                ></box-icon>
              </button>
            ) : (
              <button>Login</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LogReg2;
