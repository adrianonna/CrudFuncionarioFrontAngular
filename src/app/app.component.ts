import { Component, OnInit } from '@angular/core';
import { Funcionario } from './funcionario';
import { FuncionarioService } from './funcionario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public funcionarios: Funcionario[];
  public editFuncionario: Funcionario;
  public deleteFuncionario: Funcionario;

  constructor(private funcionarioService: FuncionarioService){}

  ngOnInit() {
    this.getFuncionarios();
  }

  public getFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(
      (response: Funcionario[]) => {
        this.funcionarios = response;
        console.log(this.funcionarios);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-funcionario-form').click();
    console.log(addForm.value);
    this.funcionarioService.addFuncionario(addForm.value).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.getFuncionarios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(funcionario: Funcionario): void {
    this.funcionarioService.updateFuncionario(funcionario).subscribe(
      (response: Funcionario) => {
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(funcionarioId: number): void {
    this.funcionarioService.deleteFuncionario(funcionarioId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFuncionarios(key: string): void {
    console.log(key);
    const results: Funcionario[] = [];
    for (const funcionario of this.funcionarios) {
      if (funcionario.nome.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.telefone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || funcionario.funcao.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(funcionario);
      }
    }
    this.funcionarios = results;
    if (results.length === 0 || !key) {
      this.getFuncionarios();
    }
  }

  public onOpenModal(funcionario: Funcionario, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFuncionarioModal');
    }
    if (mode === 'edit') {
      this.editFuncionario = funcionario;
      button.setAttribute('data-target', '#updateFuncionarioModal');
    }
    if (mode === 'delete') {
      this.deleteFuncionario = funcionario;
      button.setAttribute('data-target', '#deleteFuncionarioModal');
    }
    container.appendChild(button);
    button.click();
  }

}
