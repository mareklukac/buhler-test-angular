import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MachineService } from '../shared/machine.service';

@Component({
  selector: 'app-machine-detail',
  imports: [],
  templateUrl: './machine-detail.html',
  styleUrl: './machine-detail.scss',
})
export class MachineDetail {
  private route = inject(ActivatedRoute);
  private machineService = inject(MachineService);

  private name = toSignal(this.route.paramMap.pipe(map((params) => params.get('name'))));

  machine = computed(() => {
    const name = this.name();
    return this.machineService.machines.value()?.find((m) => m.name.toLowerCase() === name);
  });
}
