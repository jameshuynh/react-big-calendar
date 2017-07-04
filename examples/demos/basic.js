import React from 'react';
import BigCalendar from 'react-big-calendar';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events='http://localhost:3001/events'
        views={allViews}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default Basic;
