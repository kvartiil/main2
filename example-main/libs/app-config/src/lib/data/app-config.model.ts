import { AppConfigRuuter } from './app-config-ruuter.model';
import { AppConfigTim } from './app-config-tim.model';
import { AppConfigMatomo } from './app-config-matomo.model';
import { AppConfigJmap } from './app-config-jmap.model';

export interface AppConfig {
  tim: AppConfigTim;
  ruuter: AppConfigRuuter;
  orbeon: AppConfigOrbeon;
  matomo: AppConfigMatomo;
  jmap: AppConfigJmap;
  sdgLogoUrl: string;
  portalSearch: AppConfigPortalSearch;
  featureFlags: AppConfigFeatureFlags;
  apiGwUrl: string;
}

interface AppConfigPortalSearch {
  querySuggestionsLength: number;
  querySearchLength: number;
  inputDebounceTime: number;
  suggestionListLimit: number;
}

interface AppConfigOrbeon {
  url: string;
}

interface AppConfigFeatureFlags {

}
