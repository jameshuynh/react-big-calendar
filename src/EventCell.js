import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { accessor as get } from './utils/accessors';

let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isInsidePopup: PropTypes.bool,
  eventPropGetter: PropTypes.func,
  titleAccessor: accessor,
  allDayAccessor: accessor,
  startAccessor: accessor,
  extraClassAccessor: accessor,
  endAccessor: accessor,

  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  onSelect: PropTypes.func
}

class EventCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
        className
      , event
      , selected
      , eventPropGetter
      , startAccessor, endAccessor, titleAccessor, extraClassAccessor
      , slotStart
      , slotEnd
      , eventComponent: Event
      , eventWrapperComponent: EventWrapper
      , ...props } = this.props;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)
      , extraClassName = get(event, extraClassAccessor)
      , isAllDay = get(event, props.allDayAccessor)
      , continuesPrior = dates.lt(start, slotStart, 'day')
      , continuesAfter = dates.gt(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    return (
      <EventWrapper event={event}>
        <div
          style={{...props.style, ...style}}
          className={cn('rbc-event', className, xClassName, extraClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          })}
          data-tip
          data-event='none'
          id={`event_block_for_${event.id}`}
          data-for={`event_${event.id}`}
          onClick={(e) => this.onSelectEvent(event, e)}>
          <div
            className='rbc-event-content' title={title}>
            { Event
              ? <Event event={event} title={title}/>
              : title
            }
          </div>
        </div>
      </EventWrapper>
    );
  }

  onSelectEvent(event, e) {
    let {
      onSelect
    } = this.props;

    onSelect(event, e, this.props.isInsidePopup);
  }
}

EventCell.propTypes = propTypes;
EventCell.defaultProps = {
  isInsidePopup: false
};

export default EventCell
