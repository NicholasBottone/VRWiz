import React from "react";
import "aframe";
import { Entity, Scene, Cone } from "@belivvr/aframe-react";

// sets color property, which is a string, and ref, which is a ref hook.
interface Props {
  color: string;
  ref: React.RefObject<any>;
  id: string;
}

export default React.forwardRef(function Controller({ color, id}: Props, ref) {
  return (
    <>
      <Cone
        id={id}
        height={0.5}
        radiusBottom={0.1}
        radiusTop={0.01}
        color={color}
      ></Cone>
    </>
  );
});
