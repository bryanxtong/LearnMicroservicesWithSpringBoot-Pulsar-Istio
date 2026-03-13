export interface Challenge {
  factorA: number;
  factorB: number;
}

export interface ChallengeAttempt {
  id: number;
  alias: string;
  factorA: number;
  factorB: number;
  guess: number;
  correct: boolean;
  resultAttempt?: number;
}

export interface AttemptSubmission {
  alias: string;
  factorA: number;
  factorB: number;
  guess: number;
}

export interface AttemptResult {
  correct: boolean;
  resultAttempt: number;
}

export interface User {
  id: number;
  alias: string;
}

export interface LeaderBoardRow {
  userId: number;
  totalScore: number;
  badges: string[];
  alias?: string;
}
