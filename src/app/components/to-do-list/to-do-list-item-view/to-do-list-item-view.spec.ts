import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListItemView } from './to-do-list-item-view';

describe('ToDoListItemView', () => {
  let component: ToDoListItemView;
  let fixture: ComponentFixture<ToDoListItemView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListItemView],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListItemView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
