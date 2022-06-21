import React, { useContext, useEffect, useState } from "react";
import { TaxStore } from "../App";
import "./resumestyle.css";
import { firebaseDatabase } from "../util/config";
import { ref, onValue } from "firebase/database";

function Resume() {
  const store = useContext(TaxStore);
  const [load, setLoad] = useState(false);
  if (store.user.isLogin === false) {
    store.setPages(4);
  }
  const { resumeDetail } = store;
  console.log(resumeDetail);
  useEffect(() => {
    onValue(ref(firebaseDatabase, "resume/" + store.user.uid), (snapshot) => {
      const data = snapshot.val();
      store.setResumeDetail(data);
      setLoad(true);
    });
  }, []);

  return (
    <>
      <div className="rsm">
        {load ? (
          <div className="containerl">
            <div className="left">
              <div className="profileTxt">
                <div className="Imgbox">
                  <img
                    src={`http://localhost/api/images/${resumeDetail.imgName}`}
                  />
                </div>
                <h3>
                  {resumeDetail.HSname}
                  <br />
                  <span>{resumeDetail.HSroll}</span>
                </h3>
              </div>
              <div className="contactInfo">
                <h4 className="title">Contact Info.</h4>
                <ul>
                  <li>
                    <span className="icon">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </span>
                    <span className="text">{resumeDetail.HSemail}</span>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </span>
                    <span className="text">+91 {resumeDetail.HSmobile}</span>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fa fa-globe" aria-hidden="true"></i>
                    </span>
                    <span className="text">{resumeDetail.HSwebsite}</span>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </span>
                    <span className="text" style={{ textTransform: "none" }}>
                      <a
                        style={{ color: "#fff" }}
                        href={`https://www.linkedin.com/in/${resumeDetail.HSlinkedin}`}
                      >
                        LinkedIn/{resumeDetail.HSlinkedin}
                      </a>
                    </span>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                    <span className="text">{resumeDetail.HSaddress}</span>
                  </li>
                </ul>
              </div>
              <div className="contactInfo education">
                <h4 className="title">Education</h4>
                <ul>
                  {resumeDetail.products.map((e) => (
                    <li>
                      <h6>Year of Passing- {e.yop}</h6>
                      <h5>{e.courceName}</h5>
                      <h5>{e.bord}</h5>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="contactInfo language">
                <h4 className="title">Languages</h4>
                <ul>
                  {resumeDetail.language.map((e) => (
                    <li>
                      <span className="text">{e.langName}</span>
                      <span className="percent">
                        <div style={{ width: `${e.prof}%` }}></div>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right">
              <div className="about">
                <h3 className="title2">Profile</h3>
                <p>{resumeDetail.HSabtyou}</p>
              </div>
              <div className="about">
                <h3 className="title2">Experience</h3>
                {resumeDetail.experience.map((e) => (
                  <div className="box">
                    <div className="year_company">
                      <h5>
                        {e.from}-{e.to}
                      </h5>
                      <h5>
                        <strong>{e.companyName}</strong>
                      </h5>
                    </div>
                    <div className="text">
                      <h4>{e.jobTitle}</h4> <p>{e.about}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="about skills">
                <h3 className="title2">Professional Skills</h3>
                {resumeDetail.skill.map((e) => (
                  <div className="box">
                    <h4>{e.skillName}</h4>
                    <div className="percent">
                      <div style={{ width: `${e.prof}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="about hobbies">
                <h3 className="title2">Hobbies</h3>
                <ul>
                  {resumeDetail.ownHobbie.map((e) => (
                    <li>
                      <i className={`${e.icon}`} aria-hidden="true"></i>
                      <strong>{e.hobbie}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="social">
                <h3 className="title2">Social Media</h3>
                <ul>
                  <li>
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>
                    <strong>Facebook</strong>
                    <br />
                    <p>www.facebook.com/{resumeDetail.HSfb}</p>
                  </li>
                  <li>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <strong>Instagram</strong>
                    <p>www.instagram.com/{resumeDetail.HSinsta}</p>
                  </li>
                  <li>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <strong>Twitter</strong>
                    <p>www.twitter.com/{resumeDetail.HStwitter}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Resume;
