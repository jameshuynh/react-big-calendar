import React from 'react';
import BigCalendar from 'react-big-calendar';

let Basic = React.createClass({
  render() {
    return (
      <BigCalendar
        {...this.props}
        events='http://localhost:3001/events'
        views={['month', 'week', 'day']}
        formats={{
          monthHeaderFormat: 'MMMM yyyy'
        }}
        eventTooltipContentDelegate={(event) => this.outputTooltip(event)}
        messages= {{
          previous: '<',
          next: '>'
        }}
        defaultDate={new Date(2015, 3, 1)}
      />
    );
  },

  outputTooltip(event) {
    return (
      <div className='rbc-tooltip'>
        { event.title }
        <br/>
        { event.title }
        <br/>
        <a href='http://google.com' target='_blank'>Google</a>
      </div>
    );
  }
})

export default Basic;
