import React from 'react';
import renderer from 'react-test-renderer';

import {SignUpScreen} from '../../../../../src/screens/SignUpScreen';

describe('SignInScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SignUpScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
