import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { BallTriangle } from "react-loader-spinner";
import "./LoginPage.css";

//auth
import { connect } from "react-redux";
import { signupUser } from "../../Auth/actions/userActions";
import { PassTextField, TextField } from "../../Forms/FormLib";

function RegisterPage({ signupUser }) {
  const [show, setShow] = useState(false);
  let history = useHistory();
  const [ErrorMessage, seterrormessage] = useState();

  return (
    <div className="backgroundcontainer">
      <div className="registerinnercontainer">
        <div className="containertitle">Register For La Carte</div>
        <div className="containerforms">
          <Formik
            initialValues={{
              name: "",
              email: "",
              address: "",
              phonenumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Invalid e-mail address")
                .required("Required"),
              // address: Yup.string().required("Required"),
              // phonenumber: Yup.number()
              //   .typeError("Enter valid phone number")
              //   .required("Required"),
              password: Yup.string()
                .min(8, "Password is too short - should be 8 chars minimum")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
                .max(30, "Password is too long")
                .required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Password not matched")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              console.log("what", values);
              signupUser(
                values,
                history,
                setFieldError,
                seterrormessage,
                setSubmitting
              );
              console.log(setFieldError);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                {/* <div className="inputcontainer">
              <FontAwesomeIcon icon={faLocationDot} className="loginicons" />
              <TextField
                label="Address"
                name="address"
                type="text"
                placeholder="Enter your address"
         
              />
               
            </div> */}

                {/* <div className="inputcontainer">
              <FontAwesomeIcon icon={faPhone} className="loginicons" />
              <TextField
                label="Phone Number"
                name="phonenumber"
                type="text"
                placeholder="Enter your phone"
        
              />
            </div> */}
                <div className="marginedinputform">
                  <TextField
                    //label="Email"
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                </div>

                <div className="marginedinputform">
                  <TextField
                    //label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>

                <div className="passinputform">
                  <PassTextField
                    //label="Password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <div className="passinputform">
                  <PassTextField
                    //label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="buttongroup">
                  {!isSubmitting && (
                    <button
                      type="submit"
                      onClick={console.log("pressed", onsubmit)}
                      className="loginbutton"
                    >
                      {" "}
                      Register{" "}
                    </button>
                  )}
                  {isSubmitting && (
                    <BallTriangle color="#f10c0c" height={80} width={80} />
                  )}
                </div>

                <div className="middlerow">
                  Already have an account?{" "}
                  <Link to="/login" className="link">
                    &nbsp;Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { signupUser })(RegisterPage);
