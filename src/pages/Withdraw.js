import React from "react";
import Card from "../components/Card";
import { UserContext } from "../Provider/context";
import { Link } from "react-router-dom";


const showMessageAndErease = ({message, setStatus}) => {
  setStatus(message)
  setTimeout(() => setStatus(""), 2000);
}

const FormWithdraw = (props) => {
  const ctx = React.useContext(UserContext);
  const [amount, setAmount] = React.useState(null);
  const user = ctx.users.find(user => user.email === ctx.currentUser)

  console.log('id', user);

  function depositAmount(e) {
    e.preventDefault();
    if (parseFloat(amount) > user.balance) {
      // alert('transaction failed : Balance is too low');
      showMessageAndErease({message : 'transaction failed : Balance is too low', setStatus: props.setErrorMessage});
      return;
    } else if (amount < 1) {
      showMessageAndErease({message : 'Number must be upper than 0', setStatus: props.setErrorMessage});
      return;
    }
    user.history += '-' + amount + '\n';
    user.balance = parseFloat(user.balance || 0) - parseFloat(amount);

    if (ctx.user !== "") {
      showMessageAndErease({message: `$${amount} withdraw successful!`, setStatus: props?.setStatus})
      setAmount(null);
    } else {
      props?.setStatus("Login to make a deposit");
      setTimeout(() => props?.setStatus(""), 3000);
    }
  }

  return (
    <form onSubmit={depositAmount}>
    <label>Enter amount to withdraw :
    <input
      type="number"
      name="number"
      className="form-control"
      required
      value={amount || ''}
      onChange={(e) => setAmount(e.currentTarget.value)}
    />
    </label>
      <input disabled={!(amount?.length > 0)} className="btn btn-light" type="submit" />
  </form>
  )
}


function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [status, setStatus] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");


  const user = ctx.users.find(user => user.email === ctx.currentUser)

  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      text=""
      status={status}
      body={
        <>
          {ctx?.currentUser ?
          <div>
            <h5 className="text-dark ">Balance :<span className="font-weight-bold"> {user.balance}$</span></h5>
            <FormWithdraw setStatus={setStatus} setErrorMessage={setErrorMessage}/>
            <span className="text-danger">{errorMessage || ''}</span>
          </div> :
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

export default Withdraw;
