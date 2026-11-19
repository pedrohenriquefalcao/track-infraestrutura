import { Injectable } from '@angular/core';
import { AmbienteRecurso, EstadoRecurso, RecursoNuvem, TipoRecurso } from './recurso-nuvem.model';

@Injectable({ providedIn: 'root' })
export class RecursoNuvemService {
  private readonly chaveArmazenamento = 'track-infraestrutura-recursos';

  private recursosIniciais: RecursoNuvem[] = [
    { id: 1, nome: 'api-principal', provedor: 'AWS', tipo: 'Máquina virtual', ambiente: 'Produção', estado: 'Ativo', custoMensal: 1240.80, consumoCpu: 68, consumoMemoria: 72, regiao: 'São Paulo (sp)', atualizacao: 'há 2 min' },
    { id: 2, nome: 'banco-pedidos', provedor: 'Azure', tipo: 'Banco de dados', ambiente: 'Produção', estado: 'Alerta', custoMensal: 2385.50, consumoCpu: 91, consumoMemoria: 84, regiao: 'Brazil South', atualizacao: 'há 5 min' },
    { id: 3, nome: 'storage-assets', provedor: 'Google Cloud', tipo: 'Armazenamento', ambiente: 'Produção', estado: 'Ativo', custoMensal: 640.20, consumoCpu: 42, consumoMemoria: 38, regiao: 'São Paulo', atualizacao: 'há 8 min' },
    { id: 4, nome: 'gateway-homolog', provedor: 'AWS', tipo: 'Rede', ambiente: 'Homologação', estado: 'Ocioso', custoMensal: 320.00, consumoCpu: 18, consumoMemoria: 25, regiao: 'São Paulo (sp)', atualizacao: 'há 12 min' },
    { id: 5, nome: 'worker-relatorios', provedor: 'Azure', tipo: 'Máquina virtual', ambiente: 'Desenvolvimento', estado: 'Ativo', custoMensal: 486.90, consumoCpu: 55, consumoMemoria: 61, regiao: 'Brazil South', atualizacao: 'há 14 min' }
  ];

  listarRecursos(): RecursoNuvem[] {
    const dadosSalvos = localStorage.getItem(this.chaveArmazenamento);
    if (dadosSalvos) return JSON.parse(dadosSalvos) as RecursoNuvem[];
    this.salvarRecursos(this.recursosIniciais);
    return [...this.recursosIniciais];
  }

  salvarRecursos(recursos: RecursoNuvem[]): void {
    localStorage.setItem(this.chaveArmazenamento, JSON.stringify(recursos));
  }

  criarRecurso(dados: Omit<RecursoNuvem, 'id' | 'atualizacao'>, recursosAtuais: RecursoNuvem[]): RecursoNuvem[] {
    const novoId = recursosAtuais.length ? Math.max(...recursosAtuais.map(recurso => recurso.id)) + 1 : 1;
    const novoRecurso: RecursoNuvem = { ...dados, id: novoId, atualizacao: 'agora' };
    const recursosAtualizados = [...recursosAtuais, novoRecurso];
    this.salvarRecursos(recursosAtualizados);
    return recursosAtualizados;
  }

  atualizarRecurso(recursoAtualizado: RecursoNuvem, recursosAtuais: RecursoNuvem[]): RecursoNuvem[] {
    const recursosAtualizados = recursosAtuais.map(recurso =>
      recurso.id === recursoAtualizado.id ? { ...recursoAtualizado, atualizacao: 'agora' } : recurso
    );
    this.salvarRecursos(recursosAtualizados);
    return recursosAtualizados;
  }

  excluirRecurso(idRecurso: number, recursosAtuais: RecursoNuvem[]): RecursoNuvem[] {
    const recursosAtualizados = recursosAtuais.filter(recurso => recurso.id !== idRecurso);
    this.salvarRecursos(recursosAtualizados);
    return recursosAtualizados;
  }

  criarModeloVazio(): RecursoNuvem {
    return {
      id: 0,
      nome: '',
      provedor: 'AWS',
      tipo: 'Máquina virtual',
      ambiente: 'Produção',
      estado: 'Ativo',
      custoMensal: 0,
      consumoCpu: 0,
      consumoMemoria: 0,
      regiao: '',
      atualizacao: ''
    };
  }
}
