import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to light mode', () => {
    expect(component.isDark()).toBeFalsy();
  });

  it('should toggle to dark mode', () => {
    component.toggleTheme();
    expect(component.isDark()).toBeTruthy();
    expect(document.body.classList.contains('dark')).toBeTruthy();
  });

  it('should toggle back to light mode', () => {
    component.toggleTheme();
    component.toggleTheme();
    expect(component.isDark()).toBeFalsy();
    expect(document.body.classList.contains('dark')).toBeFalsy();
  });

  it('should display current time', () => {
    const compiled = fixture.nativeElement satisfies HTMLElement;
    expect(compiled.querySelector('p')).toBeTruthy();
  });
});
