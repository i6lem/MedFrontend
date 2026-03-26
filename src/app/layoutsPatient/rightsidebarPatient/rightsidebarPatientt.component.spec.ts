import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsidebarPatientComponent } from './rightsidebarPatient.component';

describe('RightsidebarPatientComponent', () => {
  let component: RightsidebarPatientComponent;
  let fixture: ComponentFixture<RightsidebarPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightsidebarPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsidebarPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
