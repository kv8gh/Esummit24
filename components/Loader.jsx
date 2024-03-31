import { useLockBodyScroll } from "@uidotdev/usehooks";
import { Vortex } from "react-loader-spinner";

export default function Loader() {
  useLockBodyScroll();

  return (
    <div
      className={`fixed z-50 inset-0 overflow-hidden flex justify-center items-center`}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="z-50">
        <Vortex
          visible={true}
          height={100}
          width={100}
          colors={[
            "#DCA64E",
            "#f3be6a",
            "#ffcf81",
            "#DCA64E",
            "#f3be6a",
            "#ffcf81",
          ]}
        />
      </div>
    </div>
  );
}
