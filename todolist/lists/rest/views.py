from django.http import Http404
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from lists.rest import serializers

from lists.models import (
    ListModel,
    ListTaskModel
)


# #####################
# RETRIEVE Views
# #####################

class ListModelListView(generics.ListAPIView):
    """
    View used for listing Lists.
    """
    queryset = ListModel.objects
    renderer_classes = (JSONRenderer,)
    serializer_class = serializers.ListSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Override custom mode, we want this in order to return lists
        that belong only to the current user.
        """
        qs = self.queryset
        qs = qs.get_user_lists(self.request.user.pk)
        return qs.all()


class TaskListView(generics.ListAPIView):
    """
    Return the details of a List, including items.
    """
    queryset = ListTaskModel.objects
    renderer_classes = (JSONRenderer,)
    serializer_class = serializers.TaskSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Override default implementation, we want to fetch
        items based on the list id.
        We prefer to use a ListAPIView here in order to bypass the pain
        of paginating (in case it is needed) the results of a RetrieveAPIView,
        that would require more code compared to the simple effect of altering
        the queryset.
        """
        userid = self.request.user.id
        listid = self.kwargs.get('list_id')
        if listid is None:
            raise Http404
        qs = self.queryset
        qs = qs.get_tasks_for_list(listid)
        qs = qs.filter(tasklist__owner_id=userid)
        if not qs.exists():
            raise Http404
        return qs.all()

# ###############################
# CRUD Views
# ###############################


class ListModelCreateView(generics.CreateAPIView):
    """
    Create view for List Model.
    """
    queryset = ListModel.objects.all()
    renderer_classes = (JSONRenderer,)
    serializer_class = serializers.ListSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """
        Assign the owner to the current user.
        """
        serializer.save(owner=self.request.user)


class ListModelCRUDView(generics.RetrieveUpdateDestroyAPIView):
    """
    Update a List, list is not actually destroyed, but marked as
    archived.
    """
    queryset = ListModel.objects.all()
    renderer_classes = (JSONRenderer,)
    serializer_class = serializers.ListSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_update(self, serializer):
        """
        Assign the owner to the current user.
        """
        serializer.save(owner=self.request.user)
