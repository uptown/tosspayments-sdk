export class LazyLoader<T> {

  private value: T | null = null;
  private loaded = false;

  constructor(private provider: () => T) {
  }

  get(): T {
    if (!this.loaded) {
      this.value = this.provider();
    }
    return this.value!;
  }
}
