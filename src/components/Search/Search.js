import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Search.module.css';

export default class Search extends Component {
    static propTypes = {
        allItems: PropTypes.arrayOf(
            PropTypes.object
        ),
        setDisplayedItems: PropTypes.func
    };

    state = {
        searchQuery: '',
        itemCount: 0,
        changeTimeout: null
    };

    componentDidUpdate() {
        const {
            props: {
                allItems
            },
            state: {
                itemCount
            },
            findResults
        } = this;

        if(itemCount !== allItems.length) {
            this.setState({
                itemCount: allItems.length
            });
            findResults();
        }
    }

    findResults = () => {
        const {
            props: {
                allItems
            },
            state: {
                searchQuery
            }
        } = this;

        const newItems = allItems.filter(item => {
            const title = item.title.toLowerCase();
            const description = item.description.toLowerCase();
            const query = searchQuery.toLowerCase();

            if(title.includes(query) || description.includes(query)) {
                return true;
            }

            return false;
        });

        this.props.setDisplayedItems(newItems);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.findResults();
    }

    handleInputChange = event => {
        clearTimeout(this.state.changeTimeout);

        this.setState({
            searchQuery: event.target.value,
            changeTimeout: setTimeout(()=> {
                this.findResults();
            }, 500)
        });
    }

    render() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <input className={styles.input} type="text" placeholder="Search..." onChange={this.handleInputChange} />
                <button className={styles.submitButton} type="submit">Search</button>
            </form>
        );
    };
}
