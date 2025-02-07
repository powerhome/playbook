class GraphsController < ApplicationController
  def show
    category = params[:category] || "Revenue"

    data = {
      "Revenue" => [{ name: "Revenue", data: [3134, 4001, 3399, 2000, 3400, 7001] }],
      "Orders" => [{ name: "Orders", data: [1500, 2800, 7600, 4700, 3900, 9200] }],
      "Profit" => [{ name: "Profit", data: [8200, 5300, 6500, 3600, 4700, 1000] }],
      "Average Check" => [{ name: "Average Check", data: [4550, 6560, 2370, 9780, 5490, 8410] }],
      "Canceled" => [{ name: "Canceled", data: [2340, 7530, 3225, 4635, 8440, 1250] }],
      "Repeat Sales" => [{ name: "Repeat Sales", data: [5150, 2200, 5180, 6220, 8250, 9270] }]
    }

    render json: { chart_data: data[category] }
  end
end
