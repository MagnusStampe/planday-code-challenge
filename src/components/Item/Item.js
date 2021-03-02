import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Item.module.css';

export default class Item extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        imagePath: PropTypes.string
    };

    render() {
        const {
            title,
            description,
            imagePath
        } = this.props;
        
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <img className={styles.image} src={imagePath} alt={title} />
            </div>
        );
    }
}
