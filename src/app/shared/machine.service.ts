import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Machine } from './machine.model';

@Injectable({ providedIn: 'root' })
export class MachineService {
  private readonly url = '/data/machines.json';

  readonly machines = httpResource<Machine[]>(() => this.url);
}
