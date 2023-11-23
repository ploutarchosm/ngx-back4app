import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CoreStateModel } from '@core/interfaces/core-config.interface';
import { CoreActions } from '@core/store/actions';

@State<CoreStateModel>({
  name: 'core',
  defaults: {
    applicationName: 'NGX-SCENARIOS',
    supportedLanguages: ['en-US'],
    defaultLanguage: 'en-US',
    defaultTheme: 'light',
  },
})
@Injectable()
export class CoreState {
  @Action(CoreActions.ActionLanguageCore)
  changeLanguage(
    ctx: StateContext<CoreStateModel>,
    action: CoreActions.ActionLanguageCore
  ) {
    ctx.setState({
      ...ctx.getState(),
      defaultLanguage: action.language,
    });
    console.log(ctx.getState());
  }

  @Action(CoreActions.ActionThemeCore)
  changeTheme(
    ctx: StateContext<CoreStateModel>,
    action: CoreActions.ActionThemeCore
  ) {
    ctx.setState({
      ...ctx.getState(),
      defaultTheme: action.theme,
    });
  }
}
