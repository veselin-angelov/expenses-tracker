class EventManager {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private events: { [key: string]: Array<Function> } = {};

  // eslint-disable-next-line @typescript-eslint/ban-types
  subscribe(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }
}

export const eventManager = new EventManager();
