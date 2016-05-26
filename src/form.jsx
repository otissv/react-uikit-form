'use strict';

import React from 'react';
import uikit from '../../react-uikit-base';
import ufunc from 'ufunc';
// import createFragment from 'react-addons-create-fragment';


function getChildren (props) {
  if (props.children && props.layout) {
    if (Array.isArray(props.children)) {
      return  React.Children.map(props.children, child => {
        return {
         ...child,
         props: {
           ...child.props,
           row    : props.layout ? true : null,
           control: props.layout ? true : null
         }
       };
      });
    } else {
      return {
       ...props.children,
       props: {
         ...props.children.props,
         row    : props.layout ? true : null,
         control: props.layout ? true : null
       }
     };
    }
  } else {
    return props.children;
  }
}


const Form = (props) => {
  // CSS classes
  const cssClassNames = uikit.helpers.cleanClasses([
    'uk-form',
    props.layout ? `uk-form-${props.layout}` : null,
    props.classes,
    props.className
  ]);


  // Elements
  const csrfToken = ufunc.maybeIf(<input type='hidden' id='_csrf' value={props.csrf} />);

// console.log(getChildren(props));

  // Return Component
  return <form
    {...props}
    className={cssClassNames}
    data-kitid={props.kitid}
  >
    {csrfToken(props.csrf)}
    {getChildren(props)}
  </form>;
};


Form.propTypes = {
  children  : React.PropTypes.any,
  className : React.PropTypes.string,
  classes   : React.PropTypes.array,
  layout    : React.PropTypes.oneOf(['stacked', 'horizontal']),
  kitid     : React.PropTypes.string,
  items     : React.PropTypes.object,
  csrf      : React.PropTypes.bool
};


export default uikit.base(Form);
