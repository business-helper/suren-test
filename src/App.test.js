import React from 'react';
// import { render } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from './App';

describe('<App Component />', () => {
  const renderedComponent = shallow(<App />);
  it('should render a <App /> tag', () => {
      expect(renderedComponent.instance());
  })

  it('should have Apollo Provider', () => {
    expect(renderedComponent.find('TestPage')).toHaveLength(1);
  })
})