import React from "react";
import PropTypes from "prop-types";
import { useData } from "../../contexts/DataContext";

export default function BulletSlider({ currentIndex}) {
  const { data } = useData();
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  BulletSlider.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    
  };

  const totalInput = [];
  for (let i = 0; i < byDateDesc.length; i += 1) {
    totalInput.push(
      <input
        key={i}
        type="radio"
        name="radio-button"
        checked={i === currentIndex}
        readOnly
      />
    );
  }
  // render
  return <div>{totalInput}</div>;
}
