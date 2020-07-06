import React, { useState, useEffect, Fragment } from "react";
import {
  useParams
} from "react-router-dom";
import axios from "axios";

const endpoints = {
  polls: "/polls"
};

function usePoll(initChoices) {
  const [state, setState] = useState(initChoices);

  function setChoices(choices) {
    setState(choices);
  }

  return [state, setChoices];
}

function useTotalOf(choices) {
  const [state, setState] = useState(0);

  useEffect(
    () => {
      let getTotal = choices.reduce((prev, curr) => {
        return prev + curr.votes;
      }, 0);
      setState(getTotal);
    },
    [choices]
  );

  return state;
}

function Poll() {
  let { id } = useParams();  
  const [poll, setPoll] = useState();
  const [voted, setVoted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [choices, setChoices] = usePoll([]);
  const votes = useTotalOf(choices);
  const [url] = useState(`${process.env.REACT_APP_BACKEND}${endpoints.polls}/${id}`);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(url);
        const poll = result.data
        poll.choices.forEach((choice) => choice.classes = ['choice'])
        
        setPoll(poll);
        setChoices(poll.choices)
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsError(true);
      }
    };
    fetchData();
  }, [url]);

  const vote = async (choice) => {
    poll.choices.forEach(c => {
      if (c._id == choice._id) {
        c.voted = true
      }      
    } )
    try {
        const url = process.env.REACT_APP_BACKEND + endpoints.polls + "/" + poll._id + "/vote"
        const result = await axios({
            method: 'post',
            url: url,
            data: poll
          });
        const updatedPoll = result.data;
        updatedPoll.choices.forEach((choice) => choice.classes = ['choice'])
        setPoll(updatedPoll);
        let votedChoice = updatedPoll.choices.map(c => {
          if (c._id === choice._id) {
            return { ...c, classes: [...c.classes, "active"] };
          }
          return c;
        });
        setChoices(votedChoice);
        setVoted(true);
    } catch (error) {
        console.log("error", error);
        setIsError(true);
        throw (error)
    }
  }

  return (
    <Fragment>
      {isLoading ? (
        <div className="pollTitle">Loading Poll ...</div>
      ) : (
          <div className="pool">
            <div className="pollTitle">{poll.title}</div>
            <div className="pollChoices">
              {choices.map((choice, i) => {
                let percentage = Math.round((choice.votes / votes) * 100);
                let classNames = choice.classes.join(" ");
                return (
                  <button
                    type="button"
                    className={classNames}
                    onClick={() => vote(choice)}
                    disabled={voted}
                    key={i}
                  >
                    <p>{choice.text}</p>
                    {voted && <p>{percentage}%</p>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </Fragment>
  );
}
export default Poll;
