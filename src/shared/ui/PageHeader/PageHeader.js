import React from 'react';
import { Header, Icon, Divider } from 'semantic-ui-react';
import './PageHeader.css';

const PageHeader = ({ 
  icon, 
  title, 
  subtitle, 
  className = '',
  showDivider = true 
}) => {
  return (
    <>
      <Header as='h2' className={`PageHeader ${className}`}>
        {icon && <Icon name={icon} />}
        <Header.Content>
          <span className="PageHeader-Title">{title}</span>
          {subtitle && <Header.Subheader>{subtitle}</Header.Subheader>}
        </Header.Content>
      </Header>
      {showDivider && <Divider />}
    </>
  );
};

export default PageHeader;
