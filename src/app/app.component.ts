import { MediaMatcher } from '@angular/cdk/layout';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {takeUntil} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {CoreBaseClass} from "@core/core-base-class";
import {ThemeDomService} from "@core/services/theme-dom.service";
import {IThemeOptions} from "@core/interfaces/core-config.interface";
import {themeList} from "@core/core.data";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent extends CoreBaseClass implements OnInit, OnDestroy {
constructor(
  private translate: TranslateService,
  private themeDomService: ThemeDomService,
  mdr: MediaMatcher,
  store: Store) {
  super(store, mdr);
}
  ngOnInit(): void {
    this.defaultLang$.pipe(
      takeUntil(this._notifier)
    ).subscribe({
      next: value => {
        this.translate.setDefaultLang(value);
        this.translate.use(value);
      }
    });
    this.applicationTheme$.pipe(
      takeUntil(this._notifier)
    ).subscribe({
      next : value => this.applyTheme(value)
    })
  }

  ngOnDestroy(): void {
    this._notifier.next()
    this._notifier.complete()
  }

  private applyTheme(themeValue:string) {
    const selectedTheme = themeList.some((theme: IThemeOptions) => theme.value === themeValue) ? themeValue : this.defaultTheme;
    this.themeDomService.applyApplicationTheme(selectedTheme === 'system' ? this.systemTheme : selectedTheme);
  }
}
