export type Subscriber<T> = (value: T) => void;

export class Observer<T> {
  subscribers: Subscriber<T>[] = [];
  unsub_queue: Subscriber<T>[] = [];
  constructor(public value: T) {}

  $subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber);
    return {
      unsubscribe: () => {
        this.unsub_queue.push(subscriber);
      },
    };
  }

  $broadcast() {
    this.subscribers.forEach(sub => sub(this.value));
    if (this.unsub_queue.length > 0) {
      this.unsub_queue.forEach(subscriber => {
        const index = this.subscribers.indexOf(subscriber);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });
      this.unsub_queue.length = 0;
    }
  }

  $set(setter: ((prev: T) => T) | T) {
    if (setter instanceof Function) {
      this.value = setter(this.value);
      this.$broadcast();
      return;
    }
    this.value = setter;
    this.$broadcast();
  }

  $get() {
    return this.value;
  }

  $once(subscriber: Subscriber<T>) {
    const call = this.$subscribe(v => {
      subscriber(v);
      call.unsubscribe();
    });
  }
}
