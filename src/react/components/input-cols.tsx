import { useNumberOfCols } from "../../state/cols.state";

export const ColsInput = () => {
  const { cols, setCols } = useNumberOfCols();
  return (
    <input
      className="p-1"
      min={10}
      max={100}
      type="number"
      id="cols"
      onChange={({ currentTarget: { value } }) => {
        setCols(+value);
      }}
      defaultValue={cols}
    />
  );
};
