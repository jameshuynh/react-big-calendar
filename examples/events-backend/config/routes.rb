Rails.application.routes.draw do
  get 'events', controller: :events, action: :index
end
