import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PriorityDisplay = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faFire} className="text-red-200" />
      <FontAwesomeIcon icon={faFire} className="text-red-200" />
      <FontAwesomeIcon icon={faFire} className="text-red-200" />
      <FontAwesomeIcon icon={faFire} className="text-red-200" />
      <FontAwesomeIcon icon={faFire} className="text-red-200" />
    </div>
  );
};

export default PriorityDisplay;
