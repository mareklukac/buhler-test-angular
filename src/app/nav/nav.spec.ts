import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { Nav } from './nav';
import { MachineService } from '../shared/machine.service';
import { Machine } from '../shared/machine.model';

const MOCK_MACHINES: Machine[] = [
  { name: 'Scale', state: 'running', icon: 'system_update_alt', log: [] },
  { name: 'Attacher', state: 'warning', icon: 'archive', log: [] },
  { name: 'Packer', state: 'alarm', icon: 'inventory', log: [] },
  { name: 'Closer', state: 'running', icon: 'grid_on', log: [] },
];

describe('Nav', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [
        provideRouter([]),
        { provide: MachineService, useValue: { machines: signal(MOCK_MACHINES) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all machines', () => {
    const items = fixture.nativeElement.querySelectorAll('.item');
    expect(items.length).toBe(MOCK_MACHINES.length);
  });

  it('should apply correct state class to each item', () => {
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.item');
    expect(items[0].classList).toContain('running');
    expect(items[1].classList).toContain('warning');
    expect(items[2].classList).toContain('alarm');
  });

  it('should render correct machine names', () => {
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.item span');
    expect(items[0].textContent?.trim()).toBe('Scale');
  });

  it('should have correct routerLink on each item', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a.item');
    expect(links[0].getAttribute('href')).toBe('/machine/scale');
    expect(links[1].getAttribute('href')).toBe('/machine/attacher');
  });
});
