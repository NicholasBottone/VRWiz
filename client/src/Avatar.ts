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

  const left = document.createElement("a-cone");
  const right = document.createElement("a-cone");

  const head = document.createElement("a-sphere");
  const leftEye = document.createElement("a-sphere");
  const rightEye = document.createElement("a-sphere");
  const leftPupil = document.createElement("a-sphere");
  const rightPupil = document.createElement("a-sphere");
  const nametag = document.createElement("a-entity");

  const scene = document.querySelector("a-scene")!;

  scene.appendChild(left);
  scene.appendChild(right);
  scene.appendChild(head);
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

  setControllerProps(left);
  setControllerProps(right);

  left.setAttribute("id", getLeftControllerId(userObj.id));
  left.setAttribute("color", CONE_LEFT_COLOR);

  right.setAttribute("id", getRightControllerId(userObj.id));
  right.setAttribute("color", CONE_RIGHT_COLOR);

  left.setAttribute("position", userObj.left.pos);
  left.setAttribute("rotation", userObj.left.rot);
  right.setAttribute("position", userObj.right.pos);
  right.setAttribute("rotation", userObj.right.rot);

  head.setAttribute("id", `a${userObj.id}-head`);
  head.setAttribute("position", userObj.head.pos);
  head.setAttribute("rotation", userObj.head.rot);

  head.setAttribute("id", `a${userObj.id}-face`);
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
    `value: ${userObj.username}; align: center; color: black; width: 4; wrapCount: 20;`
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
    // if controllers do not exist yet, then create them
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

  const leftPosString = getPositionString(
    document.getElementById("left-con")!.getAttribute("position")!
  );
  const leftRotString = getPositionString(
    document.getElementById("left-con")!.getAttribute("rotation")!
  );
  const rightPosString = getPositionString(
    document.getElementById("right-con")!.getAttribute("position")!
  );
  const rightRotString = getPositionString(
    document.getElementById("right-con")!.getAttribute("rotation")!
  );
  const headPosString = getPositionString(
    document.getElementById("camera")!.getAttribute("position")!
  );
  const headRotString = getPositionString(
    document.getElementById("rig")!.getAttribute("rotation")!
  );

  const color = stringToColor(id);

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
