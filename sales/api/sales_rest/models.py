from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200,unique=True)


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobileRecords",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salepersonRecords",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customerRecords",
        on_delete=models.PROTECT,
    )
    price = models.PositiveIntegerField()
