import React from "react";
import Card from "../components/Card";
import { UserContext } from "../Provider/context";

function UserDataCard(props) {

  return (
    <Card
      bgcolor="secondary"
      header={`${props.userData.name}`}
      // text={'test de text'}
      status=""
      body={
        <div className="">
          <p>User : {props.userData.name}</p>
          <p>Email : {props.userData.email}</p>
          <p>Password : {props.userData.password}</p>
          <p className="fw-bold font-weight-bold">Balance : <span className="text-success">$ {props.userData.balance}</span></p>
          <hr class="hr" />
          <p>First balance : {props.userData.firstBalance}</p>
          <p className="d-flex flex-wrap">History : {props.userData.firstBalance} {'->'} {props.userData.history}</p>
          <hr class="hr" />
        </div>
      }
    />
  );

}

function AllData() {
  const ctx = React.useContext(UserContext);

  return (
    <div className="justify-content-center align-items-center d-flex flex-wrap justify-content-around w-100">
      {ctx.users?.length > 0 ?
      <>
        {ctx.users.map((user) => {
          return (
            <UserDataCard userData={user}/>
          );
        })}
        </>
        :
        <h2>No data to display</h2>
      }
    </div>
  );
}

export default AllData;
