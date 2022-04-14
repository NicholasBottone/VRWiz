import User from "./types/User";

/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 */
export function createControllers(userObj: User, clientId: string) {
  const CONE_HEIGHT = 0.3;
  const CONE_RADIUS_BOTTOM = 0.1;
  const CONE_RADIUS_TOP = 0.01;
  const CONE_LEFT_COLOR = "#FFC65D";
  const CONE_RIGHT_COLOR = "#7BC8A4";

  const left = document.createElement("a-cone");
  const right = document.createElement("a-cone");
  const scene = document.querySelector("a-scene")!;

  scene.appendChild(left);
  scene.appendChild(right);

  function setControllerProps(controller: HTMLElement) {
    controller.setAttribute(
      "geometry",
      `primitive: cone; height: ${CONE_HEIGHT}; radiusBottom: ${CONE_RADIUS_BOTTOM}; radiusTop: ${CONE_RADIUS_TOP}`
    );
  }

  setControllerProps(left);
  setControllerProps(right);

  left.setAttribute("id", getLeftControllerId(clientId));
  left.setAttribute("color", CONE_LEFT_COLOR);

  right.setAttribute("id", getRightControllerId(clientId));
  right.setAttribute("color", CONE_RIGHT_COLOR);

  left.setAttribute("position", userObj.left.pos);
  left.setAttribute("rotation", userObj.left.rot);
  right.setAttribute("position", userObj.right.pos);
  right.setAttribute("rotation", userObj.right.rot);
}

/**
 * takes in a user object and id and sets the position of that user's controllers accordingly
 */
export function updateControllers(userObj: User, clientId: string) {
  try {
    const left = getLeftControllerId(clientId);
    const right = getRightControllerId(clientId);

    const leftCon = document.getElementById(left)!;
    const rightCon = document.getElementById(right)!;

    leftCon.setAttribute("position", userObj.left.pos);
    leftCon.setAttribute("rotation", userObj.left.rot);
    rightCon.setAttribute("position", userObj.right.pos);
    rightCon.setAttribute("rotation", userObj.right.rot);
  } catch (error) {
    // if controllers do not exist yet, then create them
    createControllers(userObj, clientId);
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

export function removeControllers(userId: string) {
  document.getElementById(getLeftControllerId(userId))!.remove();
  document.getElementById(getRightControllerId(userId))!.remove();
}

/**
 * takes in the current user's socket id, gets current user's pos data
 */
export function createMyUserObj(id: string) {
  if (!id) throw new Error("no established connection to socket!");

  const leftPosString = getPositionSting(
    document.getElementById("left-con")!.getAttribute("position")!
  );
  const leftRotString = getPositionSting(
    document.getElementById("left-con")!.getAttribute("rotation")!
  );
  const rightPosString = getPositionSting(
    document.getElementById("right-con")!.getAttribute("position")!
  );
  const rightRotString = getPositionSting(
    document.getElementById("right-con")!.getAttribute("rotation")!
  );

  return {
    id,
    left: { pos: leftPosString, rot: leftRotString },
    right: { pos: rightPosString, rot: rightRotString },
  };
}

/**
 * Creates a coordinate string from an AFrame position object
 */
function getPositionSting(posStr: string) {
  const obj = JSON.parse(posStr);
  return `${obj.x} ${obj.y} ${obj.z}`;
}
