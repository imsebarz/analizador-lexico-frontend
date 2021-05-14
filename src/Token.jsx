import React from "react";

const Token = ({ id, type, literal }) => {
  return (
    <div className={`token ${type == "ILLEGAL" ? "illegal" : ""}`}>
      <p>
        {" "}
        <strong> {id} . Literal: </strong>
        {literal}
      </p>
      <p>
        {" "}
        <strong>Token Type: </strong>
        {type}
      </p>
    </div>
  );
};

export default Token;
