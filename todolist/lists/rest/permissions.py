from rest_framework import permissions


class IsOwnerOrDeny(permissions.BasePermission):
    """
    Custom permission to only allow only owners to access the object.
    """

    def has_object_permission(self, request, view, obj):
        """
        Deny the user if he is not the owner of the list or task.
        """
        return obj.owner == request.user
