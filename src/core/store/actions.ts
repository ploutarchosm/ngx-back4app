import { ThemeType } from '@core/interfaces/core-config.interface';

export namespace CoreActions {
  export class ActionLanguageCore {
    static readonly type = '[Core] Language';
    constructor(public language: string) {}
  }

  export class ActionThemeCore {
    static readonly type = '[Core] Theme';
    constructor(public theme: ThemeType) {}
  }
}
