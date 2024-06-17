namespace SmartGuideSystem.Kiosk.Models
{
    public class WeatherAirInfo
    {
        //        export interface IWeatherInfo
        //        {
        //            location?:string;
        //    time?:string;
        //    temp?:string;
        //    weatherCode?:string;
        //    choMise?:string;
        //    mise?:string;
        //    ozon?:string;
        //}

        public string? Location { get; set; }
        public string? Time { get; set; }
        public string? Temp { get; set; }
        public string? weatherCode { get; set; }
        public string? ChoMise { get; set; }
        public string? Mise { get; set; }
        public string? Ozon { get; set; }

        public string? ChoMiseStatus { get; set; }
        public string? MiseStatus { get; set; }
        public string? OzonStatus { get; set; }

    }
}
