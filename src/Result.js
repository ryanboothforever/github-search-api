import React from "react";

function Result(props) {
  console.log(props);
  return (
    <div className="col justify-content-center mb-3" key={props.person.id}>
      <div className="d-flex justify-content-center mb-1">
        <img src={props.person.avatar_url} alt="user avatar" />
      </div>
      <div className="text-center">
        Username: <span>{props.person.login}</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="text-end col">
            <span className="crossed-out">
              Starred: {props.person.starred_url}
            </span>

            <span>Followers: {props.person.followers_url}</span>
          </div>
          <div className="text-start col">
            <span>Type: {props.person.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Result;
