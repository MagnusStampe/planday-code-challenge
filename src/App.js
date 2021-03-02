import React, { Component } from 'react';

// Components
import Search from './components/Search/Search';
import CreateItem from './components/CreateItem/CreateItem';
import ItemsShowcase from './components/ItemsShowcase/ItemsShowcase';

export default class App extends Component {
  state = {
    allItems: [],
    paginatedItems: []
  };
  
  componentDidMount() {
    const allItems = require('./json/data.json');
    this.setState({ 
      allItems
    });
    this.createPaginatedItems(allItems);
  }

  createItem = item => {
    this.setState({
      allItems: [item, ...this.state.allItems]
    });
  }

  createPaginatedItems = items => {
    if(!items[0]) {
      return this.setState({
        paginatedItems: []
      });
    }

    if(!items[1]) {
      return this.setState({
        paginatedItems: [items]
      });
    }

    const itemsPerPage = 15;
    const paginatedItems = items.reduce((accumulatedItems, currentItem, index) => {
      const pageIndex = Math.floor(index / itemsPerPage);

      if(index === 1) {
        accumulatedItems = [[accumulatedItems]];
      }
      
      if(!accumulatedItems[pageIndex]) {
        accumulatedItems.push([]);
      }

      accumulatedItems[pageIndex].push(currentItem);
      return accumulatedItems;
    });

    this.setState({
      paginatedItems
    });
  }

  render() {
    const {
      state: {
        allItems,
        paginatedItems
      },
      createPaginatedItems,
      createItem
    } = this;

    return (
      <main className="App">
        <Search allItems={allItems} setDisplayedItems={createPaginatedItems} />
        <CreateItem createItem={createItem} />
        <ItemsShowcase items={paginatedItems} />
      </main>
    );
  }
}
