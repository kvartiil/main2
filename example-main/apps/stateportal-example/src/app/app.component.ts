import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BreadcrumbItem } from '@ria/stateportal-sidenav';
import { AuthService, GlobalState, GlobalStateChangeService } from '@ria/stateportal-timur-auth';
import { AppConfigService } from '@stateportal/app-config';
import { Router } from '@angular/router';
import { HeaderAction, HeaderActionsEnum } from "@ria/stateportal-header";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stateportal-example';
  readonly siteType$ = new BehaviorSubject<string>('guest');
  isLoggedIn$: Observable<boolean> = of(false);
  sideNavMobileOpen$ = new BehaviorSubject<boolean>(false);
  apiGwUrl!: string;
  notifyEnabled: boolean = false;
  eestiEeUrl: string = 'https://www.arendus.eesti.ee/';
  currentLang: string = 'et';
  footerSdg$ = new BehaviorSubject<boolean>(false);
  isLogoutInProgress$ = new BehaviorSubject<boolean>(false);
  sidenavRepType$: Observable<string> = of('GUEST');
  activeRoute = '';
  timurUrl!: string;


  constructor(
    private authService: AuthService,
    protected appConfigService: AppConfigService,
    private globalStateChangeService: GlobalStateChangeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activeRoute = this.router.url;
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.apiGwUrl = this.appConfigService.getApiGwUrl();
    this.timurUrl = this.appConfigService.getTimUrl();
  }

  onHeaderAction(event: HeaderAction) {
    switch (event.action) {
      case HeaderActionsEnum.LOGOUT:
        this.isLogoutInProgress$.next(true);
        this.onAuthTrigger(false);
        break;
      case HeaderActionsEnum.LOGIN:
        this.onAuthTrigger(true);
        break;
      case HeaderActionsEnum.LANG_SWITCH:
        this.onLangChange(event.value);
        break;
      default:
        console.error('ACTION MISSING', event);
    }
  }

  closeSideNavMobile() {
    this.sideNavMobileOpen$.next(false);
  }

  selectRepresentativeByCode(): boolean {
    //TODO
    // Klassikaliselt siinkohal oleks feature flag'i kasutamine, mis laetakse sisse läbi appConfigService'i.
    // Käesoleva lihtsutatud näidisrakenduse puhul on antud ainult väljakommenteeritud kasutamise näidis.
    // return !!this.config.featureFlags.selectRepresentativeByCodeEE1293;
    return false;
  }

  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    //TODO: Siin on näide kuidas luuakse erinevate artiklite vahel navigeerides breadcrumbsid
    // this.translateService.get('common.homePage').pipe().subscribe(
    //   translation => {
    //     this.breadcrumbsService.setBreadcrumbs((breadcrumbs ?? []).map(crumb => crumb.title), translation, this.currentLang);
    //   }
    // );
  }

  onLangChange(lang: string): void {
    //TODO: Partnerid otsustavad ise keele valiku üle ja mida nad kasutada soovivad
  }

  onAuthTrigger(login: boolean): void {
    if (login) {
      this.authService.login();
    } else {
      this.notifyOtherTabsAboutSignOutEvent();
    }
  }

  private notifyOtherTabsAboutSignOutEvent(): void {
    this.globalStateChangeService.changeState(GlobalState.SIGN_OUT);
  }

  //TODO: Need on iga portaali jaoks erinevad
  testInternalLinkForSidenav = (permalink: string): { permalink: string; context: string } => {
    if (isInternalUrl(permalink)) {
      return {
        permalink,
        context: Context.Internal
      };
    } else {
      return {
        permalink,
        context: Context.External
      };
    }
  };

  testInternalLinkForFooter = (permalink: string): { permalink: string; context: Context } => {
    if (/^mailto:/.test(permalink)) {
      return {
        permalink,
        context: Context.External
      };
    }

    return {
      permalink,
      context: Context.Internal
    };
  };
}

export const isInternalUrl = (url: string): boolean => /^\/(et|en|ru)([/?#].*)?$/.test(url);

enum Context {
  Internal = 'INTERNAL',
  External = 'EXTERNAL'
}
