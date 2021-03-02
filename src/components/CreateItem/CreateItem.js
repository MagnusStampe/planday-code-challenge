import React, { Component } from 'react';

// Styles
import styles from './CreateItem.module.css';

export default class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        imageUrl: '',
        collapsed: true
    };

    handleSubmit = event => {
        const {
            props: {
                createItem
            },
            state: {
                title,
                description,
                imageUrl
            }
        } = this;

        event.preventDefault();
        createItem({
            title: title,
            description: description,
            imagePath: imageUrl
        });

        this.setState({
            title: '',
            description: '',
            imageUrl: '',
            collapsed: true
        });
    }

    render() {
        const {
            state: {
                title,
                description,
                imageUrl,
                collapsed
            },
            handleSubmit
        } = this;

        return (
            <div className={styles.container}>
                <button
                    className={styles.collapseButton}
                    onClick={() => this.setState({collapsed: !collapsed})}>
                    Create new item {collapsed ? '+': '-'}
                </button>
                <form className={collapsed && styles.collapsed} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        onChange={event => this.setState({
                            title: event.target.value
                        })}
                        value={title}
                        placeholder="Title"
                        type="text" />
                    <input
                        className={styles.input}
                        onChange={event => this.setState({
                            description: event.target.value
                        })}
                        value={description}
                        placeholder="Description"
                        type="text" />
                    <input
                        className={styles.input}
                        onChange={event => this.setState({
                            imageUrl: event.target.value
                        })}
                        value={imageUrl}
                        placeholder="Image URL"
                        type="text" />
                    <button className={styles.submitButton} type="submit">Create</button>
                </form>
            </div>
        );
    }
}
