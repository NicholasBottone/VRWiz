import { Entity } from "@belivvr/aframe-react";
import { HandControlsProps } from "@belivvr/aframe-react/types/components/hand-controls";
import React from "react";

export const MyRightController = React.forwardRef((props, ref) => {
  const rightProps: HandControlsProps = {
    hand: "right",
  };

  return <Entity id="my-ref-controller" handControls={rightProps}></Entity>;
});

export default MyRightController;
