import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string = 'http://localhost:4000/api/students';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // getAll(): Observable<Student[]> {
  //   return this.http.get<Student[]>(this.baseUrl).pipe(
  //     tap(listOfStudents => console.log(`students fetched = ${JSON.stringify(listOfStudents)}`)),
  //     catchError(err => of([]))
  //   );
  // }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  get(id: any): Observable<Student> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByName(name: any): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}?name=${name}`);
  }

}
