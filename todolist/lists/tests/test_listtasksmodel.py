from django.test import TestCase
from lists.models import (
    ListTaskModel
)


class ListItemModelTestCase(TestCase):

    fixtures = [
        'users.json',
        'lists.json',
        'tasks.json'
    ]

    def test_we_have_tasks(self):
        """Check that we can query for tasks."""
        itemcount = ListTaskModel.objects.count()
        self.assertEqual(
            itemcount,
            4
        )

    def test_str_returns_title(self):
        """Test that __str__ returns the title of the item."""
        myitem = ListTaskModel.objects.get(title="Test Item 1")
        self.assertEqual(
            myitem.__str__(),
            myitem.title
        )

    def test_we_can_flag_item_as_done(self):
        """
        Test that we can toggle a specific item.
        """
        item = ListTaskModel.objects.get_pending_tasks().all()[0]
        self.assertFalse(
            item.flag_done
        )
        item.toggle_task()
        self.assertTrue(
            item.flag_done
        )

    def test_we_can_flag_item_as_pending(self):
        """
        Test that we can toggle a specific item.
        """
        item = ListTaskModel.objects.get_done_tasks().all()[0]
        self.assertTrue(
            item.flag_done
        )
        item.toggle_task()
        self.assertFalse(
            item.flag_done
        )

    def test_we_can_query_get_list(self):
        """
        Ensure that the get_list method of the ListTaskModel Manager,
        returns all tasks of a specific list.
        """
        itemcount = ListTaskModel.objects.get_tasks_for_list(1).count()
        self.assertEqual(
            itemcount,
            2
        )
