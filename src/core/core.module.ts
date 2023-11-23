import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactoryHelper } from '@core/helpers/http-loader-factory.helper';
import { NgxsModule } from '@ngxs/store';
import { CoreState } from '@core/store/state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from '@env/environment';
import { TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from '@core/helpers/custom-titlestrategy';
import {
  ThemeDomFactoryService,
  ThemeDomService,
} from '@core/services/theme-dom.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([CoreState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: CoreState,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactoryHelper,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    {
      provide: ThemeDomService,
      useFactory: ThemeDomFactoryService,
      deps: [DOCUMENT],
    },
  ],
})
export class CoreModule {}
