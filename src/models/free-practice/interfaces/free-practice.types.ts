export interface FPSByDriver {
  fp_grand_prix: number;
  fp_fp_number: number;
  fp_position: number;
  fp_laps: number;
  fp_fast_lap: string;
  fp_average_speed: string;
  driver_id: number;
  driver_name: string;
  circuit_id: number;
  circuit_circuit_name: string;
}

export interface AVGSpeedByDriver {
  fp_grand_prix: number;
  fp_fp_number: number;
  fp_average_speed: number;
  driver_id: number;
  driver_name: string;
  circuit_id: number;
  circuit_circuit_name: string;
}

export interface FLByDriverAndCircuitReq {
  driverId: string;
  circuitId: string;
}

export interface FLByDriverAndCircuitRes {
  circuit_circuit_name: string;
  fp_fast_lap?: number;
}
