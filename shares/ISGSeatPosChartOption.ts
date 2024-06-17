// public class SeatPosChartOption
// {
//     //배치도 아이디
//     [JsonPropertyName("seatPosChartId")]
//     public int? SeatPosChartId { get; set; }
//     [JsonPropertyName("seatPosChartName")]
//     public string? SeatPosChartName { get; set; }

// }

export interface ISGSeatPosChartOption {
    seatPosChartId?:number;
    seatPosChartName?:string;
}