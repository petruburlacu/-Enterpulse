import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appInstance: AppComponent;

  beforeEach(() => {
    appInstance = new AppComponent();
  });

  test('Should create component', () => {
    expect(appInstance).toBeTruthy();
});

  it(`should have as title 'client'`, () => {
    expect(appInstance.title).toEqual('client');
  });
});
