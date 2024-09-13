import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleItemComponent } from './title-item.component';

describe('TitleItemComponent', () => {
  let component: TitleItemComponent;
  let fixture: ComponentFixture<TitleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
