import React, { useContext } from "react";
import { TaxStore } from "../App";

function Frontpage() {
  const store = useContext(TaxStore);

  return (
    <>
      <div className="frontcontainer">
        <div>Create Resume</div>
        <br />
        <div className="btnbx" style={{display:'flex'}}>
          <button onClick={() => store.setPages(2)} style={{marginRight:'1rem'}}>Create</button>
          <button onClick={() => store.setPages(5)}>View</button>
        </div>
      </div>
    </>
  );
}

export default Frontpage;
