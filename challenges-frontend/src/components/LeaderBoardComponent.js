import { useState, useEffect, useCallback } from 'react';
import GameApiClient from '../services/GameApiClient';
import ChallengesApiClient from '../services/ChallengeApiClient';

function LeaderBoardComponent() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [serverError, setServerError] = useState(false);

  const getLeaderBoardData = useCallback(() => {
    return GameApiClient.leaderBoard().then(
      lbRes => {
        if (lbRes.ok) {
          return lbRes.json();
        } else {
          return Promise.reject("Gamification: error response");
        }
      }
    );
  }, []);

  const getUserAliasData = useCallback((userIds) => {
    return ChallengesApiClient.getUsers(userIds).then(
      usRes => {
        if (usRes.ok) {
          return usRes.json();
        } else {
          return Promise.reject("Multiplication: error response");
        }
      }
    );
  }, []);

  const refreshLeaderBoard = useCallback(() => {
    getLeaderBoardData().then(
      lbData => {
        let userIds = lbData.map(row => row.userId);
        if (userIds.length > 0) {
          getUserAliasData(userIds).then(data => {
            // build a map of id -> alias
            let userMap = new Map();
            data.forEach(idAlias => {
              userMap.set(idAlias.id, idAlias.alias);
            });
            // add a property to existing lb data
            lbData.forEach(row =>
              row['alias'] = userMap.get(row.userId)
            );
            setLeaderboard(lbData);
            setServerError(false);
          }).catch(reason => {
            console.log('Error mapping user ids', reason);
            setLeaderboard(lbData);
          });
        }
      }
    ).catch(reason => {
      setServerError(true);
      console.log('Gamification server error', reason);
    });
  }, [getLeaderBoardData, getUserAliasData]);

  useEffect(() => {
    refreshLeaderBoard();
    const intervalId = setInterval(refreshLeaderBoard, 5000);

    // Cleanup function - fixes memory leak
    return () => clearInterval(intervalId);
  }, [refreshLeaderBoard]);

  if (serverError) {
    return (
      <div>We're sorry, but we can't display game statistics at this
        moment.</div>
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
          {leaderboard.map(row => <tr key={row.userId}>
            <td>{row.alias ? row.alias : row.userId}</td>
            <td>{row.totalScore}</td>
            <td>{row.badges.map(
              b => <span className="badge" key={b}>{b}</span>)}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoardComponent;