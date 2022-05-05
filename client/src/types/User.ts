export default interface User {
  id: string;
  username: string;
  color: string;
  left: {
    pos: string;
    rot: string;
  };
  right: {
    pos: string;
    rot: string;
  };
  head: {
    pos: string;
    rot: string;
  };
}
