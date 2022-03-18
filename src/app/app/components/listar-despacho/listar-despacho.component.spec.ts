import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDespachoComponent } from './listar-despacho.component';

describe('ListarDespachoComponent', () => {
  let component: ListarDespachoComponent;
  let fixture: ComponentFixture<ListarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
