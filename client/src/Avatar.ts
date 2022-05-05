import stringToColor from "./stringToColor";
import User from "./types/User";

/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 */
export function createAvatar(userObj: User, _clientId: string) {
  const CONE_HEIGHT = 0.3;
  const CONE_RADIUS_BOTTOM = 0.1;
  const CONE_RADIUS_TOP = 0.01;
  const CONE_LEFT_COLOR = userObj.color;
  const CONE_RIGHT_COLOR = userObj.color;

  const head = document.createElement("a-sphere");
  const leftEye = document.createElement("a-sphere");
  const rightEye = document.createElement("a-sphere");
  const leftPupil = document.createElement("a-sphere");
  const rightPupil = document.createElement("a-sphere");
  const nametag = document.createElement("a-entity");

  const leftHand = document.createElement("a-cone");
  const rightHand = document.createElement("a-cone");

  const scene = document.querySelector("a-scene")!;

  scene.appendChild(head);
  scene.appendChild(leftHand);
  scene.appendChild(rightHand);
  head.appendChild(leftEye);
  head.appendChild(rightEye);
  leftEye.appendChild(leftPupil);
  rightEye.appendChild(rightPupil);
  head.appendChild(nametag);

  function setControllerProps(controller: HTMLElement) {
    controller.setAttribute(
      "geometry",
      `primitive: cone; height: ${CONE_HEIGHT}; radiusBottom: ${CONE_RADIUS_BOTTOM}; radiusTop: ${CONE_RADIUS_TOP}`
    );
  }

  setControllerProps(leftHand);
  setControllerProps(rightHand);

  leftHand.setAttribute("id", getLeftControllerId(userObj.id));
  leftHand.setAttribute("color", CONE_LEFT_COLOR);

  rightHand.setAttribute("id", getRightControllerId(userObj.id));
  rightHand.setAttribute("color", CONE_RIGHT_COLOR);

  leftHand.setAttribute("position", userObj.left.pos);
  leftHand.setAttribute("rotation", userObj.left.rot);
  rightHand.setAttribute("position", userObj.right.pos);
  rightHand.setAttribute("rotation", userObj.right.rot);

  head.setAttribute("id", `a${userObj.id}-head`);
  head.setAttribute("position", userObj.head.pos);
  head.setAttribute("rotation", userObj.head.rot);
  head.setAttribute("scale", "0.45 0.5 0.37");
  head.setAttribute("color", userObj.color);

  leftEye.setAttribute("id", `a${userObj.id}-left-eye`);
  leftEye.setAttribute("position", "0.26 0.15 -1.0");
  leftEye.setAttribute("scale", "0.16 0.16 0.16");
  leftEye.setAttribute("color", "#efefef");

  rightEye.setAttribute("id", `a${userObj.id}-right-eye`);
  rightEye.setAttribute("position", "-0.26 0.15 -1.0");
  rightEye.setAttribute("scale", "0.16 0.16 0.16");
  rightEye.setAttribute("color", "#efefef");

  leftPupil.setAttribute("id", `a${userObj.id}-left-pupil`);
  leftPupil.setAttribute("position", "0 0 -1");
  leftPupil.setAttribute("scale", "0.2 0.2 0.2");
  leftPupil.setAttribute("color", "black");

  rightPupil.setAttribute("id", `a${userObj.id}-right-pupil`);
  rightPupil.setAttribute("position", "0 0 -1");
  rightPupil.setAttribute("scale", "0.2 0.2 0.2");
  rightPupil.setAttribute("color", "black");

  nametag.setAttribute("id", `a${userObj.id}-nametag`);
  nametag.setAttribute("position", "0 1.3 0");
  nametag.setAttribute("rotation", "0 180 0");
  nametag.setAttribute(
    "text",
    `value: ${userObj.username}; align: center; color: white; width: 4; wrapCount: 20;`
  );
}

/**
 * takes in a user object and id and sets the position of that user's controllers accordingly
 */
export function updateAvatar(userObj: User, clientId: string) {
  try {
    const left = getLeftControllerId(userObj.id);
    const right = getRightControllerId(userObj.id);

    const leftCon = document.getElementById(left)!;
    const rightCon = document.getElementById(right)!;

    leftCon.setAttribute("position", userObj.left.pos);
    leftCon.setAttribute("rotation", userObj.left.rot);
    rightCon.setAttribute("position", userObj.right.pos);
    rightCon.setAttribute("rotation", userObj.right.rot);

    const head = document.getElementById(`a${userObj.id}-head`)!;
    head.setAttribute("position", userObj.head.pos);
    head.setAttribute("rotation", userObj.head.rot);
  } catch (error) {
    // if avatar does not exist yet, then create it
    createAvatar(userObj, clientId);
  }
}

/**
 * helper function for creating id of controllers from user's id
 * suffix is either left or right
 */
function getControllerId(userId: string, suffix: string) {
  const sliced = userId.slice(0, 5);
  // appends a as prefix since ids must start with letters, and socket ids dont always do
  return `a${sliced}-${suffix}`;
}

function getLeftControllerId(userId: string) {
  return getControllerId(userId, "left");
}

function getRightControllerId(userId: string) {
  return getControllerId(userId, "right");
}

export function removeAvatar(userId: string) {
  document.getElementById(getLeftControllerId(userId))!.remove();
  document.getElementById(getRightControllerId(userId))!.remove();
  document.getElementById(`a${userId}-head`)!.remove();
}

/**
 * takes in the current user's socket id, gets current user's pos data
 */
export function createMyUserObj(id: string, username: string): User {
  if (!id) throw new Error("no established connection to socket!");

  const rigPosition = document.getElementById("rig")!.getAttribute("position");
  const rigRotation = document.getElementById("rig")!.getAttribute("rotation");

  const leftPosString = getPositionString(
    getAbsolutePosition(
      rigPosition,
      document.getElementById("left-con")!.getAttribute("position")!
    )
  );
  const leftRotString = getPositionString(
    getAbsolutePosition(
      rigRotation,
      document.getElementById("left-con")!.getAttribute("rotation")!
    )
  );
  const rightPosString = getPositionString(
    getAbsolutePosition(
      rigPosition,
      document.getElementById("right-con")!.getAttribute("position")!
    )
  );
  const rightRotString = getPositionString(
    getAbsolutePosition(
      rigRotation,
      document.getElementById("right-con")!.getAttribute("rotation")!
    )
  );
  const headPosString = getPositionString(
    getAbsolutePosition(
      rigPosition,
      document.getElementById("camera")!.getAttribute("position")!
    )
  );
  const headRotString = getPositionString(
    getAbsolutePosition(
      rigRotation,
      document.getElementById("camera")!.getAttribute("rotation")!
    )
  );

  const color = stringToColor(username);

  return {
    id,
    username,
    color,
    left: { pos: leftPosString, rot: leftRotString },
    right: { pos: rightPosString, rot: rightRotString },
    head: { pos: headPosString, rot: headRotString },
  };
}

/**
 * Creates a coordinate string from an AFrame position object
 */
function getPositionString(coords: any) {
  return `${coords.x} ${coords.y} ${coords.z}`;
}

/**
 * Takes in the AFrame position of the rig and the relative position of sub component, and returns the absolute position of the sub component
 */
function getAbsolutePosition(rigPos: any, subPos: any) {
  const rig = { x: rigPos.x, y: rigPos.y, z: rigPos.z };
  const sub = { x: subPos.x, y: subPos.y, z: subPos.z };

  return {
    x: rig.x + sub.x,
    y: rig.y + sub.y,
    z: rig.z + sub.z,
  };
}
