'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes3 = require('./utils/propTypes');

var _helpers = require('./utils/helpers');

var _constants = require('./utils/constants');

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

var _viewLabel = require('./utils/viewLabel');

var _viewLabel2 = _interopRequireDefault(_viewLabel);

var _move = require('./utils/move');

var _move2 = _interopRequireDefault(_move);

var _Views = require('./Views');

var _Views2 = _interopRequireDefault(_Views);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _EventWrapper = require('./EventWrapper');

var _EventWrapper2 = _interopRequireDefault(_EventWrapper);

var _BackgroundWrapper = require('./BackgroundWrapper');

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _transform = require('lodash/transform');

var _transform2 = _interopRequireDefault(_transform);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function viewNames(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

function isValidView(view, _ref) {
  var _views = _ref.views;

  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}

var now = new Date();

/**
 * react-big-calendar is full featured Calendar component for managing events
 * and dates. It uses
 * modern `flexbox` for layout making it super responsive and performant.
 * Leaving most of the layout heavy lifting
 * to the browser. __note:__ The default styles use `height: 100%`
 * which means your container must set an explicit
 * height (feel free to adjust the styles to suit your specific needs).
 *
 * Big Calendar is unopiniated about editing and moving events,
 * prefering to let you implement it in a way that makes
 * the most sense to your app. It also tries not to be prescriptive about
 * your event data structures, just tell it
 * how to find the start and end datetimes and you can pass it
 * whatever you want.
 *
 * One thing to note is that, `react-big-calendar` treats
 * event start/end dates as an _exclusive_ range.
 * which means that the event spans up to, but not including, the end date.
 * In the case
 * of displaying events on whole days, end dates are rounded _up_
 * to the next day. So an
 * event ending on `Apr 8th 12:00:00 am` will not appear on
 * the 8th, whereas one ending
 * on `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges
 * consider providing a
 * function `endAccessor` that returns the end date + 1 day
 * for those events that end at midnight.
 */
var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getViews = function () {
      var views = _this.props.views;

      if (Array.isArray(views)) {
        return (0, _transform2.default)(views, function (obj, name) {
          return obj[name] = _Views2.default[name];
        }, {});
      }

      if ((typeof views === 'undefined' ? 'undefined' : _typeof(views)) === 'object') {
        return (0, _mapValues2.default)(views, function (value, key) {
          if (value === true) {
            return _Views2.default[key];
          }

          return value;
        });
      }

      return _Views2.default;
    };

    _this.getView = function () {
      var views = _this.getViews();

      return views[_this.props.view];
    };

    _this.getDrilldownView = function (date) {
      var _this$props = _this.props,
          view = _this$props.view,
          drilldownView = _this$props.drilldownView,
          getDrilldownView = _this$props.getDrilldownView;


      if (!getDrilldownView) return drilldownView;

      return getDrilldownView(date, view, Object.keys(_this.getViews()));
    };

    _this.handleNavigate = function (action, newDate) {
      var _this$props2 = _this.props,
          view = _this$props2.view,
          date = _this$props2.date,
          onNavigate = _this$props2.onNavigate;

      var ViewComponent = _this.getView();

      date = (0, _move2.default)(action, newDate || date, ViewComponent);
      onNavigate(date, view, action);

      _this.loadCurrentEvents(date);
    };

    _this.handleViewChange = function (view) {
      if (view !== _this.props.view && isValidView(view, _this.props)) _this.props.onView(view);
    };

    _this.handleSelectEvent = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.setState({
        selectedEvent: null
      }, function () {
        _this.setState({
          selectedEvent: args[0]
        }, function () {
          setTimeout(function () {
            var isInsidePopup = args[2];
            if (isInsidePopup === true) {
              var overlay = document.getElementsByClassName('rbc-overlay')[0];
              var el = overlay.querySelector('#event_block_for_' + args[0].id);
              _reactTooltip2.default.show(el);
            } else {
              _reactTooltip2.default.show(document.getElementById('event_block_for_' + args[0].id));
            }
          }, 100);
        });
      });

      (0, _helpers.notify)(_this.props.onSelectEvent, args);
    };

    _this.handleEventTooltipContentDelegate = function () {
      if (_this.props.eventTooltipContentDelegate) {
        var _this$props3;

        return (_this$props3 = _this.props).eventTooltipContentDelegate.apply(_this$props3, arguments);
      } else {
        return null;
      }
    };

    _this.handleSelectSlot = function (slotInfo) {
      (0, _helpers.notify)(_this.props.onSelectSlot, slotInfo);
    };

    _this.handleDrillDown = function (date, view) {
      if (view) _this.handleViewChange(view);

      _this.handleNavigate(_constants.navigate.DATE, date);
    };

    if (props.events.constructor === Array) {
      _this.state = {
        events: props.events
      };
    } else {
      _this.state = {
        events: []
      };
    }

    _this.state.isShowingTooltip = false;
    return _this;
  }

  Calendar.prototype.componentWillMount = function componentWillMount() {
    this.loadCurrentEvents(this.props.date);
  };

  Calendar.prototype.loadCurrentEvents = function loadCurrentEvents(date) {
    var _this2 = this;

    if (typeof this.props.events === 'string') {
      var agent = this.props.superagent || _superagent2.default;
      var firstVisibleDate = _dates2.default.firstVisibleDay(date, this.props.culture);
      var lastVisibleDate = _dates2.default.lastVisibleDay(date, this.props.culture);

      agent.get(this.props.events).query({
        from: _dates2.default.stringFromDate(firstVisibleDate),
        to: _dates2.default.stringFromDate(lastVisibleDate)
      }).end(function (err, resp) {
        if (!err) {
          var events = resp.body.map(function (ev) {
            ev.start = _dates2.default.toDateFromString(ev.start);
            ev.end = _dates2.default.toDateFromString(ev.end);
            return ev;
          });

          _this2.setState({
            events: events
          });
        } //end if
      });
    }
  };

  Calendar.prototype.render = function render() {
    var _props = this.props,
        view = _props.view,
        toolbar = _props.toolbar,
        culture = _props.culture,
        _props$components = _props.components,
        components = _props$components === undefined ? {} : _props$components,
        _props$formats = _props.formats,
        formats = _props$formats === undefined ? {} : _props$formats,
        style = _props.style,
        className = _props.className,
        elementProps = _props.elementProps,
        current = _props.date,
        props = _objectWithoutProperties(_props, ['view', 'toolbar', 'culture', 'components', 'formats', 'style', 'className', 'elementProps', 'date']);

    formats = (0, _formats2.default)(formats);

    var View = this.getView();
    var names = viewNames(this.props.views);

    var viewComponents = (0, _defaults2.default)(components[view] || {}, (0, _omit2.default)(components, names), {
      eventWrapper: _EventWrapper2.default,
      dayWrapper: _BackgroundWrapper2.default,
      dateCellWrapper: _BackgroundWrapper2.default
    });

    var ToolbarToRender = components.toolbar || _Toolbar2.default;

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        className: (0, _classnames2.default)('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        }),
        style: style
      }),
      toolbar && _react2.default.createElement(ToolbarToRender, {
        date: current,
        view: view,
        views: names,
        label: (0, _viewLabel2.default)(current, view, formats, culture),
        onViewChange: this.handleViewChange,
        onNavigate: this.handleNavigate,
        messages: this.props.messages
      }),
      _react2.default.createElement(View, _extends({
        ref: 'view'
      }, props, formats, {
        culture: culture,
        formats: undefined,
        events: this.state.events,
        isShowingTooltip: this.state.isShowingTooltip,
        date: current,
        components: viewComponents,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore: this._showMore
      })),
      this.renderTooltip()
    );
  };

  Calendar.prototype.renderTooltip = function renderTooltip() {
    if (this.state.selectedEvent) {
      return _react2.default.createElement(
        _reactTooltip2.default,
        {
          globalEventOff: 'click',
          place: 'right',
          type: 'light',
          effect: 'solid',
          id: 'event_' + this.state.selectedEvent.id },
        this.handleEventTooltipContentDelegate(this.state.selectedEvent)
      );
    } else {
      return null;
    }
  };

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {

  /**
   * Props passed to main calendar `<div>`.
   */
  elementProps: _propTypes2.default.object,

  /**
   * The current date value of the calendar. Determines the visible view range
   *
   * @controllable onNavigate
   */
  date: _propTypes2.default.instanceOf(Date),

  /**
   * The current view of the calendar.
   *
   * @default 'month'
   * @controllable onView
   */
  view: _propTypes2.default.string,

  /**
   * An array of event objects to display on the calendar
   * If supplied a string, it will call the API to get the data from
   * the server
   */
  events: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.object)]),

  /**
   * Superagent object passed from outside
   */
  superagent: _propTypes2.default.object,

  /**
   * Callback fired when the `date` value changes.
   *
   * @controllable date
   */
  onNavigate: _propTypes2.default.func,

  /**
   * Callback fired when the `view` value changes.
   *
   * @controllable date
   */
  onView: _propTypes2.default.func,

  /**
   * A callback fired when a date selection is made.
   * Only fires when `selectable` is `true`.
   *
   * ```js
   * (
   *   slotInfo: {
   *     start: Date,
   *     end: Date,
   *     slots: Array<Date>,
   *     action: "select" | "click"
   *   }
   * ) => any
   * ```
   */
  onSelectSlot: _propTypes2.default.func,

  /**
   * Callback fired when a calendar event is selected.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => any
   * ```
   *
   * @controllable selected
   */
  onSelectEvent: _propTypes2.default.func,

  /**
   * Callback fired when a calendar event is selected.
   *
   * ```js
   * (event: Object, e: SyntheticEvent) => any
   * ```
   *
   * @controllable selected
   */
  eventTooltipContentDelegate: _propTypes2.default.func,

  /**
   * Callback fired when dragging a selection in the Time views.
   *
   * Returning `false` from the handler will prevent a selection.
   *
   * ```js
   * (range: { start: Date, end: Date }) => ?boolean
   * ```
   */
  onSelecting: _propTypes2.default.func,
  /**
   * The selected event, if any.
   */
  selected: _propTypes2.default.object,

  /**
   * An array of built-in view names to allow the calendar to display.
   *
   * @type Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
   * @default ['month', 'week', 'day', 'agenda']
   */
  views: _propTypes3.views,

  /**
   * The string name of the destination view for drill-down actions, such
   * as clicking a date header, or the truncated events links. If
   * `getDrilldownView` is also specified it will be used instead.
   *
   * Set to `null` to disable drill-down actions.
   *
   * ```js
   * <BigCalendar
   *   drilldownView="agenda"
   * />
   * ```
   */
  drilldownView: _propTypes2.default.string,

  /**
   * Functionally equivalent to `drilldownView`, but accepts a function
   * that can return a view name. It's useful for customizing the drill-down
   * actions depending on the target date and triggering view.
   *
   * Return `null` to disable drill-down actions.
   *
   * ```js
   * <BigCalendar
   *   getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>
   *     if (currentViewName === 'month' &&
   *     configuredViewNames.includes('week'))
   *       return 'week'
   *
   *     return null;
   *   }}
   * />
   * ```
   */
  getDrilldownView: _propTypes2.default.func,

  /**
   * Determines whether the toolbar is displayed
   */
  toolbar: _propTypes2.default.bool,

  /**
   * Show truncated events in an overlay when you click the "+_x_ more" link.
   */
  popup: _propTypes2.default.bool,

  /**
   * Distance in pixels, from the edges of the viewport,
   * the "show more" overlay should be positioned.
   *
   * ```js
   * <BigCalendar popupOffset={30}/>
   * <BigCalendar popupOffset={{x: 30, y: 20}}/>
   * ```
   */
  popupOffset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({ x: _propTypes2.default.number, y: _propTypes2.default.number })]),
  /**
   * Allows mouse selection of ranges of dates/times.
   *
   * The 'ignoreEvents' option prevents selection code from running when a
   * drag begins over an event. Useful when you want custom event click or drag
   * logic
   */
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),

  /**
   * Determines the selectable time increments in week and day views
   */
  step: _propTypes2.default.number,

  /**
   * The number of slots per "section" in the time grid views.
   * Adjust with `step`
   * to change the default of 1 hour long groups, with 30 minute slots.
   */
  timeslots: _propTypes2.default.number,

  /**
   *Switch the calendar to a `right-to-left` read direction.
   */
  rtl: _propTypes2.default.bool,

  /**
   * Optionally provide a function that returns an object
   * of className or style props
   * to be applied to the the event node.
   *
   * ```js
   * (
   *   event: Object,
   *   start: Date,
   *   end: Date,
   *   isSelected: boolean
   * ) => { className?: string, style?: Object }
   * ```
   */
  eventPropGetter: _propTypes2.default.func,

  /**
   * Accessor for the event title, used to display event information. Should
   * resolve to a `renderable` value.
   *
   * ```js
   * string | (event: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  titleAccessor: _propTypes3.accessor,

  /**
   * Accessor for the event title, used to display event information. Should
   * resolve to a `renderable` value.
   *
   * ```js
   * string | (event: Object) => any
   * ```
   *
   * @type {(func|string)}
   */
  extraClassAccessor: _propTypes3.accessor,

  /**
   * Determines whether the event should be considered an "all day"
   * event and ignore time.
   * Must resolve to a `boolean` value.
   *
   * ```js
   * string | (event: Object) => boolean
   * ```
   *
   * @type {(func|string)}
   */
  allDayAccessor: _propTypes3.accessor,

  /**
   * The start date/time of the event.
   * Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  startAccessor: _propTypes3.accessor,

  /**
   * The end date/time of the event.
   * Must resolve to a JavaScript `Date` object.
   *
   * ```js
   * string | (event: Object) => Date
   * ```
   *
   * @type {(func|string)}
   */
  endAccessor: _propTypes3.accessor,

  /**
   * Constrains the minimum _time_ of the Day and Week views.
   */
  min: _propTypes2.default.instanceOf(Date),

  /**
   * Constrains the maximum _time_ of the Day and Week views.
   */
  max: _propTypes2.default.instanceOf(Date),

  /**
   * Determines how far down the scroll pane is initially scrolled down.
   */
  scrollToTime: _propTypes2.default.instanceOf(Date),

  /**
   * Specify a specific culture code for the Calendar.
   *
   * **Note: it's generally better to handle this globally
   * via your i18n library.**
   */
  culture: _propTypes2.default.string,

  /**
   * Localizer specific formats, tell the Calendar
   * how to format and display dates.
   *
   * `format` types are dependent on the configured localizer;
   * both Moment and Globalize
   * accept strings of tokens according to their
   * own specification, such as: `'DD mm yyyy'`.
   *
   * ```jsx
   * let formats = {
   *   dateFormat: 'dd',
   *
   *   dayFormat: (date, culture, localizer) =>
   *     localizer.format(date, 'DDD', culture),
   *
   *   dayRangeHeaderFormat: ({ start, end }, culture, local) =>
   *     local.format(start, { date: 'short' }, culture) + ' — ' +
   *     local.format(end, { date: 'short' }, culture)
   * }
   *
   * <Calendar formats={formats} />
   * ```
   *
   * All localizers accept a function of
   * the form `(date: Date, culture: ?string, localizer: Localizer) -> string`
   */
  formats: _propTypes2.default.shape({
    /**
     * Format for the day of the month heading in the Month view.
     * e.g. "01", "02", "03", etc
     */
    dateFormat: _propTypes3.dateFormat,

    /**
     * A day of the week format for Week and Day headings,
     * e.g. "Wed 01/04"
     *
     */
    dayFormat: _propTypes3.dateFormat,

    /**
     * Week day name format for the Month week day headings,
     * e.g: "Sun", "Mon", "Tue", etc
     *
     */
    weekdayFormat: _propTypes3.dateFormat,

    /**
     * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
     */
    timeGutterFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Month view, e.g "2015 April"
     *
     */
    monthHeaderFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
     */
    dayRangeHeaderFormat: _propTypes3.dateRangeFormat,

    /**
     * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
     */
    dayHeaderFormat: _propTypes3.dateFormat,

    /**
     * Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"
     */
    agendaHeaderFormat: _propTypes3.dateFormat,

    /**
     * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
     */
    selectRangeFormat: _propTypes3.dateRangeFormat,

    agendaDateFormat: _propTypes3.dateFormat,
    agendaTimeFormat: _propTypes3.dateFormat,
    agendaTimeRangeFormat: _propTypes3.dateRangeFormat,

    /**
     * Time range displayed on events.
     */
    eventTimeRangeFormat: _propTypes3.dateRangeFormat
  }),

  /**
   * Customize how different sections of the calendar
   * render by providing custom Components.
   * In particular the `Event` component can be specified
   * for the entire calendar, or you can
   * provide an individual component for each view type.
   *
   * ```jsx
   * let components = {
   *   event: MyEvent, // used by each view (Month, Day, Week)
   *   toolbar: MyToolbar,
   *   agenda: {
   *      event: MyAgendaEvent // with the agenda view use a different
   *      component to render events
   *   }
   * }
   * <Calendar components={components} />
   * ```
   */
  components: _propTypes2.default.shape({
    event: _propTypes3.elementType,
    eventWrapper: _propTypes3.elementType,
    dayWrapper: _propTypes3.elementType,
    dateCellWrapper: _propTypes3.elementType,

    toolbar: _propTypes3.elementType,

    agenda: _propTypes2.default.shape({
      date: _propTypes3.elementType,
      time: _propTypes3.elementType,
      event: _propTypes3.elementType
    }),

    day: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      event: _propTypes3.elementType
    }),
    week: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      event: _propTypes3.elementType
    }),
    month: _propTypes2.default.shape({
      header: _propTypes3.elementType,
      dateHeader: _propTypes3.elementType,
      event: _propTypes3.elementType
    })
  }),

  /**
   * String messages used throughout the component,
   * override to provide localizations
   */
  messages: _propTypes2.default.shape({
    allDay: _propTypes2.default.node,
    previous: _propTypes2.default.node,
    next: _propTypes2.default.node,
    today: _propTypes2.default.node,
    month: _propTypes2.default.node,
    week: _propTypes2.default.node,
    day: _propTypes2.default.node,
    agenda: _propTypes2.default.node,
    showMore: _propTypes2.default.func
  })
};
Calendar.defaultProps = {
  elementProps: {},
  popup: true,
  toolbar: true,
  view: _constants.views.MONTH,
  views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY, _constants.views.AGENDA],
  date: now,
  step: 30,

  drilldownView: _constants.views.DAY,

  titleAccessor: 'title',
  allDayAccessor: 'allDay',
  extraClassAccessor: 'extra_class',
  startAccessor: 'start',
  endAccessor: 'end'
};
exports.default = (0, _uncontrollable2.default)(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});