import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

export interface Fuseau {
  /** Identifiant IANA ; `null` = heure locale du navigateur. */
  id: string | null;
  ville: string;
}

export interface HeureMinuteSeconde {
  h: number;
  m: number;
  s: number;
}

export const FUSEAUX: readonly Fuseau[] = [
  { id: null, ville: 'Heure locale' },
  { id: 'Europe/London', ville: 'Londres' },
  { id: 'Europe/Paris', ville: 'Paris' },
  { id: 'America/New_York', ville: 'New York' },
  { id: 'America/Los_Angeles', ville: 'Los Angeles' },
  { id: 'America/Sao_Paulo', ville: 'São Paulo' },
  { id: 'Asia/Dubai', ville: 'Dubaï' },
  { id: 'Asia/Kolkata', ville: 'Mumbai' },
  { id: 'Asia/Shanghai', ville: 'Shanghai' },
  { id: 'Asia/Tokyo', ville: 'Tokyo' },
  { id: 'Australia/Sydney', ville: 'Sydney' },
  { id: 'Pacific/Auckland', ville: 'Auckland' },
];

export const deuxChiffres = (n: number): string => String(n).padStart(2, '0');

/** Heure, minutes et secondes d'une date dans un fuseau donné. */
export function heureDans(date: Date, fuseau: string | null): HeureMinuteSeconde {
  if (!fuseau) return { h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() };
  try {
    const parties = new Intl.DateTimeFormat('en-GB', {
      timeZone: fuseau, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(date);
    const val = (type: string) => parseInt(parties.find((p) => p.type === type)?.value ?? '0', 10);
    return { h: val('hour') % 24, m: val('minute'), s: val('second') };
  } catch {
    return { h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() };
  }
}

/** L'heure courante (rafraîchie chaque seconde), le mode d'affichage et le fuseau choisi. */
@Injectable()
export class HorlogeService {
  readonly maintenant = signal(new Date());
  readonly numerique = signal(false);
  readonly fuseau = signal<string | null>(null);
  readonly selecteurOuvert = signal(false);

  readonly heure = computed(() => heureDans(this.maintenant(), this.fuseau()));

  readonly dateLongue = computed(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const fuseau = this.fuseau();
    if (fuseau) options.timeZone = fuseau;
    const texte = this.maintenant().toLocaleDateString('fr-FR', options);
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  });

  readonly libelleFuseau = computed(() => {
    const fuseau = this.fuseau();
    if (!fuseau) {
      const local = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
      return local.replace(/_/g, ' ').toUpperCase();
    }
    const ville = FUSEAUX.find((f) => f.id === fuseau)?.ville ?? fuseau;
    return `${ville} · ${this.decalage(fuseau)}`.toUpperCase();
  });

  constructor() {
    const minuterie = setInterval(() => {
      const n = new Date();
      if (n.getSeconds() !== this.maintenant().getSeconds()) this.maintenant.set(n);
    }, 200);
    inject(DestroyRef).onDestroy(() => clearInterval(minuterie));
  }

  basculerAffichage(): void {
    this.numerique.update((v) => !v);
    this.selecteurOuvert.set(false);
  }

  afficher(numerique: boolean): void {
    this.numerique.set(numerique);
    this.selecteurOuvert.set(false);
  }

  basculerSelecteur(): void {
    this.selecteurOuvert.update((v) => !v);
  }

  choisirFuseau(id: string | null): void {
    this.fuseau.set(id);
    this.selecteurOuvert.set(false);
  }

  private decalage(fuseau: string): string {
    try {
      return new Intl.DateTimeFormat('fr-FR', { timeZone: fuseau, timeZoneName: 'shortOffset' })
        .formatToParts(this.maintenant())
        .find((p) => p.type === 'timeZoneName')?.value ?? '';
    } catch {
      return '';
    }
  }
}
