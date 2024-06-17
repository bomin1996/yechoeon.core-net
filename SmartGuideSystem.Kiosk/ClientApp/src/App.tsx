import { DeviceProvider } from "./contexts/DeviceContext";
import MainLayout from "./components/MainLayout";
export default function App() {
  return (
    <>
      <DeviceProvider>
        <MainLayout />
      </DeviceProvider>
    </>
  );
}
