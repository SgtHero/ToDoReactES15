import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks.js';

import Task from './Task.jsx';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDom.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date()
        });

        ReactDom.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        })
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>ToDo Liste ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

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
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    };
}, App);