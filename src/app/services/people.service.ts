import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { People } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url: string = environment.apipeople;
  private apiUrl: string = this.url + 'api/people';

  constructor(private http: HttpClient) { }

  getPeopleAll(): Observable<People[]> {
    return this.http.get<People[]>(`${this.apiUrl}/list`);
  }

  addPeople(person: People): Observable<People> {
    return this.http.post<People>(`${ this.apiUrl }/create`, person);
  }

  deletePeople(idPeople: number): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/delete/${ idPeople }`)
  }

  searchPeople(search: string): Observable<People[]> {
    return this.http.get<People[]>(`${ this.apiUrl }/search?searchTerm=${ search }`);
  }
}
