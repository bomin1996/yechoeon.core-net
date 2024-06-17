import axios from "axios";

export namespace KioskApi {
  export async function fetchKioskInfo(deviceId: string) {
    const api_url = `/api/kioskinfo/${deviceId}`;
    try {
      const res = await fetch(api_url);
      const jsonResult = await res.json();
      console.log(api_url, jsonResult);
      return jsonResult;
    } catch (e) {
      console.log(api_url, e);
      return null;
    }
  }

  export async function requestOrgChart(id: number) {
    // const res = await fetch(`/api/kioskinfo/organization-chart/${id}`);
    // const orgChart = await res.json();
    // return orgChart;

    const res = await axios.get(`/api/kioskinfo/organization-chart/${id}`);
    const orgChart = res.data;
    return orgChart;
  }

  export async function requesSeatPosChart(id: number) {
    const res = await axios.get(`/api/kioskinfo/seatpos-chart/${id}`);
    const chart = res.data;
    return chart;
  }

  export async function requestWeatherAndAir() {
    const res = await axios.get(`/api/kioskinfo/weather-and-air`);
    return res;
  }
}
