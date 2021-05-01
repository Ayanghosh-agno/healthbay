import React from "react";

function WelcomeCard(props) {
  return (
    <div className="my-2 flex flex-col justify-center items-center">
      <img src={props.image} alt="Carousel Image" />
      <div className="mt-6 font-medium text-2xl">{props.title}</div>
      <div className="mt-4 w-11/12 text-md">{props.description}</div>
    </div>
  );
}

export default WelcomeCard;
