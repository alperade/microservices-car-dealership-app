from django.urls import path

from .api_views import (
    api_list_automobilevo,
    api_list_salesperson,
    api_show_salesperson,
    api_list_customer,
    api_show_customer,
    api_list_salesrecord,
    api_show_salesrecord,
)

urlpatterns = [
    path("automobilevos/", api_list_automobilevo, name="api_list_automobilevo"),
    path("salespersons/", api_list_salesperson, name="api_list_salesperson"),
    path("salespersons/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecords/", api_list_salesrecord, name="api_list_salesrecord"),
    path("salesrecords/<int:pk>/", api_show_salesrecord, name="api_show_salesrecord"),
]
