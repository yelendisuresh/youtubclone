import React from "react";
import Button from "./Button";

const list = ["news", "cricket", "drama", "action", "cooking", "food", "test"];

const ButtonsList = () => {
  return (
    <div className="flex">
      {list.map((name) => {
        return <Button key={name} name={name} />;
      })}
    </div>
  );
};

export default ButtonsList;
