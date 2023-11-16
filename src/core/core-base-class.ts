import {fromEvent, map, merge, Observable, Subject, switchMap} from "rxjs";
import {ColorScheme, IThemeOptions, ThemeType} from "@core/interfaces/core-config.interface";
import {Store} from "@ngxs/store";
import { MediaMatcher } from "@angular/cdk/layout";
import {publishRef} from "@utils/rxjs-share.utils";
import {themeList} from "@core/core.data";

export class CoreBaseClass {
  public defaultLang$: Observable<string>;
  public defaultTheme$: Observable<ColorScheme>;
  public dark: MediaQueryList;
  public defaultTheme: ColorScheme = 'light';
  public applicationTheme$: Observable<ThemeType>;
  public readonly applicationColorScheme$: Observable<ColorScheme>;
  public readonly _notifier = new Subject<void>();

  constructor(store: Store, mdr: MediaMatcher) {
    this.defaultLang$ = store.select(state => state.core.defaultLanguage);
    this.defaultTheme$ = store.select(state => state.core.defaultTheme);
    this.dark = mdr.matchMedia('(prefers-color-scheme: dark)');
    const systemThemeChanged$ = fromEvent(this.dark, 'change');
    this.applicationTheme$ = merge(this.defaultTheme$, systemThemeChanged$).pipe(
      switchMap(() => this.defaultTheme$),
      map((themeValue: ThemeType) => {
        // if the theme value is unknown revert to default theme
        return themeList.some((theme: IThemeOptions) => theme.value === themeValue) ? themeValue : this.defaultTheme;
      }),
      publishRef()
    );

    this.applicationColorScheme$ = this.applicationTheme$.pipe(map(
      selectedTheme => (selectedTheme === 'system' ? this.systemTheme : selectedTheme)
    ));
  }

  get systemTheme(): ColorScheme {
    return this.dark.matches ? 'dark' : 'light';
  }
}
