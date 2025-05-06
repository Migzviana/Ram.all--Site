import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExtensionPageComponent } from './main-extension-page.component';

describe('MainExtensionPageComponent', () => {
  let component: MainExtensionPageComponent;
  let fixture: ComponentFixture<MainExtensionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainExtensionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainExtensionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
