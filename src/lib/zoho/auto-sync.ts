import CalendarService from './calendar-service';
import type { Installation } from '../../types/installation';

export class AutoSync {
  private static instance: AutoSync;
  private calendarService: CalendarService;
  private syncInterval: number = 5 * 60 * 1000; // 5 minutes
  private timer: NodeJS.Timeout | null = null;
  private onUpdate: (installations: Installation[]) => void = () => {};

  private constructor() {
    this.calendarService = CalendarService.getInstance();
  }

  static getInstance(): AutoSync {
    if (!AutoSync.instance) {
      AutoSync.instance = new AutoSync();
    }
    return AutoSync.instance;
  }

  startSync(callback: (installations: Installation[]) => void) {
    this.onUpdate = callback;
    this.sync();
    this.timer = setInterval(() => this.sync(), this.syncInterval);
  }

  stopSync() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async sync() {
    try {
      const installations = await this.calendarService.fetchEvents(true);
      this.onUpdate(installations);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Auto-sync failed:', error.message);
      }
    }
  }

  setSyncInterval(minutes: number) {
    this.syncInterval = minutes * 60 * 1000;
    if (this.timer) {
      this.stopSync();
      this.startSync(this.onUpdate);
    }
  }
}