import React from "react";
import Card from "../components/Card";
// import CardForm from "../components/CardForm";
import { Link } from "react-router-dom";
import { UserContext } from "../Provider/context";

const showMessageAndErease = ({message, setStatus}) => {
  setStatus(message)
  setTimeout(() => setStatus(""), 2000);
}

const FormDeposit = (props) => {
  const ctx = React.useContext(UserContext);
  const [amount, setAmount] = React.useState(null);
  const user = ctx.users.find(user => user.email === ctx.currentUser)

  function depositAmount(e) {
    e.preventDefault();

    if (ctx.user !== "") {
      if (amount < 1) {
        showMessageAndErease({message : 'Number can\'t be negative', setStatus: props.setErrorMessage});
        return;
      } else {
        user.history += '+' + amount + '; ';
        user.balance = parseFloat(user.balance || 0) + parseFloat(amount);
        showMessageAndErease({message: `$${amount} deposit successful!`, setStatus: props.setStatus});
        setTimeout(() => props?.setStatus(""), 2000);
        setAmount(null);
        }
    } else {
      props?.setStatus("Login to make a deposit");
      setTimeout(() => props?.setStatus(""), 3000);
    }
  }

  return (
    <form onSubmit={depositAmount}>
    <label>Enter amount to deposit:
    <input
      type="number"
      name="number"
      className="form-control"
      required
      value={amount || ''}
      onChange={(e) => setAmount(e.currentTarget.value)}
      // value={ctx.name}
      // onChange={(e) => (ctx.name = e.currentTarget.value)}
    />
    </label>
      <input disabled={!(amount?.length > 0)} className="btn btn-light" type="submit" />
  </form>
  )
}

function Deposit() {
  const ctx = React.useContext(UserContext);
  const [status, setStatus] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const user = ctx.users.find(user => user.email === ctx.currentUser)


  console.log('ctx :', ctx)

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      text=""
      status={status}
      body={
        <>
        {ctx.currentUser ?
          <div>
            <h5 className="text-dark ">Balance :<span className="font-weight-bold"> {user.balance}$</span></h5>
            <FormDeposit setStatus={setStatus} setErrorMessage={setErrorMessage}/>
            <span className="text-danger" >{errorMessage || ''}</span>
          </div>
           :
           <div>
              <h4>You need to login first</h4>
              <Link to={'/login'} className="btn btn-light">
                Login
              </Link>
           </div>
        }

        </>
      }
    />
  );
}

export default Deposit;
