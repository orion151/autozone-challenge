/**
 * This component is a provider that provides some Vehicle information to the
 * rest of our app. E.g. things like model name or whether the Vehicle is an
 * emulator/simulator.
 */
import React, { ReactNode, createContext, useContext, useState } from "react";
import { MARK, MODEL } from "@/service/endpoints";

type VehicleInfoContextValue = {
  year: number | undefined;
  make: MARK | undefined;
  model: MODEL | undefined;
  setYear: (year: number | undefined) => void;
  setMake: (make: MARK | undefined) => void;
  setModel: (model: MODEL | undefined) => void;
};

const VehicleInfoContext = createContext<VehicleInfoContextValue | null>(null);
const useVehicleInfo = () => {
  const VehicleInfoContextValue = useContext(VehicleInfoContext);
  if (VehicleInfoContextValue === null) {
    throw new Error("useVehicleInfo must be used within a VehicleInfoProvider");
  }
  return VehicleInfoContextValue;
};
interface IProps {
  children: ReactNode;
}

const VehicleInfoProvider = ({ children }: IProps) => {
  const [year, setYear] = useState<number | undefined>(undefined);
  const [make, setMake] = useState<MARK | undefined>(undefined);
  const [model, setModel] = useState<MODEL | undefined>(undefined);

  return (
    <VehicleInfoContext.Provider
      value={{
        year: year,
        make: make,
        model: model,
        setYear: setYear,
        setMake: setMake,
        setModel: setModel,
      }}
    >
      {children}
    </VehicleInfoContext.Provider>
  );
};

export { useVehicleInfo, VehicleInfoProvider };
