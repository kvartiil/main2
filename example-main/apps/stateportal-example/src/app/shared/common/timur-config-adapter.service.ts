import { Injectable } from '@angular/core';
import { TimurConfig } from "@ria/stateportal-timur-auth";

@Injectable({
  providedIn: 'root'
})
export class TimurConfigAdapterService implements TimurConfig {

  constructor() {}

  get callbackUrl(): string {
    return "https://local.arendus.eesti.ee"
  }

  get logoutCallbackUrl(): string {
    return '';
  }

  get registrationId(): string {
    return ""
  };

  get timurUrl(): string {
    return "https://www.arendus.eesti.ee/timur";
  }

  get minutesBeforeShowingSessionEndingModal(): number {
    throw new Error("minutesBeforeShowingSessionEndingModal configuration not implemented");
  }

}
