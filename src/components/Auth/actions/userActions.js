import { sessionService } from "redux-react-session";

// the remote endpoint and local
const currentUrl = "http://localhost:5000/";

export const loginUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    fetch(`${currentUrl}api/tenant/signin`, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({email: credentials.email, password: credentials.password}),
      headers: { "content-type": "application/JSON" },
    })

    .then((response) => response.json())
      .then((result) => {
        
        console.log(result)
        if (result.status === "FAILED") {
          const { message } = result;

          //check for specific error
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          } else if (message.toLowerCase().includes("email")) {
            setFieldError("email", message);
          }
        } else if (result.status === "SUCCESS") {
    
          const token = result.data[0].tenant_id;

          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(result.data[0])
                .then(() => {
                  history.push("/dashboard");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const signupUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  return (dispatch) => {
    fetch(`${currentUrl}api/tenant/signup`, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
      headers: { "content-type": "application/JSON" },
    })
    .then((response) => response.json())
      .then((result) => {

  

        if (result.status === "FAILED") {
          const { message } = result;

          //check for specific error
          if (message.includes("name")) {
            setFieldError("name", message);
          } else if (message.includes("email")) {
            setFieldError("email", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          } else if (message.includes("confirmPassword")) {
            setFieldError("confirmPassword", message);
          }
        } else if (result.status === "PENDING") {
          //display message for email verification
          history.push(`/emailsent/${credentials.email}`);
        }
        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const logoutUser = (history) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/");
  };
};

export const forgetpassword = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    fetch(`${currentUrl}api/tenant/passwordresetrequest`, {
      method: "POST",
      body: JSON.stringify({email: credentials.email}),
      headers: { "content-type": "application/JSON" },
    }) .then((response) => response.json())
        .then((result) => {
        

        if (result.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (
            message.toLowerCase().includes("user") ||
            message.toLowerCase().includes("password") ||
            message.toLowerCase().includes("email")
          ) {
            setFieldError("email", result.status);
          }
        } else if (result.status === "PENDING") {
          const { email } = credentials;
          history.push(`/emailsent/${email}/${true}`);
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const resetPassword = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    fetch(`${currentUrl}api/tenant/passwordreset`, {
      method: "POST",
      body: JSON.stringify({password: credentials.password}),
      headers: { "content-type": "application/JSON" },
    }) .then((response) => response.json())
       .then((result) => {


        if (result.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (message.toLowerCase().includes("password")) {
            setFieldError("newPassword", message);
          }
        } else if (result.status === "SUCCESS") {
          history.push(`/emailsent`);
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};
