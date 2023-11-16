import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactoryHelper(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
