from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, SalesRecord
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin","id", "sold"]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ["name", "id",]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ["name", "employee_id","id",]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "id",]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number","id",]


class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["automobile", "salesperson", "customer","price","id",]
    encoders = {
        "automobile" : AutomobileVOListEncoder(),
        "salesperson" : SalespersonDetailEncoder(),
        "customer" :CustomerDetailEncoder(),
    }

@require_http_methods(["GET", "PUT"])
def api_list_automobilevo(request):
    if request.method == "GET":
        automobilevos = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobilevos": automobilevos},
            encoder=AutomobileVOListEncoder,
        )
    else:
        content = json.loads(request.body)
        auto = AutomobileVO.objects.get(vin=content["vin"])
        setattr(auto, "sold", True)
        auto.save()
        return JsonResponse(
            auto,
            encoder=AutomobileVOListEncoder,
            safe=False,
        )


#add a sales person
@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonListEncoder,
        )
    else:
        content = json.loads(request.body)
    salesperson = Salesperson.objects.create(**content)
    return JsonResponse(
        salesperson,
        encoder=SalespersonDetailEncoder,
        safe=False,
    )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesperson(request,pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=pk).update(**content)
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )


#add a potential customer
@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
    customer = Customer.objects.create(**content)
    return JsonResponse(
        customer,
        encoder=CustomerDetailEncoder,
        safe=False,
    )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request,pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


#create a sale record
@require_http_methods(["GET", "POST"])
def api_list_salesrecord(request):
    if request.method == "GET":
        salesrecords = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecords": salesrecords},
            encoder=SalesRecordDetailEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=404,
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=404,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=404,
            )
        salesrecords = SalesRecord.objects.create(**content)
        return JsonResponse(
            salesrecords,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
#list all sales
#list a sales person's sales history


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesrecord(request, pk):
    if request.method == "GET":
        salesrecord = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count> 0})
    else:
        content = json.loads(request.body)
        try:
            if "automobile" in content:
                automobile = AutomobileVO.objects.get(vin=content["automobile"])
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=404,
            )
        try:
            if "salesperson" in content:
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=404,
            )
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=404,
            )

        SalesRecord.objects.filter(id=pk).update(**content)
        salesrecord = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
