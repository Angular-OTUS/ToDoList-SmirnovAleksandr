import { inject, Injectable } from '@angular/core';
import { Task } from '../types/common.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Task>(url, task);
  }
}
