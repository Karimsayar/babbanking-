import React from "react";
import Card from "../components/Card";
import { UserContext } from "../Provider/context";


const CreateAccountForm = (props) => {
  const ctx = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [availableButton, setAvailableButton] = React.useState(true);

  const handleSubmit = (e) => {
    //
    e.preventDefault();
    console.log('e', e);

    const userAlreadyExist = ctx.users.find((user) => {
      return user.email === email
    })

    if (userAlreadyExist !== undefined) {
      props?.setErrorMessage('Cette adresse mail est deja utilisée')
      setTimeout(() => props?.setErrorMessage(""), 2000);
      return;
    }

    console.log('ctx :', ctx);
    let tmp = ctx?.users
    tmp.push({name: name, email: email, password: password, balance: balance, firstBalance: balance, history: ''})
    ctx.users = tmp
    props.setShow(false);
  }

  React.useEffect(() => {
    setAvailableButton(name?.length > 0 && email?.length > 0 && password?.length > 0 && balance?.length > 0)
  }, [email, name, password, balance]);

  return (
    <form onSubmit={handleSubmit}>
    <label>Enter name:
    <input
      type="text"
      name="name"
      className="form-control"
      required
      value={name || ""}
      onChange={(e) => setName(e.currentTarget.value)}
    />
    </label>
    <label>Enter email:
      <input
        required
        type="email"
        name="email"
        className="form-control"
        value={email || ""}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      </label>
      <label>Enter password:
      <input
        required
        type={showPassword ? "text" : "password"}
        name="password"
        className="form-control"
        minLength="8"

        value={password || ''}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      </label>

      <label htmlFor="showPassword">
        <input type="checkbox" id='showPassword' onClick={() => setShowPassword(!showPassword)}/> Show Password
      </label>


      <label>Enter balance:
      <input
        required
        type="number"
        name="balance"
        className="form-control"

        value={balance || ''}
        onChange={(e) => setBalance(e.currentTarget.value)}
      />
      </label>

      <input disabled={!availableButton} className="btn btn-light" type="submit" />
  </form>
  )
}

function CreateAccount(props) {
  const [show, setShow] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      text=""
      body={
        <>
          {show ? (
            <>
              <CreateAccountForm setShow={setShow} setErrorMessage={setErrorMessage}/>
              <span className="text-danger bg-dark">{errorMessage || ''}</span>
            </>
          ) : (
            <Success setShow={setShow} />
          )}
        </>
      }
    />
  );
}

function Success(props) {
  return (
    <>
      <h5>Success!</h5>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

export default CreateAccount;
