# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ListModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=120, verbose_name='List Name')),
                ('description', models.TextField(verbose_name='List Description', blank=True)),
                ('status', models.BooleanField(default=True, verbose_name='List Status')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('owner', models.ForeignKey(related_name='lists', verbose_name='List Owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListTaskModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=155, verbose_name='Item Title')),
                ('description', models.TextField(verbose_name='Item Description')),
                ('flag_archived', models.BooleanField(default=False, verbose_name='Item Marked as Deleted')),
                ('flag_done', models.BooleanField(default=False, verbose_name='Item Marked as done')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('tasklist', models.ForeignKey(related_name='tasks', verbose_name='List', to='lists.ListModel')),
            ],
        ),
    ]
