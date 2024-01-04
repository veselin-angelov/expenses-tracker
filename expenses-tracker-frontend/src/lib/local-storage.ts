export class LocalStorage<T> {
  constructor(private key: string) {}

  get() {
    const stringValue = localStorage.getItem(this.key);
    if (!stringValue) {
      return undefined;
    }

    return JSON.parse(stringValue);
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
