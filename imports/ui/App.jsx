import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';


class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDom.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
           text,
           createdAt: new Date()
        });

        ReactDom.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>ToDo Liste</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" ref="textInput" placeholder="Schreiben, um neuen Task hinzuzufügen"/>
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, {sort: { createdAt: -1 } }).fetch()
    };
}, App);