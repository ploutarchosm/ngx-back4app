import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactoryHelper } from "@core/helpers/http-loader-factory.helper";
import { NgxsModule} from "@ngxs/store";
import { CoreState} from "@core/store/state";
import {LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule, STORAGE_ENGINE} from "@ngxs/storage-plugin";
import { ThemeDomFactoryService, ThemeDomService } from "@core/services/theme-dom.service";
import {environment} from "@env/environment";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([CoreState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: CoreState
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactoryHelper,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: ThemeDomService,
      useFactory: ThemeDomFactoryService,
      deps: [DOCUMENT]
    }
  ]
})
export class CoreModule {}
