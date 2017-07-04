class EventsController < ApplicationController
  def index
    from = params[:from]
    to = params[:to]

    render json: [
      {
        title: 'All Day Event',
        allDay: true,
        start: "#{from} 00:00",
        end: "#{(Date.parse(from) + 1.days).strftime('%Y-%m-%d')} 23:59"
      },
      {
        title: 'Half Day Event',
        allDay: false,
        start: "#{from} 12:00",
        end: "#{from} 14:00"
      }
    ]
  end
end
