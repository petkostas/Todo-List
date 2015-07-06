from django.views import generic


class IndexView(generic.TemplateView):
    """
    Index View for To Do List.
    """
    template_name = "core/index.html"
