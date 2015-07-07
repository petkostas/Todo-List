from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import (
    APITestCase,
)
from lists.models import (
    ListModel,
    ListTaskModel
)


class RestListModelTests(APITestCase):

    fixtures = [
        'users.json',
        'lists.json',
        'tasks.json'
    ]

    def test_lists_index(self):
        """
        Ensure we have lists returning.
        """
        self.client.login(
            username='testuser', password='12345')
        lists_index_url = reverse(
            'rest:lists:index'
        )
        rsp = self.client.get(
            lists_index_url
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_200_OK
        )
        self.assertEqual(
            len(rsp.data),
            3
        )

    def test_list_view_details_has_tasks(self):
        """
        Ensure we can view a list and all of its details / items.
        """
        list_detail_view = reverse(
            'rest:lists:view',
            kwargs={
                'list_id': 1
            }
        )
        self.client.login(
            username='testuser', password='12345')
        rsp = self.client.get(
            list_detail_view
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_200_OK
        )
        self.assertEqual(
            len(rsp.data),
            2
        )

    def test_non_existing_list_returns_404(self):
        """
        Ensure that requests for non existing lists always return a 404.
        """
        list_detail_view = reverse(
            'rest:lists:view',
            kwargs={
                'list_id': 9999
            }
        )
        self.client.login(
            username='testuser', password='12345')
        rsp = self.client.get(
            list_detail_view
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_404_NOT_FOUND
        )

    def test_list_view_anon_cannot_view(self):
        """
        Test that when requesting a list and the user has not
        authenticated, the are no returned items.
        """
        list_detail_view = reverse(
            'rest:lists:view',
            kwargs={
                'list_id': 1
            }
        )
        rsp = self.client.get(
            list_detail_view
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_403_FORBIDDEN
        )

    def test_we_can_delete_list(self):
        """
        Test that we can actually delete a list, while authenticated
        as the owner.
        """
        self.client.login(
            username='testuser', password='12345')
        list_destroy_view = reverse(
            'rest:lists:destroy',
            kwargs={
                'pk': 1
            }
        )
        deletedlistcount = ListModel.objects.get_archived_lists().count()
        self.assertEqual(
            deletedlistcount,
            1
        )
        rsp = self.client.delete(
            list_destroy_view
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_204_NO_CONTENT
        )
        deletedlistcount = ListModel.objects.get_archived_lists().count()
        self.assertEqual(
            deletedlistcount,
            1
        )

    def test_we_can_update_list(self):
        """
        Ensure that we can update a list.
        """
        self.client.login(
            username='testuser', password='12345')
        list_update_url = reverse(
            'rest:lists:update',
            kwargs={
                'pk': 1
            }
        )
        rsp = self.client.get(
            list_update_url
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_200_OK
        )
        listitem = rsp.data
        listitem['title'] = 'Modified Title'
        rsp = self.client.patch(
            list_update_url,
            listitem
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_200_OK
        )
        updatedlist = ListModel.objects.get(pk=1)
        self.assertEqual(
            updatedlist.title,
            listitem['title']
        )

    def test_we_can_create_a_list(self):
        """
        Ensure that we can create a new List.
        """
        self.client.login(
            username='testuser', password='12345')
        list_create_url = reverse(
            'rest:lists:create',
        )
        list_data = {
            'title': 'A New List',
            'description': 'A New List description'
        }
        rsp = self.client.post(
            list_create_url,
            list_data
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_201_CREATED
        )
        newlist = ListModel.objects.get(pk=rsp.data['id'])
        self.assertEqual(
            newlist.title,
            list_data['title']
        )

    def test_we_can_create_a_task(self):
        """
        Ensure that a valid user can create a task.
        """
        self.client.login(
            username='testuser', password='12345')
        task_create_url = reverse(
            'rest:lists:tasks:create',
        )
        task_data = {
            'title': 'A New Task',
            'description': 'A New Task description',
            'tasklist': 1
        }
        rsp = self.client.post(
            task_create_url,
            task_data
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_201_CREATED
        )
        newtask = ListTaskModel.objects.get(pk=rsp.data['id'])
        self.assertEqual(
            newtask.title,
            task_data['title']
        )

    def test_anon_user_cannot_create_a_task(self):
        """
        Ensure anonymous users cannot create tasks.
        """
        task_create_url = reverse(
            'rest:lists:tasks:create',
        )
        task_data = {
            'title': 'A New Task for non existing user',
            'description': 'A New Task non existing user task',
            'tasklist': 1
        }
        rsp = self.client.post(
            task_create_url,
            task_data
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_403_FORBIDDEN
        )

    def test_non_owner_cannot_create_a_task(self):
        """
        Ensure that a valid and logged in user that does not own
        a list cannot create a task in it.
        """
        self.client.login(
            username='testuser2', password='12345')
        task_create_url = reverse(
            'rest:lists:tasks:create',
        )
        task_data = {
            'title': 'A New Task for non existing user',
            'description': 'A New Task non existing user task',
            'tasklist': 1
        }
        rsp = self.client.post(
            task_create_url,
            task_data
        )
        self.assertEqual(
            rsp.status_code,
            status.HTTP_403_FORBIDDEN
        )
