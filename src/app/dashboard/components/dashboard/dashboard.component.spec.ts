import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { NgxsModule } from '@ngxs/store';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule, NgxsModule.forRoot()],
      declarations: [DashboardComponent],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
