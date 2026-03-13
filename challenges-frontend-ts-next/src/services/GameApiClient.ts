import type { LeaderBoardRow } from '@/types/domain.types';

class GameApiClient {
  private static readonly SERVER_URL = '';
  private static readonly GET_LEADERBOARD = '/leaders';

  static async leaderBoard(): Promise<LeaderBoardRow[]> {
    const response = await fetch(this.SERVER_URL + this.GET_LEADERBOARD);
    if (!response.ok) {
      throw new Error('Gamification: error response');
    }
    return response.json();
  }
}

export default GameApiClient;
