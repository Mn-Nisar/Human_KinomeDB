# Generated by Django 5.1.1 on 2024-10-25 07:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("kinome", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cancer",
            fields=[
                (
                    "cancer",
                    models.CharField(
                        max_length=25, primary_key=True, serialize=False, unique=True
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Cptac",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("site", models.CharField(max_length=25)),
                ("patient", models.CharField(max_length=255)),
                ("log2fc", models.FloatField()),
                (
                    "cancer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="cptac_cancer",
                        to="kinome.cancer",
                    ),
                ),
                (
                    "kinase",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="cptac_kinase",
                        to="kinome.kinase",
                    ),
                ),
            ],
        ),
    ]
