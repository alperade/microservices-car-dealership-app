# Generated by Django 4.0.3 on 2022-10-25 05:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SaleRecord',
            new_name='SalesRecord',
        ),
    ]
