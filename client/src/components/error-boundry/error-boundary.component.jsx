import React from "react";
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    // set error state manually 
    static getDerivedStateFromError(error){
        // process the error
        return {
            hasErrored: true
        }
    }

    // info: which component actually broke
    componentDidCatch(error, info){
        console.log(error);
    }

    render() {
        if (this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText>This Page is Broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;