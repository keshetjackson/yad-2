import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  private readonly api = 'http://localhost:3000/products';
  private currentId!: number;

  constructor(private readonly http: HttpClient) {}

  getNextId(): Observable<number> {
    if (this.currentId) {
      const nextId = this.currentId + 1;
      this.currentId = nextId;
      return of(nextId);
    }

    return this.http.get<any[]>(this.api).pipe(
      catchError(() => of([{ id: 0 }])),
      map((products: any[]) => {
        const ids = products.map((p) => p.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        const nextId = maxId + 1;
        this.currentId = nextId;
        return nextId;
      }),
    );
  }
}
