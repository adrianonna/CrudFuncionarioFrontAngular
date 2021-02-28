import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from './funcionario';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FuncionarioService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiServerUrl}/funcionario/all`);
  }

  public addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.apiServerUrl}/funcionario/add`, funcionario);
  }

  public updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiServerUrl}/funcionario/update`, funcionario);
  }

  public deleteFuncionario(funcionarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/funcionario/delete/${funcionarioId}`);
  }
}
