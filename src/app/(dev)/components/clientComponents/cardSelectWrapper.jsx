"use client";

import { useState } from "react";

const { Card } = require("@/components");

const CardSelectWrapper = () => {
  const [selected, setSelected] = useState(false);
  const handleSelected = () => {
    setSelected(!selected);
  };
  return (
    <Card.SelectItem
      backgroundColor={"--colour-g100"}
      isSelected={selected}
      handleSelect={handleSelected}
      subLabel={"Guess whos back, back again"}
    >
      Eminem
    </Card.SelectItem>
  );
};

export default CardSelectWrapper;
