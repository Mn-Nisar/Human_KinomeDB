# Generated by Django 5.1.2 on 2024-10-29 06:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kinome', '0002_cancer_cptac'),
    ]

    operations = [
        migrations.CreateModel(
            name='Family',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site', models.CharField(max_length=25)),
                ('score', models.FloatField()),
                ('family', models.CharField(max_length=255)),
                ('kinase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='family_kinase', to='kinome.kinase')),
            ],
        ),
    ]
