ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Recent Orders" do
          table_for Order.includes(:user).order(id: :desc).limit(10) do
            column("Id") { |order| status_tag(order.id) }
            column("Status") { |order| status_tag(order.status) }
            column("Customer") { |order| status_tag(order.user.name) }
            column("Total")   { |order| number_to_currency order.cost }
          end
        end
      end
    end

  end # content
end
