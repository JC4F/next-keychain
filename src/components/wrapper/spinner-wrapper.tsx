import { Spinner } from "../custom";

export function SpinnerWrapper() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size={"lg"} />
    </div>
  );
}
