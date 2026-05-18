import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MachineService } from '../shared/machine.service';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private machineService = inject(MachineService);
  readonly machines = this.machineService.machines.value;
}
