from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import AutomobileVO, Technician, Appointment
from .encoders import TechnicianDetailEncoder, AppointmentEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except:
            response = JsonResponse({"technician": "Error with creating a technician"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        print(AutomobileVO.objects.all())
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.get(employee_number=content["technician"])
        content["technician"] = technician
        try:
            vip_vin=content["vin"]
            AutomobileVO.objects.get(vin=vip_vin)
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
          appointment,
          encoder=AppointmentEncoder,
          safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request,pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
