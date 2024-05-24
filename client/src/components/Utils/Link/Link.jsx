import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Link.module.scss';

const Link = React.forwardRef(({ children, target, rel, className, ...rest }, ref) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
    <a ref={ref} target={target} rel={rel} className={classNames(styles.link, className)} {...rest}>
      {children}
    </a>
  );
});

Link.propTypes = {
  children: PropTypes.node,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
};

Link.defaultProps = {
  children: undefined,
  target: '_blank',
  rel: 'noreferrer noopener',
  className: undefined,
};

export default React.memo(Link);
