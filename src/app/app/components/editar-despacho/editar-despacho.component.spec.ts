import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDespachoComponent } from './editar-despacho.component';

describe('EditarDespachoComponent', () => {
  let component: EditarDespachoComponent;
  let fixture: ComponentFixture<EditarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
