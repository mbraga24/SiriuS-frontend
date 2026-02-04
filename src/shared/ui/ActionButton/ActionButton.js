import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

const ActionButton = ({ 
  icon, 
  label, 
  to, 
  onClick,
  disabled = false,
  className = '',
  size = 'medium',
  variant = 'primary' // primary, secondary, info
}) => {
  const buttonProps = {
    disabled,
    className: `ActionButton ${className}`,
    ...(to && { as: Link, to }),
    ...(onClick && { onClick }),
    ...(variant === 'secondary' && { secondary: true, active: true })
  };

  return (
    <Button {...buttonProps}>
      {icon && <Icon name={icon} size={size === 'large' ? 'large' : undefined} />}
      {label}
    </Button>
  );
};

export default ActionButton;
