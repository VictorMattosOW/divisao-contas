import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResgisterComponent } from './user-resgister.component';

describe('UserResgisterComponent', () => {
  let component: UserResgisterComponent;
  let fixture: ComponentFixture<UserResgisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResgisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
