import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MachineService } from '../shared/machine.service';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  private machineService = inject(MachineService);
  readonly machines = this.machineService.machines;
}
