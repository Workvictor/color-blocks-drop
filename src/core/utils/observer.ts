export type Subscriber<T> = (value: T) => void;

export class Observer<T> {
  private subscribers: Subscriber<T>[] = [];
  private unsub_queue: Subscriber<T>[] = [];
  constructor(private $value: T) {}

  $subscribe = (subscriber: Subscriber<T>) => {
    this.subscribers.push(subscriber);
    return {
      unsubscribe: () => {
        this.unsub_queue.push(subscriber);
      },
    };
  };

  $broadcast = () => {
		const {subscribers, $value, unsub_queue} = this;
    subscribers.forEach(sub => sub($value));
    if (unsub_queue.length > 0) {
      unsub_queue.forEach(subscriber => {
        const index = subscribers.indexOf(subscriber);
        if (index >= 0) {
          subscribers.splice(index, 1);
        }
      });
      unsub_queue.length = 0;
    }
  };

  $set = (setter: ((prev: T) => T) | T) => {
    if (setter instanceof Function) {
      this.$value = setter(this.$value);
      this.$broadcast();
      return;
    }
    this.$value = setter;
    this.$broadcast();
  };

  $get = () => {
    return this.$value;
  };

  $once = (subscriber: Subscriber<T>) => {
    const call = this.$subscribe(v => {
      subscriber(v);
      call.unsubscribe();
    });
  };
}
