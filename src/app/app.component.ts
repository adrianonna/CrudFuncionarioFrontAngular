import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Funcionario from './funcionario';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public funcionarios!: Funcionario[];
  public editFuncionario!: Funcionario;
  public deleteFuncionario!: Funcionario;

  constructor(private funcionarioService: FuncionarioService){}

  ngOnInit() {
    this.getFuncionarios(); //chama essa função ao inicializar o componente app
  }

  public getFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(
      (response: Funcionario[]) => {
        this.funcionarios = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFuncionario(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.funcionarioService.addFuncionarios(addForm.value).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.getFuncionarios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateFuncionario(funcionario: Funcionario): void {
    this.funcionarioService.updateFuncionarios(funcionario).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFuncionario(funcionarioId: number): void {
    this.funcionarioService.deleteFuncionarios(funcionarioId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFuncionario(key: string): void{
    const results: Funcionario[] = [];
    for (const funcionario of this.funcionarios){
      if (funcionario.nome.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.funcao.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.telefone.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(funcionario);
      }
    }
    this.funcionarios = results
    if (results.length === 0 || !key){
      this.getFuncionarios();
    }
  }

  public onOpenModal(funcionario: Funcionario, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'edit'){
      this.editFuncionario = funcionario;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete'){
      this.deleteFuncionario = funcionario;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalAdd(mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  } 
}
