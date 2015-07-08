from rest_framework import serializers

from lists.models import (
    ListModel,
    ListTaskModel
)


class ListSerializer(serializers.ModelSerializer):
    """Serializer for List Model of lists module."""

    listowner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ListModel
        fields = (
            'id', 'title', 'description', 'status',
            'listowner', 'owner', 'tasks'
        )
        extra_kwargs = {
            'owner': {
                'write_only': True,
                'required': False
            },
            'tasks': {
                'required': False
            }
        }

    def get_listowner(self, obj):
        """
        Customized method for fetching the owner. We could allow a related
        field to be returned, but I prefer this way since it reduces calls,
        afterall this is a just a simple represantation for a field without
        much logic in it.
        """
        return {
            'id': obj.owner.id,
            'username': obj.owner.get_username()
        }


class TaskSerializer(serializers.ModelSerializer):
    """
    This is used for the detail view of a List, we display the tasks of the
    list.
    """

    class Meta:
        model = ListTaskModel
        fields = (
            'id', 'title', 'description', 'flag_done',
            'tasklist', 'created_at', 'modified_at'
        )
        extra_kwargs = {
            'tasklist': {
                'write_only': True
            }
        }
