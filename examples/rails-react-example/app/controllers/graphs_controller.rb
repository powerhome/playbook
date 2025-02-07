class GraphsController < ApplicationController
  def show
    category = params[:category] || "Revenue"

    data = {
      "Revenue" => [{ name: "Revenue", data: [3134, 4001, 3399, 2000, 3400, 7001] }],
      "Orders" => [{ name: "Orders", data: [500, 800, 600, 700, 900, 1200] }],
      "Profit" => [{ name: "Profit", data: [200, 300, 500, 600, 700, 1000] }],
      "Average Check" => [{ name: "Average Check", data: [50, 60, 70, 80, 90, 100] }],
      "Canceled" => [{ name: "Canceled", data: [20, 30, 25, 35, 40, 50] }],
      "Repeat Sales" => [{ name: "Repeat Sales", data: [150, 200, 180, 220, 250, 270] }]
    }

    render json: { chart_data: data[category] }
  end
end
