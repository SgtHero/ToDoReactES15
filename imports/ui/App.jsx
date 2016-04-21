import React, { Component } from 'react';

import Task from './Task.jsx';

export default class App extends Component {
    getTasks() {
        return [
            { _id: 1, text: 'Das ist Task 1'},
            { _id: 2, text: 'Das ist Task 2'},
            { _id: 3, text: 'Das ist Task 3'}
        ];
    }

    renderTasks() {
        return this.getTasks().map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>ToDo Liste</h1>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}