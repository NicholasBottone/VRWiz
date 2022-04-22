import React, { FunctionComponent, useEffect, useRef } from "react";
import { Scene, Sky } from "@belivvr/aframe-react";
import HomeScene from "./scenes/HomeScene";
import Controller from "./components/Controller";
import { io } from "socket.io-client";
import { createMyUserObj } from "./controllers";
import User from "./types/User";
import { MyLeftController } from "./components/MyLeftController";
import { MyRightController } from "./components/MyRightController";

function App() {
  interface UserObj {
    [key: string]: User;
  }
  const [playerList, setPlayerList] = React.useState<UserObj>({});
  const myLeftRef = useRef<FunctionComponent>(null);
  const myRightRef = useRef<FunctionComponent>(null);
  const leftRef = useRef<FunctionComponent>(null);
  const rightRef = useRef<FunctionComponent>(null);

  useEffect(() => {
    const SERVER_URL = import.meta.env.SERVER_URL || "https://localhost:8000";
    const INTERVAL = 50;

    const socket = io(SERVER_URL);

    socket.on("connect", () => {
      console.log("you connected with id: ", socket.id);
      const myId = socket.id

      // constantly update send server new pos data
      window.setInterval(() => {
        const myLeftController: any =
          document.getElementById("my-left-controller");
        const myRightController: any =
          document.getElementById("my-left-controller")!;
          // console.log("eequal", myId == socket.id)
          console.log("my id", socket.id)
        socket.emit(
          "update",
          createMyUserObj(myId, myLeftController, myRightController),
          myId
        );
      }, INTERVAL);
    });

    // create player obj when a new client joins
    socket.on("join", (socketId: string) => {
      const userObj: User = {
        id: socketId,
        left: { pos: "0 0 0", rot: "0 0 0" },
        right: { pos: "0 0 0", rot: "0 0 0" },
      };

      setPlayerList({ ...playerList, [socketId]: userObj });
    });

    socket.on("update", (userObj: User, clientId: string) => {
      console.log(userObj.left.pos);
      console.log(userObj.id);
      console.log("different", userObj.id, clientId);
      // console.log("not equal", clientId == userObj.id);
      setPlayerList({ ...playerList, [userObj.id]: userObj });
    });

    socket.on("leave", (clientId: string) => {
      const { [clientId]: someObject, ...newPlayerList } = playerList;
      setPlayerList(newPlayerList);
    });
  }, []);

  return (
    <Scene>
      <Sky color="#ECECEC" />
      <HomeScene />
      <MyLeftController></MyLeftController>
      <MyRightController></MyRightController>
      {playerList &&
        Object.values(playerList).map((val) => {
          <>
            <Controller id={`a${val.id}-left`} color="#FFC65D"></Controller>
            <Controller id={`a${val.id}-right`} color="#7BC8A4"></Controller>
          </>;
        })}
    </Scene>
  );
}

export default App;
