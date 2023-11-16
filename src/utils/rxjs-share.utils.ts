import { Observable, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';

export const publishRef = <T>() => (source: Observable<T>) => source.pipe(share({
  // It might not be fully correct here
  // as we replace publishReplay(1), refCount()
  // see https://github.com/ReactiveX/rxjs/discussions/6438
  connector: () => new ReplaySubject(1),
  resetOnError: false,
  resetOnComplete: false,
}));
