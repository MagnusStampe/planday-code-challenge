import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Item from './../Item/Item';

// Styles
import styles from './ItemsShowcase.module.css';

export default class ItemsShowcase extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.object
            )
        ),
    };

    state = {
        currentPageIndex: 0
    };

    selectPage = index => {
        this.setState({
            currentPageIndex: index
        });
        window.scrollTo(0, 0);
    }

    getPaginationButtonClasses = index => {
        return classnames(
            styles.paginationButton,
            index === this.state.currentPageIndex && styles.selected
        );
    }

    render() {
        const {
            props: {
                items
            },
            state: {
                currentPageIndex
            },
            selectPage,
            getPaginationButtonClasses
        } = this;

        return (
            <div className={styles.container}>
                {items[currentPageIndex] ? (
                    items[currentPageIndex].map((item, index) => <Item key={'item' + index} {...item} />)
                ):(
                    <p>No results found</p>
                )}
                {items[1] && (
                    <div className={styles.pagination}>
                        {items.map((item, index) => (
                            <button
                                key={'page' + index}
                                className={getPaginationButtonClasses(index)}
                                onClick={() => selectPage(index)}
                                >{index + 1}</button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
