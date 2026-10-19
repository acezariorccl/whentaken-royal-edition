import { photosByRound, regions, type Photo } from "./photos";
export type { Photo } from "./photos";
export interface Player {
  id: string;
  name: string;
  initials: string;
  color: string;
}
export interface Round {
  number: number;
  date?: string;
  gameUrl?: string;
  title: string;
  description: string;
  photos: Photo[];
  results: {
    playerId: string;
    location?: number;
    year?: number;
    score: number;
  }[];
}
export const players: Player[] = [
  { id: "andre", name: "André", initials: "A", color: "#cfe2f7" },
  { id: "luisa", name: "Luisa", initials: "L", color: "#bcd6f2" },
  { id: "walman", name: "Walman", initials: "W", color: "#e8f1fb" },
  { id: "juan", name: "Juan Mejia", initials: "JM", color: "#fbe6b8" },
  { id: "fede", name: "Fede", initials: "F", color: "#a9c9ee" },
  { id: "sebas", name: "Sebas", initials: "S", color: "#cfe2f7" },
  { id: "mari", name: "Mari", initials: "M", color: "#d9dde6" },
  { id: "silvia", name: "Silvia", initials: "S", color: "#fbe6b8" },
  { id: "sergio", name: "Sergio", initials: "S", color: "#bcd6f2" },
  { id: "angel", name: "Angel", initials: "A", color: "#e8f1fb" },
  { id: "kevin", name: "Kevin", initials: "K", color: "#a9c9ee" },
  { id: "victor", name: "Victor", initials: "V", color: "#d9dde6" },
];
export const galleryRegions = regions;

// Round 1 photos come from src/assets/rounds/round-1/. Results are totals only; add
// `location` and `year` points to a result if you want them shown in the table.
// Add later rounds in front of this one (newest first): [round2, round1].
const round1: Round = {
  number: 1,
  title: "Round 1",
  description: "Kevin takes the top spot with 967 points.",
  photos: photosByRound[1] ?? [],
  results: [
    { playerId: "kevin", location: 490, year: 477, score: 967 },
    { playerId: "sebas", location: 440, year: 493, score: 933 },
    { playerId: "andre", location: 343, year: 489, score: 832 },
    { playerId: "luisa", location: 335, year: 493, score: 828 },
    { playerId: "victor", score: 811 },
    { playerId: "fede", location: 321, year: 490, score: 811 },
  ],
};
export const rounds: Round[] = [round1];
// Rounds that already have results.
export const playedRounds = rounds.filter((round) => round.results.length > 0);

export function rankLabel(scores: number[], index: number): string {
  const score = scores[index];
  const rank = scores.indexOf(score) + 1;
  return `${rank}${scores.filter((value) => value === score).length > 1 ? "=" : ""}`;
}
export const latestRound: Round | undefined = rounds[0];
export const formatScore = (score: number) => score.toLocaleString("en-US");
export const formatDate = (date: string) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
export function standings(round: Round) {
  return round.results
    .map((result) => ({
      ...result,
      player: players.find((p) => p.id === result.playerId)!,
    }))
    .sort((a, b) => b.score - a.score);
}
export const leaderboard = players
  .map((player) => {
    const results = rounds.flatMap((r) =>
      r.results.filter((s) => s.playerId === player.id),
    );
    const total = results.reduce((sum, r) => sum + r.score, 0);
    return {
      player,
      total,
      played: results.length,
      average: results.length ? Math.round(total / results.length) : 0,
      best: results.length ? Math.max(...results.map((r) => r.score)) : 0,
      wins: rounds.filter((r) => standings(r)[0]?.playerId === player.id).length,
    };
  })
  .sort((a, b) => b.total - a.total);
