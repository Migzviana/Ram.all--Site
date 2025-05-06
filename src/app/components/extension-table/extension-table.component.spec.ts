import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionTableComponent } from './extension-table.component';

describe('ExtensionTableComponent', () => {
  let component: ExtensionTableComponent;
  let fixture: ComponentFixture<ExtensionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtensionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
