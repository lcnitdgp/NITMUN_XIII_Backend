import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Forrmc.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Button } from "react-scroll";
import { CgWindows } from "react-icons/cg";

const Formc = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [institute, setInstitute] = useState("NIT DURGAPUR");
  const [committee1, setComittee1] = useState("");
  const [preference1, setPreferences1] = useState("");
  const [committee2, setComittee2] = useState("");
  const [preference2, setPreferences2] = useState("");
  const [committee3, setComittee3] = useState("");
  const [preference3, setPreferences3] = useState("");
  const [experience, setExperience] = useState("");
  const [other, setOther] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");

  const postData = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/register", {
      // headers: {
      //   'Content-Type': 'application/json'
      // },

      name: name,
      email: email,
      phoneNumber: phoneNumber,
      institute: institute,
      committee1: committee1,
      preference1: preference1,
      committee2: committee2,
      preference2: preference2,
      committee3: committee3,
      preference3: preference3,
      experience: experience,
      year: year,
      roll: roll,
    })
    .then((res) => {
      console.log(res);
      console.log("submit");
      toast.success("Submitted.");
      window.location("/")
             //window.location.replace = "/";
    })

    .catch((err) => {
     console.log("hello")
     console.log(err)});
     toast.error("Please enter correct credentials")
  

    
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      phone: "",
      institution: "NIT DURGAPUR",
      committee1: "",
      preference1: "",
      committee2: "",
      preference2: "",
      committee3: "",
      preference3: "",
      experience: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must atleast be of 15 Characters")
        .required("required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().matches(phoneRegExp, "Phone Number not valid"),
      experience: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [checkI, setCheckI] = useState(true);
  
  //   const checkl = async (e)=>{
  //       setCheckI(true),
  //       setCheckII(false)
  //   }
  //   const checkl2 = async (e)=>{
  //     setCheckII(true),
  //     setCheckI(false)
  // }

  return (
    <div>
      <div class="container">
        <div class="login-container">
          <input
            id="item-1"
            type="radio"
            name="item"
            class="sign-in"
            checked={checkI}
            onClick={() => setCheckI(true)}
          />
          <label for="item-1" class="item">
            Delegate
          </label>
          <input
            id="item-2"
            type="radio"
            name="item"
            class="sign-up"
            checked={!checkI}
            onClick={() => setCheckI(false)}
          />
          <label for="item-2" class="item">
            IP
          </label>
          <div class="login-form">
            <form class="sign-in-htm" onSubmit={formik.handleSubmit}>
              <div class="group">
                <label for="firstname">Name11</label>
                <input
                  placeholder="Name"
                  name="Name"
                  id="Name"
                  type="text"
                  class="input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {formik.touched.Name && formik.errors.Name ? (
                  <div>{formik.errors.Name}</div>
                ) : null}
              </div>
              <div class="group">
                <label for="lastname">E-mail</label>
                <input
                  placeholder="Email"
                  name="email"
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div class="group">
                <label for="lastname">Phone Number</label>
                <input
                  placeholder="Phone"
                  name="phone"
                  className="input"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={phoneNumber}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div>{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="group">
                <label for="lastname">Institution</label>

                <select
                  placeholder="Institution"
                  type="text"
                  className="input"
                  name="institution"
                  onChange={(e) => {
                    setInstitute(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={institute}
                >
                  <option value="NIT DURGAPUR">NIT DURGAPUR</option>
                  <option value={other}>Other Institutions</option>
                </select>
              </div>
              <div
                class="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <label for="lastname">School/College</label>
                <input
                  placeholder="School/College"
                  name="email"
                  value={institute}
                  onChange={(e) => {
                    setInstitute(e.target.value);
                  }}
                  id="pass"
                  type="text"
                  class="input"
                  data-type="text"
                />
              </div>
              <div
                class="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <label for="lastname">Roll Number</label>
                <input
                  placeholder="Roll Number"
                  name="email"
                  value={roll}
                  onChange={(e) => {
                    setRoll(e.target.value);
                  }}
                  id="pass"
                  type="text"
                  class="input"
                  data-type="text"
                />
              </div>
              <div
                className="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <label for="lastname">Year</label>

                <select
                  placeholder="Institution"
                  type="text"
                  className="input"
                  name="institution"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={year}
                >
                  <option value="2023">First</option>
                  <option value="other">other</option>
                </select>
              </div>

              <br></br>
              <h2>Preferences 1:</h2>
              <br></br>

              <div class="group">
                <label for="Committee">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee1"
                  value={committee1}
                  onChange={(e) => {
                    setComittee1(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option value="UNGA-DISEC">UNGA-DISEC</option>
                  <option value="UNGA-SPECPOL">UNGA_SPECPOL</option>
                  <option value="AIPPM">AIPPM</option>
                </select>
              </div>

              <div
                class="group"
                style={
                  committee1 == "" ? { display: "none" } : { display: "block" }
                }
              >
                <label for="lastname">
                  {committee1 == "AIPPM" ? "Personality" : "Country"}
                </label>
                <select
                  className="input"
                  type="text"
                  name="preference1"
                  value={preference1}
                  onChange={(e) => {
                    setPreferences1(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <br></br>
              <h2>Preferences 2:</h2>
              <br></br>
              <div className="group">
                <label for="lastname">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee2"
                  onChange={(e) => {
                    setComittee2(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={committee2}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option
                    value="UNGA-DISEC"
                    style={
                      committee1 == "UNGA-DISEC"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA-DISEC
                  </option>
                  <option
                    value="UNGA-SPECPOL"
                    style={
                      committee1 == "UNGA-SPECPOL"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA_SPECPOL
                  </option>
                  <option
                    value="AIPPM"
                    style={
                      committee1 == "AIPPM"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    AIPPM
                  </option>
                </select>
              </div>
              <div
                class="group"
                style={
                  committee1 == "" ? { display: "none" } : { display: "block" }
                }
              >
                <label for="lastname">
                  {committee2 == "AIPPM" ? "Personality" : "Country"}
                </label>
                <select
                  className="input"
                  name="preference2"
                  type="text"
                  value={preference2}
                  onChange={(e) => {
                    setPreferences2(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <br></br>
              <h2>Preferences 3:</h2>
              <br></br>
              <div className="group">
                <label for="lastname">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee3"
                  value={committee3}
                  onChange={(e) => {
                    setComittee3(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option
                    value="UNGA-DISEC"
                    style={
                      committee1 == "UNGA-DISEC" || committee2 == "UNGA-DISEC"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA-DISEC
                  </option>
                  <option
                    value="UNGA-SPECPOL"
                    style={
                      committee1 == "UNGA-SPECPOL" ||
                      committee2 == "UNGA-SPECPOL"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA_SPECPOL
                  </option>
                  <option
                    value="AIPPM"
                    style={
                      committee1 == "AIPPM" || committee2 == "AIPPM"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    AIPPM
                  </option>
                </select>
              </div>
              <div
                class="group"
                style={
                  committee1 == "" ? { display: "none" } : { display: "block" }
                }
              >
                <label for="lastname">
                  {committee1 == "AIPPM" ? "Personality" : "Country"}
                </label>
                <select
                  className="input"
                  name="preference2"
                  type="text"
                  value={preference3}
                  onChange={(e) => {
                    setPreferences3(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div className="group">
                <label for="lastname">Experience</label>
                <textarea
                  className="input"
                  id="message"
                  type="text"
                  name="experience"
                  placeholder="Tell us about your experience"
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={experience}
                ></textarea>
              </div>

              <div class="group">
                <button
                  type="submit"
                  class="buttons"
                  value="Register"
                  onClick={postData}
                ><span> Register
                </span></button>
              </div>
              
            </form>
            <form class="sign-up-htm" onSubmit={formik.handleSubmit}>
            <div class="group">
                <label for="firstname">Name11</label>
                <input
                  placeholder="Name"
                  name="Name"
                  id="Name"
                  type="text"
                  class="input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {formik.touched.Name && formik.errors.Name ? (
                  <div>{formik.errors.Name}</div>
                ) : null}
              </div>
              <div class="group">
                <label for="lastname">E-mail</label>
                <input
                  placeholder="Email"
                  name="email"
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div class="group">
                <label for="lastname">Phone Number</label>
                <input
                  placeholder="Phone"
                  name="phone"
                  className="input"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={phoneNumber}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div>{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="group">
                <label for="lastname">Institution</label>

                <select
                  placeholder="Institution"
                  type="text"
                  className="input"
                  name="institution"
                  onChange={(e) => {
                    setInstitute(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={institute}
                >
                  <option value="NIT DURGAPUR">NIT DURGAPUR</option>
                  <option value={other}>Other Institutions</option>
                </select>
              </div>
              <div
                class="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <label for="lastname">School/College</label>
                <input
                  placeholder="School/College"
                  name="email"
                  value={institute}
                  onChange={(e) => {
                    setInstitute(e.target.value);
                  }}
                  id="pass"
                  type="text"
                  class="input"
                  data-type="text"
                />
              </div>
              <div
                class="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <label for="lastname">Roll Number</label>
                <input
                  placeholder="Roll Number"
                  name="email"
                  value={roll}
                  onChange={(e) => {
                    setRoll(e.target.value);
                  }}
                  id="pass"
                  type="text"
                  class="input"
                  data-type="text"
                />
              </div>
              <div
                className="group"
                style={
                  institute == "NIT DURGAPUR"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <label for="lastname">Year</label>

                <select
                  placeholder="Institution"
                  type="text"
                  className="input"
                  name="institution"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={year}
                >
                  <option value="2023">First</option>
                  <option value="other">other</option>
                </select>
              </div>

              <br></br>
              <h2>Preferences 1:</h2>
              <br></br>

              <div class="group">
                <label for="Committee">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee1"
                  value={committee1}
                  onChange={(e) => {
                    setComittee1(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option value="UNGA-DISEC-IP">UNGA-DISEC</option>
                  <option value="UNGA-SPECPOL-IP">UNGA_SPECPOL</option>
                  <option value="AIPPM-IP">AIPPM</option>
                </select>
              </div>

              <div
                class="group"
                style={
                  committee1 == "" ? { display: "none" } : { display: "block" }
                }
              >
                <label for="lastname">
                  News Agency
                </label>
                <select
                  className="input"
                  type="text"
                  name="preference1"
                  value={preference1}
                  onChange={(e) => {
                    setPreferences1(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <br></br>
              <h2>Preferences 2:</h2>
              <br></br>
              <div className="group">
                <label for="lastname">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee2"
                  onChange={(e) => {
                    setComittee2(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={committee2}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option
                    value="UNGA-DISEC-IP"
                    
                  >
                    UNGA-DISEC-IP
                  </option>
                  <option
                    value="UNGA-SPECPOL-IP"
                    style={
                      committee1 == "UNGA-SPECPOL-IP"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA-SPECPOL-IP
                  </option>
                  <option
                    value="AIPPM-IP"
                    style={
                      committee1 == "AIPPM-IP"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    AIPPM-IP
                  </option>
                </select>
              </div>
              <div
                class="group"
                style={
                  committee1 == "" ? { display: "none" } : { display: "block" }
                }
              >
                <label for="lastname">
                  News Agency
                </label>
                <select
                  className="input"
                  name="preference2"
                  type="text"
                  value={preference2}
                  onChange={(e) => {
                    setPreferences2(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <br></br>
              <h2>Preferences 3:</h2>
              <br></br>
              <div className="group">
                <label for="lastname">Committee</label>
                <select
                  className="input"
                  type="text"
                  name="committee3"
                  value={committee3}
                  onChange={(e) => {
                    setComittee3(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={"Select"}>Select</option>
                  <option
                    value="UNGA-DISEC-IP"
                    style={
                      committee1 == "UNGA-DISEC-IP" || committee2 == "UNGA-DISEC"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA-DISEC-IP
                  </option>
                  <option
                    value="UNGA-SPECPOL-IP"
                    style={
                      committee1 == "UNGA-SPECPOL-IP" ||
                      committee2 == "UNGA-SPECPOL-IP"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    UNGA-SPECPOL-IP
                  </option>
                  <option
                    value="AIPPM-IP"
                  >
                    AIPPM
                  </option>
                </select>
              </div>
              <div
                class="group"
                
              >
                <label for="lastname">
                  News Agency
                </label>
                <select
                  className="input"
                  name="preference2"
                  type="text"
                  value={preference3}
                  onChange={(e) => {
                    setPreferences3(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div className="group">
                <label for="lastname">Experience</label>
                <textarea
                  className="input"
                  id="message"
                  type="text"
                  name="experience"
                  placeholder="Tell us about your experience"
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={experience}
                ></textarea>
              </div>

              <div class="group">
                <button
                  type="submit"
                  class="buttons"
                  value="Register"
                  onClick={postData}
                ><span> Register
                </span></button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
      <Footer />
    </div>
  );
};

export default Formc;
