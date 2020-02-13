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
    }

    render() {
        return (
            <ArtBoard>
                <Header />
                <Slider />
                <Table />
                <Clam />
            </ArtBoard>
        );
    }
}
