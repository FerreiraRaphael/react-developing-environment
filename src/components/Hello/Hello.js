import React from 'react';
import Proptypes from 'prop-types';

const Hello = props => <h1>Hello afffffffffffeeeeeeeeeeeeeeeeeee {props.name}</h1>;

Hello.propTypes = {
  name: Proptypes.string.isRequired,
};

export default Hello;
