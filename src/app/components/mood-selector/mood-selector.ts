import { Component, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

interface MoodEntry {
  date: string;
  mood: string;
  comment: string;
}

@Component({
  selector: 'app-mood-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mood-selector.html',
  styleUrls: ['./mood-selector.scss']
})
export class MoodSelector {
  moods = [
    { emoji: '😄', label: 'Happy' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙁', label: 'Sad' },
    { emoji: '😢', label: 'Very Sad' },
  ];

  selectedMood = signal<string | null>(null);
  comment = signal<string>('');
  history = signal<MoodEntry[]>([]);

  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem('moodHistory');
      if (saved) {
        this.history.set(JSON.parse(saved));
      }

      effect(() => {
        localStorage.setItem('moodHistory', JSON.stringify(this.history()));
      });
    }
  }

  selectMood(mood: string) {
    this.selectedMood.set(mood);
  }

  get commentValue() {
    return this.comment();
  }
  set commentValue(val: string) {
    this.comment.set(val);
  }

  addEntry() {
    if (!this.selectedMood()) return;

    const newEntry: MoodEntry = {
      date: new Date().toLocaleString(),
      mood: this.selectedMood()!,
      comment: this.comment(),
    };

    this.history.update((entries) => [newEntry, ...entries]);

    this.comment.set('');
    this.selectedMood.set(null);
  }

  deleteEntry(index: number) {
    this.history.update((entries) => entries.filter((_, i) => i !== index));
  }
}
