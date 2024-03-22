import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppConfig } from '../data/app-config.model';

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  let config: AppConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
        AppConfigService
    ],
    imports: [
        HttpClientTestingModule
    ],
    teardown: { destroyAfterEach: false }
});

    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);

    config = {
      tim: {
        url: 'https://tim',
        callbackUrl: 'https://localhost:4200/dashboard'
      },
      ruuter: {
        url: 'http://ruuter'
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config from default path', waitForAsync(() => {
    service.load()
      .then(result => {
        expect(result).toStrictEqual(config);
      });
  }));

  it('should be able to tell if config was loaded', waitForAsync(() => {
    expect(service.isLoaded()).toBeFalsy();

    service.load()
      .then(result => {
        expect(result).toStrictEqual(config);
        expect(service.isLoaded()).toBeTruthy();
      });
  }));

  describe('access configuration properties', () => {
    beforeEach(waitForAsync(() => {
      service.load();
    }));

    it('should be able to get Tim url', () => {
      expect(service.getTimUrl()).toBe('https://tim');
    });

    it('should be able to get Tim callback url', () => {
      expect(service.getTimCallbackUrl()).toBe('https://localhost:4200/dashboard');
    });

    it('should be able to get Ruuter url', () => {
      expect(service.getRuuterUrl()).toBe('http://ruuter');
    });
  });
});
