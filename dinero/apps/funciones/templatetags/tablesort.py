from django import template

register = template.Library()


@register.simple_tag()
def paginator(list_element, request, number_element=3):
    req_get = dict(request.GET)
    for x in req_get.keys():
        if x == 'page' or x == 'nro_row':
            del req_get[x]
    for x in req_get.keys():
        req_get[x] = req_get[x][0]
    number_element = number_element - 1
    result = '<div class="paginator">'
    result += '<div class="col-lg-11 text-right">'
    result += '  <ul class="pagination">'
    if list_element.number != len(list_element.paginator.page_range):
        rang_paginator = list_element.paginator.page_range[
            list_element.number - 1:(list_element.number + number_element)
        ]
    else:
        rang_paginator = list_element.paginator.page_range[
            list_element.number - 3:list_element.number
        ]
    if list_element.has_previous():
        result += '<li><a id="page_prev" href="?page='
        result += str(list_element.previous_page_number())
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '">&laquo;</a></li>'
    else:
        result += '<li class="disabled"><a href="?page='
        try:
            result += str(list_element.previous_page_number())
        except:
            result += str(1)
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '">&laquo;</a></li>'
    if list_element.number != 1:
        result += '<li><a id="page_prev" href="?page=1'
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '">1</a></li>'
        result += '<li><a id="page_number" href="#'
        result += '"><span>...</span></a></li>'

    for page in rang_paginator:
        result += '<li '
        if page == list_element.number:
            result += 'class="active"'
        result += '>'
        result += '<a id="page_number" href="?page='
        result += str(page)
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '"><span>' + str(page) + ' </span></a></li>'
    if list_element.number != len(list_element.paginator.page_range):
        if list_element.number != list_element.paginator.num_pages:
            result += '<li '
            result += '>'
            result += '<a id="page_number" href="#'
            result += '"><span>...</span></a></li>'
            result += '<li '
            result += '>'
            result += '<a id="page_number" href="?page='
            result += str(list_element.paginator.num_pages)
            result += '&nro_row=' + str(list_element.paginator.per_page)
            for kes_parameter in req_get.keys():
                result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
            result += '"><span>' + str(list_element.paginator.num_pages)
            result += '</span></a></li>'
    if list_element.has_next():
        result += '<li><a id="page_next" href="?page='
        result += str(list_element.next_page_number())
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '">&raquo;</a></li>'
    else:
        result += '<li class="disabled"><a id="page_next" href="?page='
        try:
            result += str(list_element.next_page_number())
        except:
            result += str(1)
        result += '&nro_row=' + str(list_element.paginator.per_page)
        for kes_parameter in req_get.keys():
            result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
        result += '">&raquo;</a></li>'
    result += '</ul>'
    result += '</div>'
    result += '</div>'
    result += '<script type="text/javascript">'
    result += 'function go_to_page(){'
    temp_result = ''
    for kes_parameter in req_get.keys():
        temp_result += '&'+str(kes_parameter)+'='+str(req_get[str(kes_parameter)])
    result += 'location.href="?page="+$(\'#go_page\').val()+"&nro_row="+$(\'#nro_row\').val()+\''+temp_result+'\';'
    result += '}'
    result += 'function set_number_row(number){'
    result += '$(\'#nro_row\').val(number);'
    result += 'url = "";'
    result += 'url = $(\'#page_prev\').attr(\'href\');'
    result += 'url += \'&nro_row=\'+number;'
    result += '$(\'#page_prev\').attr(\'href\', url);'
    result += 'url = "";'
    result += 'url = $(\'#page_next\').attr(\'href\');'
    result += 'url += \'&nro_row=\'+number;'
    result += '$(\'#page_next\').attr(\'href\', url);'
    result += 'url = "";'
    result += 'url = $(\'#page_number\').attr(\'href\');'
    result += 'url += \'&nro_row=\'+number;'
    result += '$(\'#page_number\').attr(\'href\', url);'
    result += '}'
    result += '$(\'#nro_row\').click(function(){'
    result += 'set_number_row($(\'#nro_row\').val());'
    result += 'url = $(\'#page_number\').attr(\'href\');'
    result += 'url = url.replace("#", "");'
    result += 'if (location.href[location.href.length-1] != \'/\'){'
    result += 'location.href=location.href+"&nro_row="+$(\'#nro_row\').val();'
    result += '}else{'
    result += 'location.href=location.href+"?nro_row="+$(\'#nro_row\').val();'
    result += '}'
    result += '});'
    result += '$(document).ready(function(){'
    if list_element.paginator.per_page != 999999:
        result += 'set_number_row(\''
        result += str(list_element.paginator.per_page) + '\');'
    else:
        result += 'set_number_row(\'all\');'
    result += '});'
    result += '</script>'
    return result
