import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  fromEvent,
  map,
  merge,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  ColorScheme,
  IThemeOptions,
  ThemeType,
} from '@core/interfaces/core-config.interface';
import { MediaMatcher } from '@angular/cdk/layout';
import { themeList } from '@core/themes';
import { publishRef } from '@utils/rxjs-share.utils';
import { ThemeDomService } from '@core/services/theme-dom.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  readonly defaultLang$: Observable<string>;
  readonly defaultTheme$: Observable<ColorScheme>;

  private readonly applicationTheme$: Observable<ThemeType>;
  private readonly defaultTheme: ColorScheme = 'light';
  private readonly dark: MediaQueryList;
  private readonly _notifier = new Subject<void>();
  private readonly applicationColorScheme$: Observable<ColorScheme>;

  constructor(
    private translate: TranslateService,
    private store: Store,
    mdr: MediaMatcher,
    private themeDomService: ThemeDomService
  ) {
    this.defaultLang$ = this.store.select(state => state.core.defaultLanguage);
    this.defaultTheme$ = this.store.select(state => state.core.defaultTheme);
    this.dark = mdr.matchMedia('(prefers-color-scheme: dark)');
    const systemThemeChanged$ = fromEvent(this.dark, 'change');
    this.applicationTheme$ = merge(
      this.defaultTheme$,
      systemThemeChanged$
    ).pipe(
      switchMap(() => this.defaultTheme$),
      map((themeValue: ThemeType) => {
        // if the theme value is unknown revert to default theme
        return themeList.some(
          (theme: IThemeOptions) => theme.value === themeValue
        )
          ? themeValue
          : this.defaultTheme;
      }),
      publishRef()
    );

    this.applicationColorScheme$ = this.applicationTheme$.pipe(
      map(selectedTheme => {
        return selectedTheme === 'system' ? this.systemTheme : selectedTheme;
      })
    );
  }

  ngOnInit(): void {
    this.defaultLang$.pipe(takeUntil(this._notifier)).subscribe({
      next: value => {
        this.translate.setDefaultLang(value);
        this.translate.use(value);
      },
    });

    this.applicationTheme$.pipe(takeUntil(this._notifier)).subscribe({
      next: value => this.applyTheme(value),
    });
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }

  get systemTheme(): ColorScheme {
    return this.dark.matches ? 'dark' : 'light';
  }

  private applyTheme(themeValue: string) {
    console.log(themeValue);
    const selectedTheme = themeList.some(
      (theme: IThemeOptions) => theme.value === themeValue
    )
      ? themeValue
      : this.defaultTheme;
    this.themeDomService.applyApplicationTheme(
      selectedTheme === 'system' ? this.systemTheme : selectedTheme
    );
  }
}
