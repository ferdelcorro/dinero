$(document).ready(function () {
    // Code adapted from http://djangosnippets.org/snippets/1389/  
    function updateElementIndex(el, prefix, ndx) {
        var id_regex = new RegExp('(' + prefix + '-\\d+-)');
        var replacement = prefix + '-' + ndx + '-';
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex,
        replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
    }

    function deleteForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        if (formCount > 1) {
            // Delete the item/form
            $(btn).parents('.item').remove();
            var forms = $('.item'); // Get all the forms  
            // Update the total number of forms (1 less than before)
            $('#id_' + prefix + '-TOTAL_FORMS').val(forms.length);
            var i = 0;
            // Go through the forms and set their indices, names and IDs
            for (formCount = forms.length; i < formCount; i++) {
                $(forms.get(i)).children().children().each(function () {
                    if ($(this).attr('type') == 'text') updateElementIndex(this, prefix, i);
                });
            }
        } // End if
        else {
            alert("You must have at least one item!");
        }
        return false;
    }

    function addForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        // You can only submit a maximum of 30 todo items 
        if (formCount < 30) {
            // Clone a form (without event handlers) from the first form
            var row = $(".item:first").clone(false).get(0);
            var company = ""
            // Insert it after the last form
            if($(".item:last").children().first().next().next().find('input').val()!="")
            {
                company = $(".item:last").children().first().next().next().find('input').val();
            }
            
            $(row).removeAttr('id').hide().insertAfter(".item:last").slideDown(300);

            // Remove the bits we don't want in the new row/form
            // e.g. error messages
            $(".errorlist", row).remove();
            $(row).children().removeClass("error");

            // Relabel or rename all the relevant bits
            $(row).children().children().each(function () {
                updateElementIndex(this, prefix, formCount);
                $(this).val("");
            });

            // Mantener la company nueva al clonar
            if(company != "")
            {
                $(row).children().first().next().next().find('input').val(company);
            }
            $(row).children().first().find('input').removeAttr('readonly');
            $(row).children().first().next().find('input').removeAttr('readonly');
            // Add an event handler for the delete item/form link 
            $(row).find(".delete").click(function () {
                return deleteForm(this, prefix);
            });
            PopOver();
            // Update the total form count
            $("#id_" + prefix + "-TOTAL_FORMS").val(formCount + 1);
            AddAutoComplete();
            GetAllCompanies();
        } // End if
        else {
            alert("Sorry, you can add only 30 items");
        }
        return false;
    }
    // Register the click event handlers
    $("#add").click(function () {
        return addForm(this, "form");
    });

    $(document).keypress(function(e) 
    {
       // test for the enter key
       if (e.keyCode == 13) 
       {
            return addForm(this, "form");
       }

    });

    function PopOver()
    {
        $(".new_company_pop").unbind('click');
        $(".new_company_pop").click(function(){
            if($(this).next().length==0)
            {
                $(this).popover('show');
                company_autocomplete($(this).next().find(".cia_input"), '','/ast/query/companies')
                $(".add_company").click(function(){NewCompany($(this))});
            }
            else
            {
                $(this).popover('destroy');
            }
        });
    }
    PopOver();

    function NewCompany(add_btn){
        $.ajax({
            type: "POST",
            url: "/prj/new_company/",
            data: {'cia_name':add_btn.parent().find('input').val(), 'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
            success: 
            function(data)
            {
                if(data.result=="ok")
                {
                    GetAllCompanies();
                    add_btn.parent().parent().parent().find('select').val(data.cia_id);
                }
                else if(data.result=="exists")
                {
                    alert("Company already exist");
                }
            }
        });
    }

    function AddAutoComplete()
    {
         $(".item").each(function (index)
        {
            $(function() {
                $('[id=id_form-'+ index + '-mbr_mail').autocomplete({
                    source: "/ast/query/users?prj_id="+$("#prj_id").attr("prj_id"),
                    change: function (event, ui) {
                            if(ui.item)
                            {
                                $(this).val(ui.item.email)
                                $('[id=id_form-'+ index + '-mbr_name').val(ui.item.name)
                                $('[id=id_form-'+ index + '-mbr_name').prop('readonly', 'true')
                                $('[id=id_form-'+ index + '-mbr_company_select').show()
                                $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail'))
                                habilitar_send();
                            }
                            else if($('[id=id_form-'+ index + '-mbr_mail').val()!="")
                            {
                                $('[id=id_form-'+ index + '-mbr_name').val("")
                                if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name'), $('[id=id_form-'+ index + '-mbr_mail'))=='ok')
                                // if($("#prj_id").attr('s')=='ok')
                                {
                                    $('[id=id_form-'+ index + '-mbr_name').prop('readonly', 'true')
                                    // $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                    GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail'))
                                    // $('[id=id_form-'+ index + '-mbr_company_select').show()
                                }
                                else
                                {
                                    $('[id=id_form-'+ index + '-mbr_name').removeAttr('readonly');
                                    GetAllCompanies();
                                    // if(GetLastNewCompany() != "")
                                    // {
                                    //     var company = GetLastNewCompany();
                                    //     $('[id=id_form-'+ index + '-mbr_company_input').val(company);
                                    // }
                                    // $('[id=id_form-'+ index + '-mbr_company_select').hide();
                                    // $('[id=id_form-'+ index + '-mbr_company_input').show();
                                }
                                habilitar_send();
                            }
                            else
                            {
                                $('[id=id_form-'+ index + '-mbr_name').val("")
                                $('[id=id_form-'+ index + '-mbr_name').removeAttr('readonly')
                                GetAllCompanies();
                                $('[id=id_form-'+ index + '-mbr_company_select').show()
                                habilitar_send();
                            }
                        }
                    })
                    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                        return $( "<li>" )
                        .append("<a>"+"<div class='ac ac-img'><img src='" + item.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + item.name + "</b><br>" + item.email + "</div>" + "</a>" )
                        .appendTo( ul );
                        };
            });
            $(function() {
                $('[id=id_form-'+ index + '-mbr_name').autocomplete({
                    source: "/ast/query/users?prj_id="+$("#prj_id").attr("prj_id"),
                    change: function (event, ui) { 
                            if(ui.item)
                            {
                                $(this).val(ui.item.name)
                                $('[id=id_form-'+ index + '-mbr_mail').val(ui.item.email)
                                $('[id=id_form-'+ index + '-mbr_mail').prop('readonly', 'true')
                                $('[id=id_form-'+ index + '-mbr_company_select').show()
                                $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail'))
                                habilitar_send();
                            }
                            else if($('[id=id_form-'+ index + '-mbr_name').val()!="")
                            {
                                $('[id=id_form-'+ index + '-mbr_mail').val("")
                                if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name'), $('[id=id_form-'+ index + '-mbr_mail'))=='ok')
                                // if($("#prj_id").attr('s')=='ok')
                                {
                                    $('[id=id_form-'+ index + '-mbr_mail').prop('readonly', 'true')
                                    // $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                    GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail'))
                                    // $('[id=id_form-'+ index + '-mbr_company_select').show()
                                }
                                else
                                {
                                    $('[id=id_form-'+ index + '-mbr_mail').removeAttr('readonly');
                                    GetAllCompanies();
                                    // if(GetLastNewCompany() != "")
                                    // {
                                    //     var company = GetLastNewCompany();
                                    //     $('[id=id_form-'+ index + '-mbr_company_input').val(company);
                                    // }
                                    // $('[id=id_form-'+ index + '-mbr_company_select').hide();
                                    $('[id=id_form-'+ index + '-mbr_company_input').show();
                                }
                                habilitar_send();
                            }
                            else
                            {
                                $('[id=id_form-'+ index + '-mbr_mail').val("")
                                $('[id=id_form-'+ index + '-mbr_mail').removeAttr('readonly')
                                GetAllCompanies();
                                $('[id=id_form-'+ index + '-mbr_company_select').show()
                                habilitar_send();
                            }
                        }
                    })
                    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                        return $( "<li>" )
                        .append("<a>"+"<div class='ac ac-img'><img src='" + item.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + item.name + "</b><br>" + item.email + "</div>" + "</a>" )
                        .appendTo( ul );
                        };
            });
        });
    }
    AddAutoComplete()

    function GetLastNewCompany()
    {
        var company = ""
        $(".item").each(function (index)
        {
            company = $('[id=id_form-'+ index + '-mbr_company_input').val();
        });
        return company       
    }

    function CheckNameAndMail(name_field, email_field)
    {
        var s = 'Error'
        // $("#prj_id").attr('s', 'error');
        $.ajax({
            type: "POST",
            url: "/prj/check_name_and_email/",
            data: {'email':email_field.val(), 'name':name_field.val(), 'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
            async: false,
            success: 
            function(data)
            {
                if(data.result=="ok")
                {
                    email_field.val(data.email);
                    name_field.val(data.name);
                    // $("#prj_id").attr('s', 'ok');
                    s = 'ok'
                }
            }
        });
        return s;
    }

    function GetUserCompanies(mail_field)
    {
        $.ajax({
            type: "POST",
            url: "/prj/get_user_companies/",
            data: {'mail':mail_field.val(), 'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
            success: 
            function(data)
            {
                mail_field.parent().next().next().find('select').find('option').remove().end();
                $(data.companies).each(function(ind, node)
                {
                    mail_field.parent().next().next().find('select').append('<option value='+node.id+'>'+node.name+'</option>');
                })
                // $(".item").each(function(index)
                // {
                //     $(data.companies).each(function(ind, node)
                //     {
                //         $('[id="id_form-'+index+'-mbr_company_select"]').append('<option value='+node.id+'>'+node.name+'</option>');
                //     })
                // });
            }
        });
    }

    function GetAllCompanies()
    {
        $.ajax({
            type: "POST",
            url: "/prj/get_all_companies/",
            data: {'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
            success: 
            function(data)
            {
                $(".item").each(function(index)
                {
                    if($('[id="id_form-'+index+'-mbr_mail"]').val()=="")
                    {
                        $(data.companies).each(function(ind, node)
                        {
                            $('[id="id_form-'+index+'-mbr_company_select"]').append('<option value='+node.id+'>'+node.name+'</option>');
                        })
                    }
                });
            }
        });
    }

});






