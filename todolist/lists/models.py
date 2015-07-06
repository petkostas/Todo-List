# -*- coding: utf-8 -*-
from django.conf import settings
from django.utils.encoding import python_2_unicode_compatible
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class ListManager(models.Manager):
    """Manager for the List Model."""

    def get_queryset_with_related(self):
        """
        Returns a queryset with all related items.
        """
        qs = self.get_queryset()
        qs = qs.prefetch_related('tasks')
        qs = qs.select_related('owner')
        return qs

    def get_lists(self, status=None):
        """
        Returns list items with option status flag, if
        status is set we shall filter based on users decision.
        """
        qs = self.get_queryset_with_related()
        if status is not None:
            qs = qs.filter(status=status)
        return qs

    def get_archived_lists(self):
        """
        Retrieve archived lists
        Method to be more understandable for the developer.
        """
        return self.get_lists(False)

    def get_active_lists(self):
        """
        Retrieve active lists
        Method to be more understandable for the developer.
        """
        return self.get_lists(True)

    def get_user_lists(self, userid):
        """Returns Lists owned by the user."""
        qs = self.get_queryset_with_related()
        qs = qs.filter(owner_id=userid)
        return qs


@python_2_unicode_compatible
class ListModel(models.Model):
    """Model for our Lists."""

    title = models.CharField(
        _('List Name'),
        max_length=120
    )
    description = models.TextField(
        _('List Description'),
        blank=True
    )
    status = models.BooleanField(
        _('List Status'),
        default=True
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='lists',
        verbose_name=_('List Owner')
    )
    created_at = models.DateTimeField(
        default=timezone.now
    )
    modified_at = models.DateTimeField(
        default=timezone.now
    )
    objects = ListManager()

    def __str__(self):
        return u'%s' % self.title

    def delete(self, force=False):
        """
        Override default delete method, in order to introduce
        archiving of the List, we don't want to actually delete the
        item unless we force to.
        """
        if force is True:
            super(ListModel, self).delete()
        else:
            self.status = False
            self.save()


class ListTaskMananger(models.Manager):
    """ListTask Manager."""

    def get_queryset_with_related(self):
        """
        Returns a queryset with related items.
        """
        qs = self.get_queryset()
        qs = qs.select_related('tasklist', 'tasklist__owner')
        return qs

    def get_tasks(self, flag_done=None, flag_deleted=False):
        """Returns all tasks marked as deleted."""
        qs = self.get_queryset_with_related()
        if flag_done is not None:
            qs = qs.filter(flag_done=flag_done)
        return qs

    def get_done_tasks(self):
        """
        Returns all items that have been marked as done.
        """
        return self.get_tasks(True)

    def get_pending_tasks(self):
        """
        Returns all items that have been marked as pending.
        """
        return self.get_tasks(False)

    def get_tasks_for_list(self, taskid=None):
        """
        Return all tasks for a specific list.
        """
        qs = self.get_queryset_with_related()
        if taskid is not None:
            qs = qs.filter(tasklist_id=taskid)
        return qs


@python_2_unicode_compatible
class ListTaskModel(models.Model):
    """List Item Model."""
    title = models.CharField(
        _('Item Title'),
        max_length=155
    )
    tasklist = models.ForeignKey(
        'lists.ListModel',
        related_name='tasks',
        verbose_name=_('List')
    )
    description = models.TextField(
        _('Item Description')
    )
    flag_archived = models.BooleanField(
        _('Item Marked as Deleted'),
        default=False
    )
    flag_done = models.BooleanField(
        _('Item Marked as done'),
        default=False
    )
    created_at = models.DateTimeField(
        default=timezone.now
    )
    modified_at = models.DateTimeField(
        default=timezone.now
    )
    objects = ListTaskMananger()

    def __str__(self):
        return u'%s' % self.title

    def toggle_task(self):
        """Changes item status"""
        self.flag_done = not self.flag_done
        self.save()
