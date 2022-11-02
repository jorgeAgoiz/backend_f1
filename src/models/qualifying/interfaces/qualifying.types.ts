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

export interface LapsTimeByDriver {
  qf_qf_number: number;
  qf_fast_lap?: number;
  circuit_circuit_name: string;
}

export interface PositionsByDriver {
  qf_qf_number: number;
  qf_position?: number;
  circuit_circuit_name: string;
}
