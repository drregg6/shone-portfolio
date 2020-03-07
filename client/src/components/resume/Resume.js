import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Employment from './Employment';

import { connect } from 'react-redux';
import { fetchResume } from '../../actions/resume';
import formatPhone from '../../utils/formatPhone';

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
      <div className="resume-header">
        <h1>{ resume.name }</h1>
        <h2>{ resume.title }</h2>
        <div className="resume-contacts">
          <span className="resume-contact">
            { resume.location }
          </span>
          <span className="resume-contact">
            { formatPhone(resume.phone) }
          </span>
          <span className="resume-contact">
            { resume.email }
          </span>
        </div>
      </div>
      <div className="resume-experience">
        <div className="column-left">
          Experience
        </div>
        <div className="column-right">
          { resume.employment.map(experience => {
            return <Employment experience={experience} />
          }) }
        </div>
      </div>
    </>
  );
  return (
    <div className="resume center">
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