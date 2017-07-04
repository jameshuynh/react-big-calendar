import React from 'react';
import BigCalendar from 'react-big-calendar';

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events='http://localhost:3001/events'
        views={['month', 'week', 'day']}
        formats={{
          monthHeaderFormat: 'MMMM yyyy'
        }}
        messages= {{
          previous: '<',
          next: '>'
        }}
        defaultDate={new Date(2015, 3, 1)}
      />

    )
  }
})

export default Basic;
