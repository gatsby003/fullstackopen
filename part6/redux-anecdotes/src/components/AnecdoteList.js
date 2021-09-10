import React from "react";
import {connect} from 'react-redux'
import { castVote } from "../reducers/anecdoteReducer";
import {notifyVoteCast} from "../reducers/notifyReducer"

const AnecdoteList = (props) => {



    const vote = (id) => {
        props.castVote(id)
        props.notifyVoteCast(id, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === ''){
        return{anecdotes :  state.anecdotes}
    }
    console.log(state)
    return{anecdotes: 
        state
            .anecdotes
            .filter(
                anecdote => anecdote
                                .content
                                .includes(
                                    state.filter.query))};
}


const mapDispatchToProps = {
    notifyVoteCast,
    castVote
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes