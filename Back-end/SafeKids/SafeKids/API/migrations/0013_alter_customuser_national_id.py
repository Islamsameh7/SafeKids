# Generated by Django 4.2.2 on 2023-07-06 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0012_alter_customuser_phonenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='national_id',
            field=models.CharField(max_length=14, unique=True),
        ),
    ]
