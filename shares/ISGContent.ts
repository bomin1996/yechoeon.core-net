export interface ISGContent {
  // public int Id { get; set; }

  // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  // public DateTime CreatedTime { get; set; }
  // public string? Thumbnail { get; set; }
  // public string Url { get; set; }
  // public string Name { get; set; }
  // public string UploadFileName { get; set; }
  // public long Duration { get; set; }
  // public string ContentType { get; set; }
  // public string? GroupName { get; set; }
  // public string? Category1 { get; set;}
  // public string? Category2 { get; set; }
  // public string? Category3 { get; set; }

  id: number;
  createTime: string;
  thumbnail?: string;
  url: string;
  name: string;
  uploadFileName: string;
  duration: number;
  contentType: string;
  groupName?: string;
  category1?: string;
  category2?: string;
  category3?: string;

  width: number;
  height: number;
  size: number;
}
