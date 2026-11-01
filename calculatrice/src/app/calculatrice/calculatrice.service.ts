import { Injectable, computed, signal } from '@angular/core';

export type Operateur = '+' | '-' | '*' | '/';

const SYMBOLES: Record<Operateur, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' };
const CHIFFRES_MAX = 12;
export const ERREUR = 'Erreur';

/** État et règles de calcul de la calculatrice. */
@Injectable()
export class CalculatriceService {
  private readonly courant = signal('0');
  private readonly accumulateur = signal<number | null>(null);
  private readonly operateur = signal<Operateur | null>(null);
  private readonly nouvelleSaisie = signal(true);
  private readonly memoire = signal(0);

  /** Valeur affichée, au format français (virgule, vrai signe moins). */
  readonly affichage = computed(() => {
    const cur = this.courant();
    return cur === ERREUR ? cur : cur.replace('.', ',').replace(/-/g, '−').replace('e', 'ᴇ');
  });

  /** Opération en attente, ex. « 12 × ». */
  readonly operationEnCours = computed(() => {
    const acc = this.accumulateur();
    const op = this.operateur();
    return acc !== null && op !== null
      ? `${this.formater(acc).replace('.', ',').replace('-', '−')} ${SYMBOLES[op]}`
      : '';
  });

  readonly memoireActive = computed(() => this.memoire() !== 0);

  chiffre(c: string): void {
    const cur = this.courant();
    if (cur === ERREUR || this.nouvelleSaisie()) {
      this.courant.set(c === '.' ? '0.' : c);
      this.nouvelleSaisie.set(false);
      return;
    }
    if (c === '.' && (cur.includes('.') || cur.includes('e'))) return;
    if (cur.replace(/[-.e]/g, '').length >= CHIFFRES_MAX) return;
    this.courant.set(cur === '0' && c !== '.' ? c : cur + c);
  }

  operation(op: Operateur): void {
    let v = this.valeur();
    const acc = this.accumulateur();
    const opPrec = this.operateur();
    if (opPrec !== null && acc !== null && !this.nouvelleSaisie()) {
      v = this.calculer(acc, opPrec, v);
    }
    this.accumulateur.set(v);
    this.operateur.set(op);
    this.courant.set(this.formater(v));
    this.nouvelleSaisie.set(true);
  }

  egal(): void {
    const acc = this.accumulateur();
    const op = this.operateur();
    if (acc === null || op === null) return;
    this.courant.set(this.formater(this.calculer(acc, op, this.valeur())));
    this.accumulateur.set(null);
    this.operateur.set(null);
    this.nouvelleSaisie.set(true);
  }

  effacer(): void {
    this.courant.set('0');
    this.accumulateur.set(null);
    this.operateur.set(null);
    this.nouvelleSaisie.set(true);
  }

  pourcentage(): void { this.unaire((x) => x / 100); }
  inverse(): void { this.unaire((x) => 1 / x); }
  racine(): void { this.unaire((x) => (x < 0 ? NaN : Math.sqrt(x))); }
  carre(): void { this.unaire((x) => x * x); }

  changerSigne(): void {
    const cur = this.courant();
    if (cur === ERREUR || cur === '0') return;
    if (cur.includes('e') && !this.nouvelleSaisie()) {
      const [mantisse, exposant] = cur.split('e');
      this.courant.set(`${mantisse}e${exposant.startsWith('-') ? exposant.slice(1) : '-' + exposant}`);
      return;
    }
    this.courant.set(cur.startsWith('-') ? cur.slice(1) : '-' + cur);
  }

  exposant(): void {
    const cur = this.courant();
    if (cur === ERREUR || cur.includes('e')) return;
    this.courant.set((this.nouvelleSaisie() ? '1' : cur) + 'e');
    this.nouvelleSaisie.set(false);
  }

  memoirePlus(): void { this.memoire.update((m) => m + this.valeur()); this.nouvelleSaisie.set(true); }
  memoireMoins(): void { this.memoire.update((m) => m - this.valeur()); this.nouvelleSaisie.set(true); }
  memoireRappel(): void { this.courant.set(this.formater(this.memoire())); this.nouvelleSaisie.set(true); }

  private unaire(f: (x: number) => number): void {
    this.courant.set(this.formater(f(this.valeur())));
    this.nouvelleSaisie.set(true);
  }

  private valeur(): number {
    const v = parseFloat(this.courant());
    return isNaN(v) ? 0 : v;
  }

  private calculer(a: number, op: Operateur, b: number): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
    }
  }

  private formater(n: number): string {
    if (!isFinite(n)) return ERREUR;
    let s = String(parseFloat(n.toPrecision(CHIFFRES_MAX)));
    if (s.replace(/[-.]/g, '').length > CHIFFRES_MAX) s = n.toExponential(6).replace('+', '');
    return s;
  }
}
