export interface Qualify {
  qf_grand_prix: number;
  qf_qf_number: number;
  qf_position: number;
  qf_fast_lap: number;
  qf_average_speed: number;
}

export interface AVGSpeedByDriver {
  qf_qf_number: number;
  qf_average_speed?: number;
  circuit_circuit_name: string;
}
