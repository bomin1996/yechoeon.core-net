import { IWeatherInfo } from "@shares/*";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { KioskApi } from "src/server/kioskApi";

const WeatherAirContext = createContext<IWeatherInfo | null>(null);
export default WeatherAirContext;

interface Props extends PropsWithChildren {}

export function WeatherAirProvider({ children }: Props) {
  const [weatherAir, setWeatherAir] = useState<IWeatherInfo | null>(null);

  const requestData = async () => {
    try {
      const res = await KioskApi.requestWeatherAndAir();
      if (res.status === 200) {
        setWeatherAir(res.data as IWeatherInfo);
      }
    } catch (exc) {}
  };

  useEffect(() => {
    requestData();
    const timer = setInterval(requestData, 1000 * 60 * 5); // 5 mins
    return () => clearInterval(timer);
  }, []);

  return (
    <WeatherAirContext.Provider value={weatherAir}>
      {children}
    </WeatherAirContext.Provider>
  );
}
