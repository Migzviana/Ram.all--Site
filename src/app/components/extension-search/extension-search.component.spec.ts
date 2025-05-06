import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionSearchComponent } from './extension-search.component';

describe('ExtensionSearchComponent', () => {
  let component: ExtensionSearchComponent;
  let fixture: ComponentFixture<ExtensionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtensionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
