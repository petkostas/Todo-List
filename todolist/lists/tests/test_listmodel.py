from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from lists.models import (
    ListModel
)

User = get_user_model()


class ListModelTestCase(TestCase):

    fixtures = [
        'users.json',
        'lists.json',
    ]

    def test_we_have_lists(self):
        """Check that we can query for lists."""
        listscount = ListModel.objects.count()
        self.assertEqual(
            listscount,
            3
        )

    def test_ommiting_title_save_fails(self):
        """If we ommit the title for the mode, it should fail."""
        new_list = ListModel(
            status=True
        )
        with self.assertRaises(ValidationError):
            new_list.full_clean()
            new_list.save()

    def test_we_can_toggle_a_list(self):
        """
        Test that we can toggle a list within the DB.
        """
        prev_list_count = ListModel.objects.get_active_lists().count()
        list = ListModel.objects.get_active_lists().all()[0]
        list.toggle_list()
        listcount = ListModel.objects.get_active_lists().count()
        self.assertGreater(
            prev_list_count,
            listcount
        )

    def test_str_returns_title(self):
        """Test that __str__ returns the title of the list."""
        list = ListModel.objects.all()[0]
        self.assertEqual(
            list.__str__(),
            list.title
        )

    def test_get_archived_lists_works(self):
        """Test we have results when calling get_archived_lists."""
        listcount = ListModel.objects.get_archived_lists().count()
        self.assertEqual(
            listcount,
            1
        )

    def test_get_active_lists_works(self):
        """Test we have results when calling get_active_lists."""
        listcount = ListModel.objects.get_active_lists().count()
        self.assertEqual(
            listcount,
            2
        )

    def test_user_has_lists(self):
        """Test that we can fetch the lists owned by the user."""
        userid = 1
        listcount = ListModel.objects.get_user_lists(userid).count()
        self.assertEqual(
            listcount,
            3
        )

    def test_user_has_no_lists(self):
        """
        Test that get_user_lists returns nothing for a user with no
        lists.
        """
        userid = 99999
        listcount = ListModel.objects.get_user_lists(userid).count()
        self.assertEqual(
            listcount,
            0
        )
