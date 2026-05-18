import { DestroyRef, Injectable, inject, signal, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Machine, MachineState } from './machine.model';

@Injectable({ providedIn: 'root' })
export class MachineService {
  private readonly url = '/data/machines.json';
  private readonly destroyRef = inject(DestroyRef);

  private readonly machineResource = httpResource<Machine[]>(() => this.url);
  readonly machines = signal<Machine[]>([]);

  constructor() {
    effect(() => {
      const data = this.machineResource.value();
      if (data) {
        this.machines.set(data);
        this.startSimulation();
      }
    });
  }

  private randomState(): MachineState {
    const random = Math.random();
    if (random < 0.5) return 'running';
    if (random < 0.8) return 'warning';
    return 'alarm';
  }

  private startSimulation(): void {
    const interval = setInterval(() => {
      this.machines.update((machines) =>
        machines.map((m) => ({ ...m, state: this.randomState() })),
      );
    }, 60000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  reboot(name: string): void {
    this.machines.update((machines) =>
      machines.map((m) => (m.name.toLowerCase() === name ? { ...m, state: 'running' } : m)),
    );
  }
}
