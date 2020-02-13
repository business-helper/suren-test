import React from 'react'
import { shallow } from 'enzyme'
import TestPage from '../index'

describe('<TestPage />', () => {
    const renderedComponent = shallow(<TestPage />);
    it('should render a <TestPage /> tag', () => {
        expect(renderedComponent.instance());
    })
    it('should have a wrapper', () => {
        expect(renderedComponent.find('ArtBoard')).toHaveLength(1)
    })

    it('should have a header', () => {
        expect(renderedComponent.find('Header')).toHaveLength(1);
    })

    it('should have 3 widgets', () => {
        expect(renderedComponent.find('Table')).toHaveLength(1);
        expect(renderedComponent.find('Slider')).toHaveLength(1);
        expect(renderedComponent.find('Clam')).toHaveLength(1);
    })
})