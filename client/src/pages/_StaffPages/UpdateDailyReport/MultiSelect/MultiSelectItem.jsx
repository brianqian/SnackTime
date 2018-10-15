import React, { Component } from 'react';

export default class MultiSelectItem extends Component {
  render() {
    return (
      <div
        value={this.props.value}
        onClick={this.props.selectStudent}
        className={`multi-item ${this.props.selected ? 'selected' : ''}`}
      >
        {this.props.name}
      </div>
    );
  }
}
