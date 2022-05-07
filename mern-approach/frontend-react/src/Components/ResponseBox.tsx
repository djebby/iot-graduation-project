import React from "react";

const ResponseBox = (props: any) => {
  return props.type === "error" ? (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  ) : (
    <div>
    <div className="alert alert-success" role="alert">
        {props.message}
    </div>
      {props.data.map((item: any, index: number) => (
        <div className="my-3" key={index}>
          <label>{item.label}</label>
          <input
            type="text"
            className="form-control"
            value={item.value}
            readOnly
          />
        </div>
      ))}
    </div>
  );
};

export default ResponseBox;
