import {Injectable} from '@angular/core';
import {HeaderConfig, HeaderService, Link, PortalProfile} from '@ria/stateportal-header';
import {AppConfigService} from '@stateportal/app-config';
import {AuthService} from '@ria/stateportal-timur-auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {trim} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceImplementation extends HeaderService {

  config: HeaderConfig = {
    profile: PortalProfile.CITIZEN,
    search: true
  };

  currentLang$: BehaviorSubject<string> = new BehaviorSubject<string>('et');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private authService: AuthService,
    private appConfigService: AppConfigService,
  ) {
    super();
  }

  navigate(link: Link): void {
    let url = link.url;
    const navigationExtras: NavigationExtras = {};

    if (url.includes('#')) { // contains fragment
      navigationExtras.fragment = url.split('#')[1];
      url = url.split('#')[0];
    }
    this.router.navigate(trim(url,'/').split('/'), navigationExtras);
  }

  navigateToSearchResultPage(searchTerm: string, lang: string) {
    const navigationExtras: NavigationExtras = {};
    navigationExtras.queryParams = {search: searchTerm};
    this.router.navigate([lang, 'search'], navigationExtras);
  }

  override getFullName(): Observable<string> {
    return this.authService.user$.pipe(map(user => {
      return user ? user.fullName : '';
    }));
  }


  getApiGwUrl(): string {
    return this.appConfigService.getApiGwUrl();
  }

  getActivatedRoute(): ActivatedRoute {
    return this.activatedRoute;
  }
}
