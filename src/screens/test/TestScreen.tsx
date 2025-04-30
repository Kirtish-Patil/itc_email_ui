import { useAtom, atom } from "jotai";
import { Button } from "@/components/ui/button";

const count = atom(0);
const square = atom((get) => get(count) * get(count));

const cube = atom((get) => get(count) * get(count) * get(count));

const TestScreen = () => {
  const [currCount, setCount] = useAtom(count);
  const [currSquare] = useAtom(square);
  const [currCube] = useAtom(cube);

  return (
    <div>
      <div className="h-[300px] w-[300px] rounded-xl flex flex-col gap-3">
        <span>Curr Count: {currCount}</span>
        <span>Square: {currSquare}</span>
        <span>Cube: {currCube}</span>
        <Button onClick={() => setCount((ct) => ct + 1)}>Increment</Button>
        <Button onClick={() => setCount((ct) => ct - 1)}>Decrement</Button>
      </div>
    </div>
  );
};

export default TestScreen;
