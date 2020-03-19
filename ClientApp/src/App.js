import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import  Items from './components/Item/Items';
import { CreateItem } from './components/Item/CreateItem';
import { UpdateItem } from './components/Item/Update';
import { DeleteItem } from './components/Item/Delete';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/create' component = {CreateItem} />
        <Route path='/items' component = {Items} />        
        <Route path='/update/:id' component = {UpdateItem} />
        <Route path='/delete/:id' component = {DeleteItem} />
      </Layout>
    );
  }
}
