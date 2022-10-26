from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href= models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField()

    def __str__(self):
         return self.name

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.pk})


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(Technician, related_name="appointments", on_delete=models.PROTECT)
    reason = models.TextField()
    is_finished = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer_name} {self.date} {self.time}"
