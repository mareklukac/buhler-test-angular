import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MachineService } from '../shared/machine.service';

@Component({
  selector: 'app-machine-detail',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './machine-detail.html',
  styleUrl: './machine-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachineDetail {
  private route = inject(ActivatedRoute);
  private machineService = inject(MachineService);

  private name = toSignal(this.route.paramMap.pipe(map((params) => params.get('name'))));

  machine = computed(() => {
    const name = this.name();
    return this.machineService.machines()?.find((m) => m.name.toLowerCase() === name);
  });

  reboot(): void {
    const name = this.name();
    if (name) this.machineService.reboot(name);
  }
}
