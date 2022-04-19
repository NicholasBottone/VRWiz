import React from "react";
import { Scene, Sky } from "@belivvr/aframe-react";
import HomeScene from "./scenes/HomeScene";

function App() {
  return (
    <Scene>
      <Sky color="#ECECEC" />
      <HomeScene />
    </Scene>
  );
}

export default App;
