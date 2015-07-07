from rest_framework import permissions
from lists.models import ListModel


class IsOwnerOrDeny(permissions.BasePermission):
    """
    Custom permission to only allow only owners to access the object.
    """

    def has_object_permission(self, request, view, obj):
        """
        Deny the user if he is not the owner of the list or task.
        """
        return obj.owner == request.user


class ListOwnerOrDeny(permissions.BasePermission):
    """
    Allow only List owners to view items in the list.
    """

    def has_object_permission(self, request, view, obj):
        """
        Allow only valid user owners of the specified list to view it.
        """
        return obj.tasklist.owner == request.user


class CreateListOwnerOrDeny(permissions.BasePermission):
    """
    Allow only List owners to make changes or view items in the list.
    """

    def has_permission(self, request, view):
        """
        Allow only the list owner.
        """
        listid = request.data.get('tasklist')
        try:
            list = ListModel.objects.get(pk=listid)
            return request.user == list.owner
        except:
            return False
