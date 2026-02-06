import { useFloor } from "../hooks/useFloor";

const FloorsTable = () => {
  const { getFloors } = useFloor();

  const { data } = getFloors(1, 5, "");

  return <div>FloorsTable</div>;
};
export default FloorsTable;
