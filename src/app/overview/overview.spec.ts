import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Overview } from './overview';
import { MachineService } from '../shared/machine.service';
import { Machine } from '../shared/machine.model';

const MOCK_MACHINES: Machine[] = [
  { name: 'Scale', state: 'running', icon: 'system_update_alt', log: [] },
  { name: 'Attacher', state: 'warning', icon: 'archive', log: [] },
  { name: 'Packer', state: 'alarm', icon: 'inventory', log: [] },
  { name: 'Closer', state: 'running', icon: 'grid_on', log: [] },
];

describe('Overview', () => {
  let component: Overview;
  let fixture: ComponentFixture<Overview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Overview],
      providers: [{ provide: MachineService, useValue: { machines: signal(MOCK_MACHINES) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Overview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all machine items', () => {
    const items = fixture.nativeElement.querySelectorAll('.item');
    expect(items.length).toBe(MOCK_MACHINES.length);
  });

  it('should apply correct state class to each item', () => {
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.item');
    expect(items[0].classList).toContain('running');
    expect(items[1].classList).toContain('warning');
    expect(items[2].classList).toContain('alarm');
  });

  it('should display machine names', () => {
    const compiled = fixture.nativeElement satisfies HTMLElement;
    expect(compiled.textContent).toContain('Scale');
    expect(compiled.textContent).toContain('Packer');
  });
});
