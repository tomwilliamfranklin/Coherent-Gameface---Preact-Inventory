/** By Tom Franklin */

// really basic observer pattern i made just for this test, could be improved with more efficient array calls.

type Observer<T> = (event: T) => void;

export class Subject<T> {
  private observers: Observer<T>[] = [];

  public register(observer: Observer<T>) {
    this.observers.push(observer);
  }

  public unregister(observer: Observer<T>) {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  public notify(e: T) {
    for (const observer of this.observers) {
      observer(e);
    }
  }
}
