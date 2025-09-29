import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodSelector } from './mood-selector';
import { By } from '@angular/platform-browser';

describe('MoodSelector', () => {
  let component: MoodSelector;
  let fixture: ComponentFixture<MoodSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodSelector] // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(MoodSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all mood buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.mood-list button'));
    expect(buttons.length).toBe(component.moods.length);
  });

  it('should update selected mood when a button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.mood-list button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedMood()).toBe(component.moods[0].emoji);

    const result = fixture.debugElement.query(By.css('.mood-result p')).nativeElement.textContent;
    expect(result).toContain(component.moods[0].emoji);
  });

  it('should save selected mood to localStorage', () => {
    const mood = component.moods[1].emoji;
    component.selectMood(mood);
    expect(localStorage.getItem('selectedMood')).toBe(mood);
  });

  it('should load mood from localStorage on init', () => {
    const savedMood = component.moods[2].emoji;
    localStorage.setItem('selectedMood', savedMood);

    const newFixture = TestBed.createComponent(MoodSelector);
    const newComponent = newFixture.componentInstance;

    expect(newComponent.selectedMood()).toBe(savedMood);
  });
});
