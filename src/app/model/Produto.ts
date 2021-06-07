import {Categoria} from "./Categoria"

export class Produto{
    public id: number
    public nome: string
    public estoque: number
    public posto: string
    public municipioCidade: string
    public zona: string
    public endereco: string
    public classificacao: string
    public ativo: boolean
    public categoria: Categoria
}