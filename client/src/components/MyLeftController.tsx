import { Entity } from "@belivvr/aframe-react";
import { HandControlsProps } from "@belivvr/aframe-react/types/components/hand-controls";
import React, { ForwardRefRenderFunction, RefObject } from "react";

export const MyLeftController = React.forwardRef((_props, ref) => {
  const leftProps: HandControlsProps = {
    hand: "left",
  };

  return <Entity id="my-left-controller" handControls={leftProps}></Entity>;
});

export default MyLeftController;
