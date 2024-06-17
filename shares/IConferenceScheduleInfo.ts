export interface IConferenceScheduleInfo {
  conferenceRooms?: IConferenceRoomInfo[];
}

export interface IConferenceRoomInfo {
  name?: string;
  startTime?: string;
  meetingDate?: string;
  endTime?: string;
  deptName?: string;
  subject: string;
  contents?: string;
  status?: string;
}
