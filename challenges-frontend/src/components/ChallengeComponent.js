import { useState, useEffect } from "react";
import ChallengeApiClient from "../services/ChallengeApiClient";
import LastAttemptsComponent from "./LastAttemptsComponent";
import LeaderBoardComponent from "./LeaderBoardComponent";

function ChallengeComponent() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [message, setMessage] = useState('');
  const [lastAttempts, setLastAttempts] = useState([]);
  const [formData, setFormData] = useState({ user: '', guess: 0 });

  useEffect(() => {
    refreshChallenge();
  }, []);

  const refreshChallenge = () => {
    ChallengeApiClient.challenge().then(
      res => {
        if (res.ok) {
          res.json().then(json => {
            setA(json.factorA);
            setB(json.factorB);
          });
        } else {
          setMessage("Can't reach the server");
        }
      }
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitResult = (event) => {
    event.preventDefault();
    ChallengeApiClient.sendGuess(formData.user, a, b, formData.guess)
      .then(res => {
        if (res.ok) {
          res.json().then(json => {
            if (json.correct) {
              setMessage("Congratulations! Your guess is correct");
            } else {
              setMessage("Oops! Your guess " + json.resultAttempt +
                " is wrong, but keep playing!");
            }
            updateLastAttempts(formData.user);
            refreshChallenge();
          });
        } else {
          setMessage("Error: server error or not available");
        }
      })
      .catch(error => {
        setMessage("Error: " + error.message);
      });
  };

  const updateLastAttempts = (alias) => {
    ChallengeApiClient.getAttempts(alias).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setLastAttempts(data);
        });
      }
    });
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
          <input id="alias" type="text" maxLength="12"
                 name="user"
                 value={formData.user}
                 onChange={handleChange} />
        </div>
        <div className="form-container">
          <label htmlFor="guess">Your guess:</label>
          <input id="guess" type="number" min="0"
                 name="guess"
                 value={formData.guess}
                 onChange={handleChange} />
        </div>
        <div className="form-container">
          <input id="guess" className="input-group submit-button" type="submit" value="Submit" />
        </div>
      </form>
      <h4>{message}</h4>
      {lastAttempts.length > 0 &&
        <LastAttemptsComponent lastAttempts={lastAttempts} />
      }
      <LeaderBoardComponent />
    </div>
  );
}

export default ChallengeComponent;
