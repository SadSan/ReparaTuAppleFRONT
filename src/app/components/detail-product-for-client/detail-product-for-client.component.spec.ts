import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductForClientComponent } from './detail-product-for-client.component';

describe('DetailProductForClientComponent', () => {
  let component: DetailProductForClientComponent;
  let fixture: ComponentFixture<DetailProductForClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProductForClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
