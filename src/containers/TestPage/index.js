import React from 'react';
import ArtBoard from 'components/ArtBoard';
import Header from 'components/Header';
import Slider from 'components/Slider';
import Table from 'components/Table';
import Clam from 'components/Clam';

export default function TestPage(props) {
    return (
        <ArtBoard>
            <Header />
            <Slider />
            <Table />
            <Clam />
        </ArtBoard>
    );
}
