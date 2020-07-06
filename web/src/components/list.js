import React, { useState, useEffect, Fragment } from "react";
import {
    useLocation,
    useHistory,
    Link,
} from "react-router-dom";
import axios from "axios";

const endpoints = {
    polls: "/polls"
};

function List() {
    let location = useLocation();
    const history = useHistory();
    // history.push("/polls/random")
    const [polls, setPolls] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [url] = useState(`${process.env.REACT_APP_BACKEND}${endpoints.polls}`);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios.get(url);
                setPolls(result.data);
                setIsLoading(false);
            } catch (error) {
                console.log("error", error);
                setIsError(true);
            }
        };
        fetchData();
    }, [url]);


    return (
        <Fragment>
            {isLoading ? (
                <div className="pollTitle">Loading Polls ...</div>
            ) : (
                    <div className="poolList">
                        {polls.map((poll, i) => {
                            return (
                                <div>
                                    <Link
                                        key={i}
                                        to={{
                                            pathname: `/polls/${poll._id}`,
                                            // This is the trick! This link sets
                                            // the `background` in location state.
                                            state: { background: location }
                                        }}
                                    >
                                        <p>{poll.title}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
        </Fragment>
    );
}
export default List;
