import type {
  Challenge,
  ChallengeAttempt,
  AttemptSubmission,
  AttemptResult,
  User,
} from '@/types/domain.types';

class ChallengeApiClient {
  private static readonly SERVER_URL = '';
  private static readonly GET_CHALLENGE = '/challenges/random';
  private static readonly POST_RESULT = '/attempts';
  private static readonly GET_ATTEMPTS_BY_ALIAS = '/attempts?alias=';
  private static readonly GET_USERS_BY_IDS = '/users';

  static async challenge(): Promise<Challenge> {
    const response = await fetch(this.SERVER_URL + this.GET_CHALLENGE);
    return response.json();
  }

  static async sendGuess(
    user: string,
    a: number,
    b: number,
    guess: number
  ): Promise<AttemptResult> {
    const submission: AttemptSubmission = {
      alias: user,
      factorA: a,
      factorB: b,
      guess: guess,
    };

    const response = await fetch(this.SERVER_URL + this.POST_RESULT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    return response.json();
  }

  static async getAttempts(alias: string): Promise<ChallengeAttempt[]> {
    console.log('Get attempts for ' + alias);
    const response = await fetch(
      this.SERVER_URL + this.GET_ATTEMPTS_BY_ALIAS + alias
    );
    return response.json();
  }

  static async getUsers(userIds: number[]): Promise<User[]> {
    const response = await fetch(
      this.SERVER_URL + this.GET_USERS_BY_IDS + '/' + userIds.join(',')
    );
    if (!response.ok) {
      throw new Error('Multiplication: error response');
    }
    return response.json();
  }
}

export default ChallengeApiClient;
