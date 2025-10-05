import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListCreate } from './to-do-list-create';

describe('ToDoListCreate', () => {
  let component: ToDoListCreate;
  let fixture: ComponentFixture<ToDoListCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
