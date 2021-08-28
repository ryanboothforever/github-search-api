import React from "react";

function Result(props) {
  return (
    <div className="col justify-content-center mb-3" key={props.person.id}>
      <div className="d-flex justify-content-center mb-1">
        <img
          src={props.person.avatar_url}
          className="avatar"
          alt="user avatar"
        />
      </div>
      <div className="text-center">
        Username: <span>{props.person.login}</span>
      </div>
      <div className="text-center">
        <span>Starred: {props.person.starred_url.length}</span>
      </div>
      <div className="text-center">
        <span>Followers: {props.followers}</span>
      </div>
      <div className="text-center">
        <span>Type: {props.person.type}</span>
      </div>
    </div>
  );
}
export default Result;
