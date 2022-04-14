export default interface User {
  id: string;
  left: {
    pos: string;
    rot: string;
  };
  right: {
    pos: string;
    rot: string;
  };
}
