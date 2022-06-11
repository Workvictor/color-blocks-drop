import { array_each } from './array_utils';

export type Subscriber<T> = (value: T) => void;

export const observer = <T>(value: T) => {
  const subscribers: Subscriber<T>[] = [];
  const unsub_queue: Subscriber<T>[] = [];

  const $subscribe = (subscriber: Subscriber<T>) => {
    subscribers.push(subscriber);
    return {
      $unsubscribe: () => {
        unsub_queue.push(subscriber);
      },
    };
  };

  const $broadcast = () => {
    array_each(subscribers, sub => sub(value));
    if (unsub_queue.length > 0) {
      array_each(unsub_queue, subscriber => {
        const index = subscribers.indexOf(subscriber);
        if (index >= 0) {
          subscribers.splice(index, 1);
        }
      });
      unsub_queue.length = 0;
    }
  };

  const $set = (setter: T) => {
    value = setter;
    $broadcast();
  };

  const $set_f = (setter: (prev: T) => T) => $set(setter(value));

  const $get = () => value;

  const $once = (subscriber: Subscriber<T>) => {
    const call = $subscribe(v => {
      subscriber(v);
      call.$unsubscribe();
    });
  };

  return {
    //
    $subscribe,
    $broadcast,
    $set,
    $get,
    $set_f,
    $once,
    get v() {
      return value;
    },
  };
};

class Wrap<T> {
  0 = (v: T) => observer(v);
}

export type TObserver<T> = ReturnType<Wrap<T>[0]>;
