export type MachineState = 'running' | 'warning' | 'alarm';

export interface MachineLogEntry {
  date: string;
  message: string;
}

export interface Machine {
  name: 'Scale' | 'Attacher' | 'Packer' | 'Closer';
  state: MachineState;
  icon: string;
  log: MachineLogEntry[];
}
