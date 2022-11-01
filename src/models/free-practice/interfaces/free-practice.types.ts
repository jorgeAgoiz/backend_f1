export interface FPSByDriver {
  fp_grand_prix: number;
  fp_fp_number: number;
  fp_position: number;
  fp_laps: number;
  fp_fast_lap: number;
  fp_average_speed: number;
  driver_id: number;
  driver_name: string;
  circuit_id: number;
  circuit_circuit_name: string;
}

export interface AVGSpeedByDriver {
  circuit_circuit_name: string;
  fp_fp_number: number;
  fp_average_speed?: number;
}

export interface LapsTimeByDriver {
  circuit_circuit_name: string;
  fp_fp_number: number;
  fp_fast_lap?: number;
}

export interface PositionsByDriver {
  circuit_circuit_name: string;
  fp_fp_number: number;
  fp_position?: number;
}
