import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import JobTableRow from './JobTableRow';

const InputDataTable = ({ jobs, onAddJob, onChangeJob, onRemoveJob }) => {
  const editable = onAddJob && onChangeJob;

  const onChangeJobProp = (id, propName) => (event) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value) || value < 0) {
      return;
    }

    const jobToUpdate = jobs.find(job => job.id === id);
    const updatedJob = jobToUpdate && { ...jobToUpdate, [propName]: value };

    if (updatedJob) {
      onChangeJob(updatedJob);
    }
  };

  const jobRows = jobs.map((job) => (
    <JobTableRow
      key={job.id}
      job={job}
      onDurationChange={onChangeJobProp(job.id, 'duration')}
      onDeadlineChange={onChangeJobProp(job.id, 'deadline')}
      onRemove={() => onRemoveJob(job.id)}
    />
  ));

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobRows}
        </TableBody>
      </Table>
      {editable && (
        <IconButton aria-label='Add job' onClick={onAddJob}>
          <AddIcon />
        </IconButton>
      )}
    </>
  );
};

const jobPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired
});

InputDataTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  editable: PropTypes.bool,
  onAddJob: PropTypes.func,
  onChangeJob: PropTypes.func,
  onRemoveJob: PropTypes.func
};

export default InputDataTable;