import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppConfig, AppConfigService } from '@stateportal/app-config';
import { AppInitializerService } from './app-initializer.service';

describe('AppInitializerService', () => {
  let service: AppInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
        AppInitializerService,
        {
            provide: AppConfigService,
            useValue: {
                load: jest.fn().mockReturnValue(Promise.resolve({} as AppConfig))
            }
        }
    ],
    teardown: { destroyAfterEach: false }
});

    service = TestBed.inject(AppInitializerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to init different services', fakeAsync(() => {
    const appConfigService = TestBed.inject(AppConfigService);

    service.init();
    tick();

    expect(appConfigService.load).toHaveBeenCalledTimes(1);
  }));
});
