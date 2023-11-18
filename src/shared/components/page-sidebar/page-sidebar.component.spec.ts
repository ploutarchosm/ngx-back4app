import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSidebarComponent } from './page-sidebar.component';

describe('PageSidebarComponent', () => {
  let component: PageSidebarComponent;
  let fixture: ComponentFixture<PageSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSidebarComponent]
    });
    fixture = TestBed.createComponent(PageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
