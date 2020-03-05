import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchResume } from '../../actions/resume';

const Resume = ({
  fetchResume,
  resume: { resume, loading }
}) => {
  useEffect(() => {
    fetchResume();
  }, []);

  const renderMe = loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <p>
        Name: { resume.name }<br />
        Title: { resume.title }<br />
        Location: { resume.location }<br />
      </p>
    </>
  );
  return (
    <div>
      <h1>Resume</h1>
      { renderMe }
    </div>
  )
}

Resume.propTypes = {
  fetchResume: PropTypes.func.isRequired,
  resume: PropTypes.object
}

const mapStateToProps = state => ({
  resume: state.resume
});

export default connect(
  mapStateToProps,
  { fetchResume }
)(Resume);