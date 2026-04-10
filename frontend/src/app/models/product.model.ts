export interface Category {
  id: number;
  nome: string;
  descricao: string;
  criado_em: string;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagemUrl: string | null;
  categoria: Category;
  ativo: boolean;
  criadoEm: string;
}