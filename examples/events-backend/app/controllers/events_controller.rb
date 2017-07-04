class EventsController < ApplicationController
  def index
    from = params[:from]
    to = params[:to]

    render json: [
      {
        title: 'All Day Event',
        allDay: true,
        start: "#{from} 00:00",
        end: "#{(Date.parse(from) + 1.days).strftime('%Y-%m-%d')} 00:00"
      }
    ]
  end
end
