import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../data/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config!: AppConfig;

  constructor(private httpClient: HttpClient) {}

  load(path = './assets/config.json'): Promise<AppConfig> {
    return this.httpClient
      .get<AppConfig>(path)
      .toPromise()
      .then(result => {
        if (result !== undefined) {
          this.config = this.composeAppConfig(result);
          return this.config;
        }
        throw new Error('Configuration could not be loaded');
      });
  }

  /**
   * Required because giving variables in from .env will result them being of type string and
   * typescript types will not help out of box during runtime.
   * @param result
   */
  composeAppConfig(result: AppConfig): AppConfig {
    return {
      "tim": {
        "url": result.tim.url,
        "callbackUrl": result.tim.callbackUrl,
        "registrationId": result.tim.registrationId
      },
      "ruuter": {
        "url": result.ruuter.url
      },
      "orbeon": {
        "url": result.orbeon.url
      },
      "matomo": {
        "url": result.matomo.url,
        "id": Number(result.matomo.id)
      },
      "jmap": {
        "apiUrl": result.jmap.apiUrl,
        "authUrl": result.jmap.authUrl
      },
      "sdgLogoUrl": result.sdgLogoUrl,
      "portalSearch": {
        "querySuggestionsLength": Number(result.portalSearch.querySuggestionsLength),
        "querySearchLength": Number(result.portalSearch.querySearchLength),
        "inputDebounceTime": Number(result.portalSearch.inputDebounceTime),
        "suggestionListLimit": Number(result.portalSearch.suggestionListLimit)
      },
      "apiGwUrl": result.apiGwUrl,
      "featureFlags": {
      }
    }
  }

  strToBool(input: any): boolean {
    return input.toLowerCase() === 'true';
  }

  isLoaded(): boolean {
    return !!this.config;
  }

  getTimUrl(): string {
    return this.config.tim.url;
  }

  getTimCallbackUrl(): string {
    return this.config.tim.callbackUrl;
  }

  getRuuterUrl(): string {
    return this.config.ruuter.url;
  }


  getApiGwUrl(): string {
    if (this.config.apiGwUrl) {
      return this.config.apiGwUrl;
    }
    throw new Error('API Gateway URL not found!');
  }
}
