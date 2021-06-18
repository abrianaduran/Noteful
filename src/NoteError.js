import React from 'react'

export default class NoteError extends React.Component {
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display this page.</h2>
            )
        }
        return this.props.children;
    }
} 
