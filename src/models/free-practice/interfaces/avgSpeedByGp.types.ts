export interface AvgSpeedSessions {
  fpNumber: number;
  avgSpeed: number;
}

export interface Response {
  averageSpeedFps: Array<AvgSpeedSessions>;
  driver: string;
  circuit: string;
  team: string;
}
