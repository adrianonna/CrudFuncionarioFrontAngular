// export interface Employee {
//     id: number;
//     name: string;
//     email: string;
//     jobTitle: string;
//     phone: string;
//     imageUrl: string;
//     employeeCode: string;
//   }


export default class Funcionario {
    id;
    nome = "";
    email = "";
    funcao = "";
    telefone = "";
    urlImagem = "";
    linguagem = "";

    constructor(id: number, nome: string, email: string, funcao: string, telefone: string, urlImagem: string, linguagem: string){
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.funcao = funcao,
        this.telefone = telefone,
        this.urlImagem = urlImagem,
        this.linguagem = linguagem
    }
}