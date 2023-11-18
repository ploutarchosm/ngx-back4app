import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  readonly defaultLang$: Observable<string>;
  private readonly _notifier = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private store: Store
  ) {
    this.defaultLang$ = this.store.select(state => state.core.defaultLanguage);
  }
  ngOnInit(): void {
    this.defaultLang$.pipe(takeUntil(this._notifier)).subscribe({
      next: value => {
        this.translate.setDefaultLang(value);
        this.translate.use(value);
      },
    });
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
