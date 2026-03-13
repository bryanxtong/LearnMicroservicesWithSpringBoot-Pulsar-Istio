'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import ChallengeApiClient from '@/services/ChallengeApiClient';
import LastAttemptsComponent from './LastAttemptsComponent';
import LeaderBoardComponent from './LeaderBoardComponent';
import type { Challenge, ChallengeAttempt, AttemptResult } from '@/types/domain.types';

export default function ChallengeComponent() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [lastAttempts, setLastAttempts] = useState<ChallengeAttempt[]>([]);
  const [formData, setFormData] = useState({ user: '', guess: 0 });

  useEffect(() => {
    refreshChallenge();
  }, []);

  const refreshChallenge = async () => {
    try {
      const challenge: Challenge = await ChallengeApiClient.challenge();
      setA(challenge.factorA);
      setB(challenge.factorB);
    } catch (error) {
      setMessage("Can't reach the server");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitResult = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result: AttemptResult = await ChallengeApiClient.sendGuess(
        formData.user,
        a,
        b,
        Number(formData.guess)
      );
      if (result.correct) {
        setMessage('Congratulations! Your guess is correct');
      } else {
        setMessage(
          `Oops! Your guess ${result.resultAttempt} is wrong, but keep playing!`
        );
      }
      updateLastAttempts(formData.user);
      refreshChallenge();
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const updateLastAttempts = async (alias: string) => {
    try {
      const attempts: ChallengeAttempt[] = await ChallengeApiClient.getAttempts(alias);
      setLastAttempts(attempts);
    } catch (error) {
      console.error('Error fetching attempts:', error);
    }
  };

  return (
    <div className="display-column">
      <div>
        <h3>Your new challenge is</h3>
        <div className="challenge">
          {a} x {b}
        </div>
      </div>
      <form onSubmit={handleSubmitResult}>
        <div className="form-container">
          <label htmlFor="alias">Your alias:</label>
          <input
            id="alias"
            type="text"
            maxLength={12}
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <div className="form-container">
          <label htmlFor="guess">Your guess:</label>
          <input
            id="guess"
            type="number"
            min="0"
            name="guess"
            value={formData.guess}
            onChange={handleChange}
          />
        </div>
        <div className="form-container">
          <input
            id="submit"
            className="input-group submit-button"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      <h4>{message}</h4>
      {lastAttempts.length > 0 && (
        <LastAttemptsComponent lastAttempts={lastAttempts} />
      )}
      <LeaderBoardComponent />
    </div>
  );
}
