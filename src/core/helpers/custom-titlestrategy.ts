import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private readonly translate: TranslateService) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      const pageTitle = this.translate.instant(title);
      this.title.setTitle(`NGX Back4App | ${pageTitle}`);
    }
  }
}
