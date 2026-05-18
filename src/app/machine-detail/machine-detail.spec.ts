import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { ParamMap, convertToParamMap } from '@angular/router';
import { MachineDetail } from './machine-detail';
import { MachineService } from '../shared/machine.service';
import { Machine } from '../shared/machine.model';

const MOCK_MACHINES: Machine[] = [
  {
    name: 'Scale',
    state: 'running',
    log: [{ date: '2026-05-18 06:00', message: 'Calibration completed.' }],
    icon: 'system_update_alt',
  },
  { name: 'Packer', state: 'alarm', log: [], icon: 'inventory' },
];

function createActivatedRoute(name: string): Partial<ActivatedRoute> {
  return {
    paramMap: of(convertToParamMap({ name }) satisfies ParamMap),
    snapshot: { paramMap: convertToParamMap({ name }) } as ActivatedRouteSnapshot | undefined,
  };
}

describe('MachineDetail', () => {
  let component: MachineDetail;
  let fixture: ComponentFixture<MachineDetail>;
  let mockMachineService: {
    machines: ReturnType<typeof signal<Machine[]>>;
    reboot: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockMachineService = {
      machines: signal(MOCK_MACHINES),
      reboot: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MachineDetail],
      providers: [
        { provide: MachineService, useValue: mockMachineService },
        { provide: ActivatedRoute, useValue: createActivatedRoute('scale') },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MachineDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct machine name', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(title.textContent?.trim()).toBe('Scale');
  });

  it('should display correct state badge', () => {
    const state: HTMLElement = fixture.nativeElement.querySelector('.state');
    expect(state.classList).toContain('running');
    expect(state.textContent?.trim()).toBe('running');
  });

  it('should render log entries', () => {
    const entries = fixture.nativeElement.querySelectorAll('.log-entry');
    expect(entries.length).toBe(1);
  });

  it('should disable reboot button when state is running', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable reboot button when state is alarm', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [MachineDetail],
      providers: [
        { provide: MachineService, useValue: mockMachineService },
        { provide: ActivatedRoute, useValue: createActivatedRoute('packer') },
      ],
    }).compileComponents();

    const alarmFixture = TestBed.createComponent(MachineDetail);
    alarmFixture.detectChanges();
    const button: HTMLButtonElement = alarmFixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

  it('should call reboot on service when reboot button clicked', () => {
    component.reboot();
    expect(mockMachineService.reboot).toHaveBeenCalledWith('scale');
  });

  it('should show not found message for unknown machine', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [MachineDetail],
      providers: [
        { provide: MachineService, useValue: mockMachineService },
        { provide: ActivatedRoute, useValue: createActivatedRoute('unknown') },
      ],
    }).compileComponents();

    const unknownFixture = TestBed.createComponent(MachineDetail);
    unknownFixture.detectChanges();
    expect(unknownFixture.nativeElement.textContent).toContain('not found');
  });
});
