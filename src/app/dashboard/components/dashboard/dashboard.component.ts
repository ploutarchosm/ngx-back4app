import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CoreActions } from '@core/store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private store: Store) {}

  changeTheme() {
    this.store.dispatch(new CoreActions.ActionThemeCore('system'));
  }
}
