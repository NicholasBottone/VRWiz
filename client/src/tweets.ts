import fakeData from "./testData";

// TWEET DATA REPRESENTATION
var currIndex = 0;
var scene = document.querySelector("a-scene")!;
// TODO: replace with caps
const tweetInterval = 1000;
// on interval, create sphere that represents tweet
window.setInterval(() => {
  const tweetBall = document.createElement("a-sphere");
  tweetBall.setAttribute("radius", `0.1`);
  tweetBall.setAttribute("color", `#1DA1F2`);
  const numFs = fakeData.filter((x) => x === "f").length;
  const color = (255 * numFs) / 15 + 0.1;
  tweetBall.setAttribute("radius", `${color}`);
  tweetBall.setAttribute("position", `0 ${fakeData[currIndex].length / 20} -3`);
  currIndex++;
  // TODO: make it loop from start
  currIndex = currIndex % fakeData.length;
  scene.appendChild(tweetBall);
}, tweetInterval);
