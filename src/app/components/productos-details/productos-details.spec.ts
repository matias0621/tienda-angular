import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDetails } from './productos-details';

describe('ProductosDetails', () => {
  let component: ProductosDetails;
  let fixture: ComponentFixture<ProductosDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
