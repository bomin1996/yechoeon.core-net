export interface IWeatherInfo {
  location?: string;
  time?: string;
  temp?: string;
  weatherCode?: string;
  choMise?: string;
  mise?: string;
  ozon?: string;

  // public string? ChoMiseStatus { get; set; }
  // public string? MiseStatus { get; set; }
  // public string? OzonStatus { get; set; }

  choMiseStatus?: string;
  miseStatus?: string;
  ozonStatus?: string;

  pty?: string;
  sky?: string;
}
