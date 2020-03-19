import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to Inventory Manager</h1>
        <p>Use this manager to manage your inventory to check on your insurance cost</p>
        <ul>
          <li>Add new Item</li>
          <li>Update Item</li>
          <li>Delete Item</li>
          <li>Show all Item</li>
        </ul>
       
       
      </div>
    );
  }
}
