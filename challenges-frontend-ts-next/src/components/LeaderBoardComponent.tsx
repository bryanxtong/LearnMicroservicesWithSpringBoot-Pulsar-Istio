'use client';

import { useState, useEffect, useCallback } from 'react';
import GameApiClient from '@/services/GameApiClient';
import ChallengesApiClient from '@/services/ChallengeApiClient';
import type { LeaderBoardRow, User } from '@/types/domain.types';

export default function LeaderBoardComponent() {
  const [leaderboard, setLeaderboard] = useState<LeaderBoardRow[]>([]);
  const [serverError, setServerError] = useState(false);

  const getLeaderBoardData = useCallback(async (): Promise<LeaderBoardRow[]> => {
    return GameApiClient.leaderBoard();
  }, []);

  const getUserAliasData = useCallback(
    async (userIds: number[]): Promise<User[]> => {
      return ChallengesApiClient.getUsers(userIds);
    },
    []
  );

  const refreshLeaderBoard = useCallback(async () => {
    try {
      const lbData = await getLeaderBoardData();
      const userIds = lbData.map((row) => row.userId);

      if (userIds.length > 0) {
        try {
          const data = await getUserAliasData(userIds);
          const userMap = new Map<number, string>();
          data.forEach((idAlias) => {
            userMap.set(idAlias.id, idAlias.alias);
          });
          lbData.forEach((row) => {
            row.alias = userMap.get(row.userId);
          });
          setLeaderboard(lbData);
          setServerError(false);
        } catch (reason) {
          console.log('Error mapping user ids', reason);
          setLeaderboard(lbData);
        }
      }
    } catch (reason) {
      setServerError(true);
      console.log('Gamification server error', reason);
    }
  }, [getLeaderBoardData, getUserAliasData]);

  useEffect(() => {
    refreshLeaderBoard();
    const intervalId = setInterval(refreshLeaderBoard, 5000);

    return () => clearInterval(intervalId);
  }, [refreshLeaderBoard]);

  if (serverError) {
    return (
      <div>
        We&apos;re sorry, but we can&apos;t display game statistics at this
        moment.
      </div>
    );
  }

  return (
    <div>
      <h3>Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Badges</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((row) => (
            <tr key={row.userId}>
              <td>{row.alias ? row.alias : row.userId}</td>
              <td>{row.totalScore}</td>
              <td>
                {row.badges.map((b) => (
                  <span className="badge" key={b}>
                    {b}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
