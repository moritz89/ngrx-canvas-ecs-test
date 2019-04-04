# Generated by Django 2.2 on 2019-04-04 16:10

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CanvasAspect',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
                ('top', models.FloatField()),
                ('left', models.FloatField()),
                ('width', models.FloatField()),
                ('height', models.FloatField()),
                ('svg_url', models.CharField(blank=True, max_length=50)),
                ('stroke_width', models.FloatField(blank=True)),
                ('fill', models.CharField(blank=True, max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ElectricalAspect',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('power_usage', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='MetaAspect',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='WaterAspect',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('height_increase', models.FloatField()),
                ('is_open', models.BooleanField()),
                ('following_items', models.ManyToManyField(blank=True, related_name='_wateraspect_following_items_+', to='planner.WaterAspect')),
            ],
        ),
    ]
