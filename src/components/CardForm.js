import React from "react";
import { UserContext } from "../Provider/context";

export default function CardForm(props) {
  const ctx = React.useContext(UserContext);

  return (
    <>
      <div style={{ maxWidth: "18rem" }}>
        <div className="name-field" style={{ display: props.showName }}>
          Name
          <br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter name"
            required
            onChange={(e) => (ctx.name = e.currentTarget.value)}
          />
          <br />
        </div>

        <div className="email-field" style={{ display: props.showEmail }}>
          Email address
          <br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) => (ctx.email = e.currentTarget.value)}
          />
          <br />
        </div>

        <div className="password-field" style={{ display: props.showPassword }}>
          Password
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={(e) => (ctx.password = e.currentTarget.value)}
          />
          <br />
        </div>

        <div className="amount-field" style={{ display: props.showAmount }}>
          Amount
          <br />
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            onChange={(e) => (ctx.balance = e.currentTarget.value)}
          />
          <br />
        </div>
      </div>
    </>
  );
}
