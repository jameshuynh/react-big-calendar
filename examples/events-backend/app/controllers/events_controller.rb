class EventsController < ApplicationController
  def index
    from = params[:from]
    to = params[:to]

    render json: [
      {
        id: 1,
        title: 'All Day Event',
        allDay: true,
        start: "#{from} 00:00",
        end: "#{(Date.parse(from) + 1.days).strftime('%Y-%m-%d')} 23:59",
        extra_class: 'confirmed-event'
      },
      {
        id: 2,
        title: 'Half Day Event',
        allDay: false,
        start: "#{from} 12:00",
        end: "#{from} 14:00",
        extra_class: 'canceled-event'
      },
      {
        id: 3,
        title: 'Full Event',
        allDay: false,
        start: "#{from} 14:00",
        end: "#{from} 16:00",
        extra_class: 'full-event'
      },
      {
        id: 4,
        title: 'Full Event 2',
        allDay: false,
        start: "#{from} 16:00",
        end: "#{from} 17:00",
        extra_class: 'full-event'
      },
      {
        id: 5,
        title: 'One Hour Event',
        allDay: false,
        start: "#{from} 17:00",
        end: "#{from} 18:00",
        extra_class: 'confirmed-event'
      },
      {
        id: 6,
        title: 'All Day Event',
        allDay: true,
        start: "#{to} 00:00",
        end: "#{(Date.parse(to) + 1.days).strftime('%Y-%m-%d')} 23:59",
        extra_class: 'confirmed-event'
      },
      {
        id: 7,
        title: 'Half Day Event',
        allDay: false,
        start: "#{to} 12:00",
        end: "#{to} 14:00",
        extra_class: 'canceled-event'
      },
      {
        id: 8,
        title: 'Full Event',
        allDay: false,
        start: "#{to} 14:00",
        end: "#{to} 16:00",
        extra_class: 'full-event'
      },
      {
        id: 9,
        title: 'Full Event 2',
        allDay: false,
        start: "#{to} 16:00",
        end: "#{to} 17:00",
        extra_class: 'full-event'
      },
      {
        id: 10,
        title: 'One Hour Event',
        allDay: false,
        start: "#{to} 17:00",
        end: "#{to} 18:00",
        extra_class: 'confirmed-event'
      }

    ]
  end
end
