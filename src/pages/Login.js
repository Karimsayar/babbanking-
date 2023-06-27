import React, { useEffect } from "react";
import Card from "../components/Card";
import { UserContext } from "../Provider/context";

function Login(){
  const [showLoginForm, setShowLoginForm]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const ctx = React.useContext(UserContext);

  useEffect(() => {
    if (ctx.currentUser === null) {
      setShowLoginForm(true);
    } else {
      setShowLoginForm(false);
    }
  }, [ctx.currentUser])

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        <>
          {showLoginForm ?
            <LoginForm setShowLoginForm={setShowLoginForm} setStatus={setStatus} setErrorMessage={setErrorMessage}/> :
            <LoginMsg setShowLoginForm={setShowLoginForm} setStatus={setStatus}/>}
          <span className="text-danger" >{errorMessage || ''}</span>
        </>
      }
    />
  )
}

function LoginMsg(props){
  const ctx = React.useContext(UserContext);
  const user = ctx.users.find(user => ctx.currentUser === user.email)

  return(<>
    <h5>Logged in as {user?.name}</h5>
    <p>With email: {user?.email}</p>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        ctx.currentUser = null;
        props.setShowLoginForm(true);
        }}>
        Logout
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [availableButton, setAvailableButton] = React.useState(true);
  const ctx = React.useContext(UserContext);


  React.useEffect(() => {
    setAvailableButton(email?.length > 0 && password?.length > 0)
  }, [email, password]);

  const setCurrentUser = () => {
    const userToLogin = ctx.users.find((user) => {
      return user.email === email && user.password === password
    })
    if (userToLogin !== undefined) {
      ctx.currentUser = userToLogin?.email;
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setCurrentUser() === true) {
      props.setShowLoginForm(false)
      return;
    } else {
      props.setErrorMessage('Email or passwords do not match');
      setTimeout(() => props.setErrorMessage(""), 2000);
    }
  }

  return (<>
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}/>
      </label>

      <label>
        Password
        <input type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}/>
      </label>

      <label htmlFor="showPassword">
        <input type="checkbox" id='showPassword' onClick={() => setShowPassword(!showPassword)}/> Show Password
      </label>

      <br/>
      <input disabled={!availableButton} className="btn btn-light" type="submit" />

      {/* <label> */}
        {/* <input disabled={!availableButton} type="submit" className="btn btn-light"/> */}
      {/* </label> */}
    </form>

  </>);
}

export default Login;
