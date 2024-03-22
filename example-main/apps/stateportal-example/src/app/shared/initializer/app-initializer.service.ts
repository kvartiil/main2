import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {AppConfig, AppConfigService} from '@stateportal/app-config';
import {AuthService} from '@ria/stateportal-timur-auth';
import {isPlatformBrowser} from "@angular/common";
import {RedirectService} from "@ria/redirect";


@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(
    private appConfigService: AppConfigService,
    private authService: AuthService,
    private redirectService: RedirectService,
    @Inject(PLATFORM_ID) private platformId: Record<string, any>
  ) {}

  init(): Promise<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.loadAuth(this.appConfigService
        .load()
        .then(() => this.redirectService.redirect(this.appConfigService.getApiGwUrl() + 'redirect/url', "").toPromise()));
    } else {
      return this.loadAuth(this.appConfigService
        .load());
    }

  }

  private loadAuth(appConfigPromise: Promise<void | AppConfig>): Promise<any> {
    return appConfigPromise
      .then(() => this.authService.init().toPromise());
  }
}
