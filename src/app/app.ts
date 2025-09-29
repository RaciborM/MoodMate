import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoodSelector } from './components/mood-selector/mood-selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoodSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MoodMate');
}
