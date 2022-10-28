from django.contrib import admin
from .models import SalesRecord, Customer, AutomobileVO

# Register your models here.
@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
