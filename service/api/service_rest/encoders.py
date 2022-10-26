from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties=["vin"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "technician",
        "vip",
        "is_finished"
    ]
    encoders ={
        "technician": TechnicianDetailEncoder(),
    }

    def get_extra_data(self,o):
        return {"technician": o.technician.name}
