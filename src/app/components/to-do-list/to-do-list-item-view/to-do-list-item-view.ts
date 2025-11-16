import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-to-do-list-item-view',
  imports: [],
  templateUrl: './to-do-list-item-view.html',
  styleUrl: './to-do-list-item-view.scss',
})
export class ToDoListItemView implements OnInit, OnDestroy {
  public dataService = inject(DataService);
  readonly #route = inject(ActivatedRoute);
  public taskDescription: string | null | undefined = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.#route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.dataService.getTaskById(params['id']).subscribe((task) => {
          this.taskDescription = task.description;
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
