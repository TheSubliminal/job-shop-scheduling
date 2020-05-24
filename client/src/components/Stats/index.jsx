import React from 'react';

import TimeComplexityDashboard from '../TimeComplexityDashboard';
import JobDurationDashboard from '../JobDurationDashboard';
import NumOfJobsDashboard from '../NumOfJobsDashboard';
import NumOfAntsDashboard from '../NumOfAntsDashboard';

const Stats = () => (
  <>
    <TimeComplexityDashboard />
    <JobDurationDashboard />
    <NumOfJobsDashboard />
    <NumOfAntsDashboard />
  </>
);

export default Stats;