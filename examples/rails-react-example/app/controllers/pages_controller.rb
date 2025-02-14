# frozen_string_literal: true

class PagesController < ApplicationController
  def index
    @tickets = set_tickets
    @pipeline_data = set_pipeline_data
    @line_graph_data = set_line_graph_data
  end

  private

  def fetch_new_tickets(num)
    response = HTTParty.get("https://randomuser.me/api/?results=#{num}")
    user_data = response.parsed_response["results"]

    user_data.map do |user|
      {
        avatar: user['picture']['large'],
        text: feedback[rand(4)]
      }
    end
  end

  def set_tickets
    {
      new: fetch_new_tickets(25),
      feedback: fetch_new_tickets(5),
      processing: fetch_new_tickets(3),
      awaiting_feedback: fetch_new_tickets(2),
      approved: fetch_new_tickets(15)
    }
  end

  def feedback
    [
      'Missing Part',
      'Not Performing',
      'Unexpected Error',
      'Need Technical Help'
    ]
  end

  def set_pipeline_data
    [
      {
        title: 'Add to Cart',
        percent: 100,
        total: 2577
      },
      {
        title: 'Shopping Cart',
        percent: 80,
        total: 2023
      },
      {
        title: 'Payment Methods',
        percent: 60,
        total: 1567
      },
      {
        title: 'Delivery Methods',
        percent: 50,
        total: 1252
      },
      {
        title: 'Confirm',
        percent: 49,
        total: 1182
      },
      {
        title: 'Delivery',
        percent: 46,
        total: 1098
      }
    ]
  end

  def set_line_graph_data
    [
      {
        name: 'Revenue',
        data: [3134, 4001, 3399, 2000, 3400, 7001,]
      },
      # {
      #   name: 'Orders',
      #   data: [2134, 3001, 6399, 2000, 9400, 7000]
      # }
    ]
  end
end
