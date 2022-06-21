import React, { createContext, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Frontpage from "./components/Frontpage";
import LogReg from "./components/LogReg";
import LogReg2 from "./components/LogReg2";
import Resume from "./components/Resume";
import ViewRes from "./components/ViewRes";

const TaxStore = createContext({});
function App() {
  const [pages, setPages] = useState(0);
  const [resumeDetail, setResumeDetail] = useState({});
  const [user, setUser] = useState({ isLogin: false, uid: null });
  return (
    <>
      <TaxStore.Provider
        value={{
          pages,
          setPages,
          resumeDetail,
          setResumeDetail,
          user,
          setUser,
        }}
      >
        {pages === 0 ? (
          <Frontpage />
        ) : pages == 1 ? (
          <LogReg />
        ) : pages === 2 ? (
          <Form />
        ) : pages === 3 ? (
          <Resume />
        ) : pages === 4 ? (
          <LogReg2 />
        ) : (
          <ViewRes />
        )}
      </TaxStore.Provider>
    </>
  );
}
export { TaxStore };
export default App;
