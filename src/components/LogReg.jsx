import React, { useState, useRef, useContext } from "react";
import "./logreg.css";
import axios from "axios";
import { TaxStore } from "../App";
const HOST = "http://localhost/api/";

function LogReg() {
  const store = useContext(TaxStore);
  const [loader, setLoader] = useState(false);
  const [sw, setSw] = useState(0);
  const name = useRef();
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
          store.setPages(2);
        } else {
          alert(data.msg);
        }
        setLoader(false);
      });
  };
  const handelRegister = (e) => {
    e.preventDefault();
    setLoader(true);
    const em = email.current.value;
    const pass = password.current.value;
    const nm = name.current.value;
    axios
      .post(HOST + "auth/register.php", {
        name: nm,
        email: em,
        password: pass,
      })
      .then(({ data }) => {
        if (data.status == 1) {
          alert("Account created successfully. Please login to proceed");
        } else {
          alert(data.msg);
        }
        setLoader(false);
      });
  };
  return (
    <>
      <div className="logregcontainer">
        {sw === 0 ? (
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
            <div className="choice">
              <span onClick={() => setSw(0)}>Login</span>
              <span style={{ color: "white" }}>|</span>
              <span onClick={() => setSw(1)}>Register</span>
            </div>
          </div>
        ) : (
          <div className="formcontainer">
            <form action="" method="POST" onSubmit={handelRegister}>
              <h4>Registration</h4>
              <input type="text" placeholder="Name" name="name" ref={name} />
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
                <button>register</button>
              )}
            </form>
            <div className="choice">
              <span onClick={() => setSw(0)}>Login</span>
              <span style={{ color: "white" }}>|</span>
              <span onClick={() => setSw(1)}>Register</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LogReg;
