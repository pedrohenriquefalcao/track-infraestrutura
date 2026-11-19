export type TipoRecurso = 'Máquina virtual' | 'Banco de dados' | 'Armazenamento' | 'Rede';
export type AmbienteRecurso = 'Produção' | 'Homologação' | 'Desenvolvimento';
export type EstadoRecurso = 'Ativo' | 'Alerta' | 'Ocioso';

export interface RecursoNuvem {
  id: number;
  nome: string;
  provedor: 'AWS' | 'Azure' | 'Google Cloud';
  tipo: TipoRecurso;
  ambiente: AmbienteRecurso;
  estado: EstadoRecurso;
  custoMensal: number;
  consumoCpu: number;
  consumoMemoria: number;
  regiao: string;
  atualizacao: string;
}
