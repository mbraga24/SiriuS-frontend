import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const InfoCard = ({ 
  icon, 
  label, 
  href,
  className = '' 
}) => {
  return (
    <Button secondary active className={`InfoCard ${className}`}>
      {icon && <Icon name={icon} size="large" />}
      {href ? <a href={href}>{label}</a> : label}
    </Button>
  );
};

export default InfoCard;
