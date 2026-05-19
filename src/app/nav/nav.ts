import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MachineService } from '../shared/machine.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  private machineService = inject(MachineService);
  readonly machines = this.machineService.machines;
}
