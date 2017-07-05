import React from 'react';

class EventWrapper extends React.Component {
  render() {
    return (
      <div className='rbc-event-wrapper'>
        { this.props.children }
      </div>
    );
  }
}

export default EventWrapper;
