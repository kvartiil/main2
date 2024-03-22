import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule, HeaderService } from '@ria/stateportal-header';
import { TIMUR_CONFIG_DI_TOKEN } from '@ria/stateportal-timur-auth';
import { TimurConfigAdapterService } from './shared/common/timur-config-adapter.service';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '@ria/stateportal-footer';
import { SidenavModule } from '@ria/stateportal-sidenav';
import { ConfigServiceImplementation } from './shared/header/config.implementation.service';
import { AppInitializerService } from './shared/initializer/app-initializer.service';
import { AppConfig, AppConfigService } from '@stateportal/app-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    TranslateModule.forRoot(),
    FooterModule,
    SidenavModule
  ],
  providers: [
    AppInitializerService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => (): Promise<[AppConfig]> =>
        appInitializer.init(),
      deps: [AppInitializerService, AppConfigService],
      multi: true
    },
    {provide: TIMUR_CONFIG_DI_TOKEN, useClass: TimurConfigAdapterService},
    {provide: HeaderService, useClass: ConfigServiceImplementation},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
