import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecursoNuvem } from './recurso-nuvem.model';
import { RecursoNuvemService } from './recurso-nuvem.service';

@Component({
  imports: [CommonModule, FormsModule, CurrencyPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly servicoRecursos = inject(RecursoNuvemService);

  readonly recursos = signal<RecursoNuvem[]>(this.servicoRecursos.listarRecursos());
  readonly termoBusca = signal('');
  readonly ambienteFiltro = signal('Todos');
  readonly modalAberto = signal(false);
  readonly recursoEmEdicao = signal<RecursoNuvem | null>(null);
  formularioRecurso = this.servicoRecursos.criarModeloVazio();

  readonly recursosFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase();
    const ambiente = this.ambienteFiltro();
    return this.recursos().filter(recurso =>
      (ambiente === 'Todos' || recurso.ambiente === ambiente) &&
      (!termo ||
        recurso.nome.toLowerCase().includes(termo) ||
        recurso.provedor.toLowerCase().includes(termo) ||
        recurso.tipo.toLowerCase().includes(termo))
    );
  });

  readonly custoTotal = computed(() =>
    this.recursos().reduce((total, recurso) => total + recurso.custoMensal, 0)
  );
  readonly recursosAtivos = computed(() =>
    this.recursos().filter(recurso => recurso.estado === 'Ativo').length
  );
  readonly recursosEmAlerta = computed(() =>
    this.recursos().filter(recurso => recurso.estado === 'Alerta').length
  );
  readonly maiorConsumoCpu = computed(() =>
    this.recursos().reduce((maior, recurso) =>
      recurso.consumoCpu > maior.consumoCpu ? recurso : maior,
      this.recursos()[0] ?? this.servicoRecursos.criarModeloVazio()
    )
  );

  alterarBusca(evento: Event): void {
    this.termoBusca.set((evento.target as HTMLInputElement).value);
  }

  alterarAmbiente(evento: Event): void {
    this.ambienteFiltro.set((evento.target as HTMLSelectElement).value);
  }

  abrirNovoRecurso(): void {
    this.recursoEmEdicao.set(null);
    this.formularioRecurso = this.servicoRecursos.criarModeloVazio();
    this.modalAberto.set(true);
  }

  editarRecurso(recurso: RecursoNuvem): void {
    this.recursoEmEdicao.set(recurso);
    this.formularioRecurso = { ...recurso };
    this.modalAberto.set(true);
  }

  fecharModal(): void {
    this.modalAberto.set(false);
  }

  salvarRecurso(): void {
    if (!this.formularioRecurso.nome.trim()) return;

    if (this.recursoEmEdicao()) {
      const recursosAtualizados = this.servicoRecursos.atualizarRecurso(
        { ...this.formularioRecurso },
        this.recursos()
      );
      this.recursos.set(recursosAtualizados);
    } else {
      const { id, atualizacao, ...dadosNovoRecurso } = this.formularioRecurso;
      const recursosAtualizados = this.servicoRecursos.criarRecurso(
        dadosNovoRecurso,
        this.recursos()
      );
      this.recursos.set(recursosAtualizados);
    }
    this.fecharModal();
  }

  excluirRecurso(idRecurso: number): void {
    if (!confirm('Deseja excluir este recurso da infraestrutura?')) return;
    this.recursos.set(this.servicoRecursos.excluirRecurso(idRecurso, this.recursos()));
  }

  classeEstado(estado: string): string {
    if (estado === 'Ativo') return 'estado-ativo';
    if (estado === 'Alerta') return 'estado-alerta';
    return 'estado-ocioso';
  }
}
