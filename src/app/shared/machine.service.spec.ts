import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MachineService } from './machine.service';
import { Machine } from './machine.model';

const MOCK_MACHINES: Machine[] = [
  { name: 'Scale', state: 'running', icon: 'system_update_alt', log: [] },
  { name: 'Attacher', state: 'warning', icon: 'archive', log: [] },
  { name: 'Packer', state: 'alarm', icon: 'inventory', log: [] },
  { name: 'Closer', state: 'running', icon: 'grid_on', log: [] },
];

describe('MachineService', () => {
  let service: MachineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MachineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('reboot()', () => {
    beforeEach(() => {
      service.machines.set(MOCK_MACHINES);
    });

    it('should set machine state to running', () => {
      service.reboot('attacher');
      const attacher = service.machines().find((m) => m.name === 'Attacher');
      expect(attacher?.state).toBe('running');
    });

    it('should not affect other machines', () => {
      service.reboot('attacher');
      const packer = service.machines().find((m) => m.name === 'Packer');
      expect(packer?.state).toBe('alarm');
    });
  });
});

describe('MachineService - state transitions', () => {
  let stateService: MachineService;
  let stateHttpMock: HttpTestingController;

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['setInterval'] });
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    stateService = TestBed.inject(MachineService);
    stateHttpMock = TestBed.inject(HttpTestingController);
    TestBed.tick();
    stateHttpMock.expectOne('/data/machines.json').flush(MOCK_MACHINES);
    await Promise.resolve();
    TestBed.tick();
  });

  afterEach(() => {
    stateHttpMock.verify();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('alarm state should never change automatically', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    vi.advanceTimersByTime(60000);
    const packer = stateService.machines().find((m) => m.name === 'Packer');
    expect(packer?.state).toBe('alarm');
  });

  it('running state can transition to warning', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
    vi.advanceTimersByTime(60000);
    const scale = stateService.machines().find((m) => m.name === 'Scale');
    expect(scale?.state).toBe('warning');
  });

  it('running state can transition to alarm', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    vi.advanceTimersByTime(60000);
    const scale = stateService.machines().find((m) => m.name === 'Scale');
    expect(scale?.state).toBe('alarm');
  });

  it('warning state can only transition to alarm', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    vi.advanceTimersByTime(60000);
    const attacher = stateService.machines().find((m) => m.name === 'Attacher');
    expect(attacher?.state).toBe('alarm');
  });
});
