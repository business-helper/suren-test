import React, { Component } from 'react';
import ArtBoard from 'components/ArtBoard';
import Header from 'components/Header';
import Slider from 'components/Slider';
import Table from 'components/Table';
import Clam from 'components/Clam';
import constants from 'utils/Constants';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
        let windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        this.setState({ windowWidth, windowHeight });
        console.log(windowWidth, constants.BREAK_XL, constants.BREAK_MD, (this.state.windowWidth < constants.BREAK_LG) && (this.state.windowWidth > constants.BREAK_MD));
    }

    render() {
        return (
            <ArtBoard>
                <Header />
                {
                    ((this.state.windowWidth < constants.BREAK_XL) && (this.state.windowWidth > constants.BREAK_MD)) && (
                        <>
                            <Table />
                            <Slider />
                            <Clam />
                        </>
                    )
                }
                {
                    (this.state.windowWidth > constants.BREAK_XL || this.state.windowWidth < constants.BREAK_MD) && (
                        <>
                            <Slider />
                            <Table />
                            <Clam />
                        </>
                    )
                }
            </ArtBoard>
        );
    }
}
