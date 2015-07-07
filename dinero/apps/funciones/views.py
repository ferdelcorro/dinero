from django.http import HttpResponse


# Create your views here.
def json_response(x):
    import json
    return HttpResponse(
        json.dumps(x, sort_keys=True, indent=2),
        content_type='application/json; charset=UTF-8'
    )
