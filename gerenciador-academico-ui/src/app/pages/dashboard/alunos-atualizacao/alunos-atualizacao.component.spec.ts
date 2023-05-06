import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAtualizacaoComponent } from './alunos-atualizacao.component';

describe('AlunosAtualizacaoComponent', () => {
  let component: AlunosAtualizacaoComponent;
  let fixture: ComponentFixture<AlunosAtualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunosAtualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosAtualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
