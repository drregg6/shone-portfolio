import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchResume } from '../../actions/resume';
import formatPhone from '../../utils/formatPhone';

const Contact = ({
  fetchResume,
  resume: { loading, resume }
}) => {
  useEffect(() => {
    fetchResume();
  }, [loading]);
  let address, phone;

  if (resume) {
    address = resume.address;
    phone = resume.phone;
  }

  const renderAddress = !loading && resume ? (
    <>
      <h2 className="italic">Address</h2>
      <p>
        { address.city }, { address.state }<br />
        { address.zip }
      </p>
    </>
  ) : (
    <h1>Loading</h1>
  )

  const renderPhone = !loading && resume ? (
    <>
      <h2 className="italic">Telephone</h2>
      <p>
        { formatPhone(phone) }
      </p>
    </>
  ) : (
    <></>
  )

  return (
    <div className="contact center">
      <h1>Contact Me</h1>
      <div className="contact-content flex">
        <div className="contact-address">
          { renderAddress }
        </div>
        <div className="contact-phone">
          { renderPhone }
        </div>
      </div>
    </div>
  )
}

Contact.propTypes = {
  fetchResume: PropTypes.func,
  resume: PropTypes.object
}

const mapStateToProps = state => ({
  resume: state.resume
});

export default connect(
  mapStateToProps,
  { fetchResume }
)(Contact);