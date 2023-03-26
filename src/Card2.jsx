import React from "react";

const Card = (props) => {
  const { imageSrc, tier, points, id } = props;

  return (
    <div className="card">
      <img src={imageSrc} />
      <div className="textBox">
        <p className="text head">{tier}</p>
        <span>{points}</span>
        <p className="text head">{id}</p>
      </div>
    </div>
  );
};

export default Card;
