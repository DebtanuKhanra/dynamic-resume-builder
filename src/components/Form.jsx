import React, { useState, useContext } from "react";
import { TaxStore } from "../App";
import axios from "axios";
import { set, ref } from "firebase/database";
import { firebaseDatabase } from "../util/config";
const HOST = "http://localhost/api/";

function Form() {
  const store = useContext(TaxStore);
  const [loader, setLoader] = useState(false);
  const name = React.useRef();
  const email = React.useRef();
  const mobile = React.useRef();
  const website = React.useRef();
  const linkedin = React.useRef();
  const address = React.useRef();
  const roll = React.useRef();
  const abtyou = React.useRef();
  const fb = React.useRef();
  const insta = React.useRef();
  const twitter = React.useRef();
  const hobbie = React.useRef();
  const updf = React.useRef();
  if (store.user.isLogin === false) {
    store.setPages(1);
  }

  const [products, setProducts] = useState([
    {
      courceName: "",
      yop: "",
      bord: "",
    },
  ]);
  const [language, setLanguage] = useState([
    {
      langName: "",
      prof: "",
    },
  ]);
  const [skill, setSkill] = useState([
    {
      skillName: "",
      prof: "",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      companyName: "",
      from: "",
      to: "",
      jobTitle: "",
      about: "",
    },
  ]);
  const [ownHobbie, setOwnHobbie] = useState([]);
  const addNewEducation = () => {
    const obj = {
      courceName: "",
      yop: "",
      bord: "",
    };
    setProducts((e) => {
      return [...e, obj];
    });
  };
  const changeEducation = (e) => {
    const f = e.target.name.split("-");
    const dt = [];
    products.map((p, i) => {
      if (i === parseInt(f[0])) {
        const ky = f[1];
        p[ky] = e.target.value;
      }
      dt.push(p);
    });
    setProducts(dt);
  };
  const addNewLanguage = () => {
    const obj = {
      langName: "",
      prof: "",
    };
    setLanguage((e) => {
      return [...e, obj];
    });
  };
  const changeLanguage = (e) => {
    const f = e.target.name.split("-");
    const dt = [];
    language.map((p, i) => {
      if (i === parseInt(f[0])) {
        const ky = f[1];
        p[ky] = e.target.value;
      }
      dt.push(p);
    });
    setLanguage(dt);
  };
  const addNewSkill = () => {
    const obj = {
      skillName: "",
      prof: "",
    };
    setSkill((e) => {
      return [...e, obj];
    });
  };
  const changeSkill = (e) => {
    const f = e.target.name.split("-");
    const dt = [];
    skill.map((p, i) => {
      if (i === parseInt(f[0])) {
        const ky = f[1];
        p[ky] = e.target.value;
      }
      dt.push(p);
    });
    setSkill(dt);
  };
  const addNewExperience = () => {
    const obj = {
      companyName: "",
      from: "",
      to: "",
      jobTitle: "",
      about: "",
    };
    setExperience((e) => {
      return [...e, obj];
    });
  };
  const changeExperience = (e) => {
    const f = e.target.name.split("-");
    const dt = [];
    experience.map((p, i) => {
      if (i === parseInt(f[0])) {
        const ky = f[1];
        p[ky] = e.target.value;
      }
      dt.push(p);
    });
    setExperience(dt);
  };
  const addHobbie = () => {
    const r = hobbie.current.value.split("+");
    setOwnHobbie((e) => {
      return [...e, { hobbie: r[1], icon: r[0] }];
    });
  };
  const handelSubmit = () => {
    setLoader(true);
    const HSname = name.current.value;
    const HSemail = email.current.value;
    const HSmobile = mobile.current.value;
    const HSwebsite = website.current.value;
    const HSlinkedin = linkedin.current.value;
    const HSaddress = address.current.value;
    const HSroll = roll.current.value;
    const HSabtyou = abtyou.current.value;
    const HSfb = fb.current.value;
    const HSinsta = insta.current.value;
    const HStwitter = twitter.current.value;

    const final = {
      HSname,
      HSemail,
      HSmobile,
      HSwebsite,
      HSlinkedin,
      HSaddress,
      HSroll,
      HSabtyou,
      HSfb,
      HSinsta,
      HStwitter,
      products,
      language,
      skill,
      experience,
      ownHobbie,
    };

    let fl = {
      selectedFile: "",
    };
    let files = updf.current.files;
    if (files.length == 0) {
      alert("Select image");
      setLoader(false);
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        fl.selectedFile = e.target.result;
        axios.post(HOST + "auth/upload.php", fl).then((en) => {
          final["imgName"] = en.data;
          set(ref(firebaseDatabase, "resume/" + store.user.uid), final).then(
            (e) => {
              store.setResumeDetail(final);
              store.setPages(3);
              setLoader(false);
            }
          );
        });
      };
    }
  };
  console.log("resume/" + store.user);
  const showImage = (e) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="App">
      <div className="container">
        <h4 className="th4">Create your resume.</h4>
        <div className="formcontainer">
          <div className="imagebox">
            <div className="image">
              <img src="./src/assets/images/s.png" alt="" id="output" />
              <input
                type="file"
                name="filel"
                id="filel"
                style={{ display: "none" }}
                onChange={showImage}
                ref={updf}
              />
            </div>
            <label htmlFor="filel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                style={{ fill: "#07d9f5" }}
              >
                <path d="M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"></path>
                <path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z"></path>
              </svg>
            </label>
          </div>
          <div className="formrow">
            <input type="text" placeholder="Enter Name*" id="name" ref={name} />
          </div>
          <div className="formrow">
            <input
              type="text"
              placeholder="Enter About You*"
              id="aboutyou"
              ref={abtyou}
            />
          </div>
          <div className="formrow">
            <input
              type="email"
              placeholder="Enter Email*"
              id="email"
              ref={email}
            />
          </div>
          <div className="formrow">
            <input
              type="tel"
              placeholder="Enter Mobile*"
              id="mobile"
              ref={mobile}
            />
          </div>
          <div className="formrow">
            <input
              type="text"
              placeholder="Enter Website*"
              id="website"
              ref={website}
            />
          </div>
          <div className="formrow">
            <input
              type="text"
              placeholder="Enter LinkedIn Profile*"
              id="linkedin"
              ref={linkedin}
            />
          </div>
          <div className="formrow">
            <input
              type="text"
              placeholder="Enter Address*"
              id="address"
              ref={address}
            />
          </div>
          <div className="formrow">
            <input
              type="text"
              placeholder="Enter Current Roll*"
              id="roll"
              ref={roll}
            />
          </div>
          <div className="edu">
            <div className="h4">
              <div className="d">
                <h4>Education</h4>
                <button onClick={() => addNewEducation()}>+</button>
              </div>
            </div>
            {products.map((e, index) => (
              <div className="formrow" key={index}>
                <div className="edubox">
                  <div className="eduinput">
                    <input
                      type="text"
                      placeholder="Course Name*"
                      name={`${index}-courceName`}
                      onChange={changeEducation}
                    />
                    <input
                      type="text"
                      placeholder="Year Of Passing*"
                      name={`${index}-yop`}
                      onChange={changeEducation}
                    />
                    <input
                      type="text"
                      placeholder="Bord/University*"
                      name={`${index}-bord`}
                      onChange={changeEducation}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lang">
            <div className="edu">
              <div className="h4">
                <div className="d">
                  <h4>Language</h4>
                  <button onClick={addNewLanguage}>+</button>
                </div>
              </div>
              {language.map((e, index) => (
                <div className="formrow" key={index}>
                  <div className="edubox">
                    <div className="eduinput">
                      <input
                        type="text"
                        placeholder="Language*"
                        name={`${index}-langName`}
                        style={{ width: "48%" }}
                        onChange={changeLanguage}
                      />
                      <input
                        type="text"
                        placeholder="Proffeciyency*"
                        style={{ width: "48%" }}
                        name={`${index}-prof`}
                        onChange={changeLanguage}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="skill">
            <div className="lang">
              <div className="edu">
                <div className="h4">
                  <div className="d">
                    <h4>Skills</h4>
                    <button onClick={addNewSkill}>+</button>
                  </div>
                </div>
                {skill.map((e, index) => (
                  <div className="formrow" key={index}>
                    <div className="edubox">
                      <div className="eduinput">
                        <input
                          type="text"
                          placeholder="Skill*"
                          name={`${index}-skillName`}
                          style={{ width: "48%" }}
                          onChange={changeSkill}
                        />
                        <input
                          type="text"
                          placeholder="Proffeciyency*"
                          style={{ width: "48%" }}
                          name={`${index}-prof`}
                          onChange={changeSkill}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="exp">
            <div className="skill">
              <div className="lang">
                <div className="edu">
                  <div className="h4">
                    <div className="d">
                      <h4>Experience</h4>
                      <button onClick={addNewExperience}>+</button>
                    </div>
                  </div>
                  {experience.map((e, index) => (
                    <div className="formrow" key={index}>
                      <div className="edubox">
                        <div
                          className="eduinput"
                          style={{ flexDirection: "column" }}
                        >
                          <input
                            style={{ width: "100%", margin: "0.5rem 0" }}
                            type="text"
                            placeholder="Company Name*"
                            name={`${index}-companyName`}
                            onChange={changeExperience}
                          />
                          <input
                            type="text"
                            style={{ width: "100%", margin: "0.5rem 0" }}
                            placeholder="From*"
                            name={`${index}-from`}
                            onChange={changeExperience}
                          />
                          <input
                            type="text"
                            style={{ width: "100%", margin: "0.5rem 0" }}
                            placeholder="To*"
                            name={`${index}-to`}
                            onChange={changeExperience}
                          />
                          <input
                            type="text"
                            style={{ width: "100%", margin: "0.5rem 0" }}
                            placeholder="Jobtitle*"
                            name={`${index}-jobTitle`}
                            onChange={changeExperience}
                          />
                          <input
                            type="text"
                            style={{ width: "100%", margin: "0.5rem 0" }}
                            placeholder="About the job*"
                            name={`${index}-about`}
                            onChange={changeExperience}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="scl">
            <div className="skill">
              <div className="lang">
                <div className="edu">
                  <div className="h4">
                    <div className="d">
                      <h4>Social Media</h4>
                    </div>
                  </div>
                  <div className="formrow">
                    <div className="edubox">
                      <div className="eduinput">
                        <input
                          style={{ width: "30%", margin: "0.5rem 0" }}
                          type="text"
                          placeholder="Facebook*"
                          ref={fb}
                        />
                        <input
                          style={{ width: "30%", margin: "0.5rem 0" }}
                          type="text"
                          placeholder="Instagram*"
                          ref={insta}
                        />
                        <input
                          style={{ width: "30%", margin: "0.5rem 0" }}
                          type="text"
                          placeholder="Twitter*"
                          ref={twitter}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scl">
            <div className="skill">
              <div className="lang">
                <div className="edu">
                  <div className="h4">
                    <div className="d">
                      <h4>Hobbies</h4>
                    </div>
                  </div>
                  <div className="formrow">
                    <div className="edubox">
                      <select name="sd" ref={hobbie} onChange={addHobbie}>
                        <option value="0">Select a hobbie</option>
                        <option value="fa fa-pencil-square+Drawing">
                          <strong>Drawing</strong>
                        </option>
                        <option value="fa fa-cutlery+Cooking">
                          <strong>Cooking</strong>
                        </option>
                        <option value="fa fa-music+Singing">
                          <strong>Singing</strong>
                        </option>
                        <option value="fa fa-book+Reading">
                          <strong>Reading</strong>
                        </option>
                        <option value="fa fa-bolt+Dancing">
                          <strong>Dancing</strong>
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="formrow">
                    <div className="hctn">
                      {ownHobbie.map((e) => (
                        <span style={{ margin: "0.5rem" }}>
                          <i
                            class={e.icon}
                            aria-hidden="true"
                            style={{ color: "blue", marginRight: "0.5rem" }}
                          ></i>
                          {e.hobbie}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnrow">
            {loader === true ? (
              <button disabled>
                <box-icon
                  color="white"
                  name="loader"
                  animation="spin"
                ></box-icon>
              </button>
            ) : (
              <button onClick={handelSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
