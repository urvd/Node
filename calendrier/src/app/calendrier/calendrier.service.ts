import { Injectable, computed, signal } from '@angular/core';

export type Mode = 'jours' | 'mois' | 'annees';

export interface JourCalendrier {
  y: number;
  m: number;
  d: number;
}

export interface Cellule {
  cle: string;
  date: JourCalendrier;
  dansMois: boolean;
  weekend: boolean;
  aujourdhui: boolean;
  selectionne: boolean;
  horsPlage: boolean;
  libelle: string;
}

export interface Choix {
  valeur: number;
  libelle: string;
  vue: boolean;
  courant: boolean;
}

export const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
  'septembre', 'octobre', 'novembre', 'décembre'];

export const majuscule = (texte: string): string => texte.charAt(0).toUpperCase() + texte.slice(1);

const memeJour = (a: JourCalendrier, b: JourCalendrier) => a.y === b.y && a.m === b.m && a.d === b.d;

const dateLongue = (j: JourCalendrier) =>
  new Date(j.y, j.m, j.d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** Numéro de semaine ISO 8601. */
export function semaineIso(j: JourCalendrier): number {
  const dt = new Date(Date.UTC(j.y, j.m, j.d));
  const jourSemaine = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - jourSemaine);
  const debutAnnee = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  return Math.ceil(((dt.getTime() - debutAnnee.getTime()) / 864e5 + 1) / 7);
}

/** État du calendrier : mois affiché, jour choisi, vue (jours, mois ou années). */
@Injectable()
export class CalendrierService {
  /** Remplaçable dans les tests. */
  readonly aujourdhui = signal(CalendrierService.jourDe(new Date()));

  readonly anneeMin = computed(() => this.aujourdhui().y - 5);
  readonly anneeMax = computed(() => this.aujourdhui().y + 5);

  readonly vueAnnee = signal(this.aujourdhui().y);
  readonly vueMois = signal(this.aujourdhui().m);
  readonly selection = signal<JourCalendrier>(this.aujourdhui());
  readonly mode = signal<Mode>('jours');

  /** 6 semaines de 7 jours, lundi en premier. */
  readonly cellules = computed<Cellule[]>(() => {
    const y = this.vueAnnee(), m = this.vueMois();
    const decalage = (new Date(y, m, 1).getDay() + 6) % 7;
    return Array.from({ length: 42 }, (_, i) => {
      const date = CalendrierService.jourDe(new Date(y, m, 1 - decalage + i));
      return {
        cle: `${date.y}-${date.m}-${date.d}`,
        date,
        dansMois: date.m === m,
        weekend: i % 7 >= 5,
        aujourdhui: memeJour(date, this.aujourdhui()),
        selectionne: memeJour(date, this.selection()),
        horsPlage: date.y < this.anneeMin() || date.y > this.anneeMax(),
        libelle: dateLongue(date),
      };
    });
  });

  readonly listeMois = computed<Choix[]>(() =>
    MOIS.map((nom, m) => ({
      valeur: m,
      libelle: majuscule(nom),
      vue: m === this.vueMois(),
      courant: m === this.aujourdhui().m && this.vueAnnee() === this.aujourdhui().y,
    })),
  );

  readonly listeAnnees = computed<Choix[]>(() => {
    const annees: Choix[] = [];
    for (let y = this.anneeMin(); y <= this.anneeMax(); y++) {
      annees.push({ valeur: y, libelle: String(y), vue: y === this.vueAnnee(), courant: y === this.aujourdhui().y });
    }
    return annees;
  });

  readonly titre = computed(() => {
    switch (this.mode()) {
      case 'jours': return `${majuscule(MOIS[this.vueMois()])} ${this.vueAnnee()}`;
      case 'mois': return String(this.vueAnnee());
      case 'annees': return `${this.anneeMin()} – ${this.anneeMax()}`;
    }
  });

  readonly titreAccessible = computed(() => {
    switch (this.mode()) {
      case 'jours': return `${this.titre()}, choisir le mois`;
      case 'mois': return `${this.titre()}, choisir l’année`;
      case 'annees': return 'Retour aux jours';
    }
  });

  readonly precedentDesactive = computed(() => {
    switch (this.mode()) {
      case 'jours': return this.vueAnnee() === this.anneeMin() && this.vueMois() === 0;
      case 'mois': return this.vueAnnee() === this.anneeMin();
      case 'annees': return true;
    }
  });

  readonly suivantDesactive = computed(() => {
    switch (this.mode()) {
      case 'jours': return this.vueAnnee() === this.anneeMax() && this.vueMois() === 11;
      case 'mois': return this.vueAnnee() === this.anneeMax();
      case 'annees': return true;
    }
  });

  readonly selectionLongue = computed(() => majuscule(dateLongue(this.selection())));

  readonly selectionInfos = computed(() => {
    const s = this.selection(), t = this.aujourdhui();
    const ecart = Math.round((Date.UTC(s.y, s.m, s.d) - Date.UTC(t.y, t.m, t.d)) / 864e5);
    const relatif = ecart === 0 ? 'AUJOURD’HUI' : ecart === 1 ? 'DEMAIN' : ecart === -1 ? 'HIER'
      : ecart > 0 ? `DANS ${ecart} JOURS` : `IL Y A ${-ecart} JOURS`;
    return `SEMAINE ${semaineIso(s)} · ${relatif}`;
  });

  static jourDe(d: Date): JourCalendrier {
    return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
  }

  precedent(): void {
    if (this.mode() === 'mois') this.decalerAnnee(-1);
    else if (this.mode() === 'jours') this.decalerMois(-1);
  }

  suivant(): void {
    if (this.mode() === 'mois') this.decalerAnnee(1);
    else if (this.mode() === 'jours') this.decalerMois(1);
  }

  /** Jours → mois → années → jours. */
  changerMode(): void {
    this.mode.update((m) => (m === 'jours' ? 'mois' : m === 'mois' ? 'annees' : 'jours'));
  }

  choisirJour(j: JourCalendrier): void {
    if (j.y < this.anneeMin() || j.y > this.anneeMax()) return;
    this.selection.set(j);
    this.vueAnnee.set(j.y);
    this.vueMois.set(j.m);
  }

  choisirMois(m: number): void {
    this.vueMois.set(m);
    this.mode.set('jours');
  }

  choisirAnnee(y: number): void {
    this.vueAnnee.set(y);
    this.mode.set('mois');
  }

  allerAujourdhui(): void {
    const t = this.aujourdhui();
    this.selection.set(t);
    this.vueAnnee.set(t.y);
    this.vueMois.set(t.m);
    this.mode.set('jours');
  }

  private decalerMois(delta: number): void {
    let y = this.vueAnnee(), m = this.vueMois() + delta;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    if (y < this.anneeMin() || y > this.anneeMax()) return;
    this.vueAnnee.set(y);
    this.vueMois.set(m);
  }

  private decalerAnnee(delta: number): void {
    const y = this.vueAnnee() + delta;
    if (y < this.anneeMin() || y > this.anneeMax()) return;
    this.vueAnnee.set(y);
  }
}
