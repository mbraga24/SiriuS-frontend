import React from 'react';
import { Grid } from 'semantic-ui-react';
import { InfoCard } from '../../../../../shared';

const UserInfo = ({ email, jobTitle, company }) => {
  return (
    <Grid padded columns='1'>
      <Grid.Row>
        <Grid.Column className="Account-Items">
          <InfoCard icon="id badge" label={jobTitle} className="Account-Btn No-Active" />
        </Grid.Column>
        <Grid.Column className="Account-Items">
          <InfoCard icon="travel" label={company} className="Account-Btn No-Active" />
        </Grid.Column>
        <Grid.Column className="Account-Items">
          <InfoCard icon="mail" label={email} className="Account-Btn No-Active" />
        </Grid.Column>
        <Grid.Column className="Account-Items">
          <InfoCard 
            icon="linkify" 
            label="company-site.com" 
            href="http://www.semantic-ui.com" 
            className="Account-Btn Link No-Active" 
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UserInfo;
