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
            habilitar_send()
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
            if($(".item:last").children().first().next().next().next().find('input').val()!="")
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
                $(row).children().first().next().next().next().find('input').val(company);
            }
            $(row).children().first().find('input').removeAttr('readonly');
            $(row).children().first().next().find('input').removeAttr('readonly');
            // Add an event handler for the delete item/form link 
            $(row).find(".delete").click(function () {
                return deleteForm(this, prefix);
            });
            $(row).find('.delete').removeClass('hide');
            PopOver();
            // Update the total form count
            $("#id_" + prefix + "-TOTAL_FORMS").val(formCount + 1);
            AddAutoComplete();
            GetAllCompanies('true');
            $(row).find('.icon_mail').html('')
            $(row).children().first().next().next().find('input').val('');
            $(row).children().first().next().next().find('input').removeAttr('readonly');

            //Habilitar send para campos nuevos
            $(row).children().first().find('input').change(function(){habilitar_send()});
            $(row).children().first().next().next().find('input').change(function(){habilitar_send()});
            $(row).children().first().next().next().next().find('select').change(function(){habilitar_send()});
            $(row).children().first().next().next().next().next().find('select').change(function(){habilitar_send()});
            habilitar_send()
            // $(row).children().first().find('input').change(function(){
            //     validaremail($(this))
            // })
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

    $("#btn-send").click(function(){
        sendform();
    })

    function sendform()
    {
         $(".item").each(function (index)
        {
            if($('[id=id_form-'+ index + '-mbr_mail]').val()=="")
            {
                deleteForm($('[id=id_form-'+ index + '-mbr_mail]'), 'form')
            }
        });
        $('#form1').submit();
    }

    function validaremail(inputmail, inicial)
    {
        if(inputmail.val()!="")
        {
            inicial || ( inicial = false );
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(inputmail.val())) 
            {
                if(!inicial)
                {
                    inputmail.parent().next().find('div').html("<img src='/img/icons/error_sign.png' style='height: 20px;  with: 20px;' title='Invalid email.'>");
                }
            } 
            else
            {
                if(!inicial)
                {
                    inputmail.parent().next().find('div').html("<img src='/img/icons/ok_sign.png' style='height: 20px;  with: 20px;'>");
                }
            }     
        }
        else
        {
            inputmail.parent().next().find('div').html("");
        }
       
    }
    $("#id_form-0-mbr_mail").focusout(function(){
        validaremail($(this))
    })

    function PopOver()
    {
        $(".new_company_pop").unbind('click');
        $(".new_company_pop").click(function(event){
            if($(this).next().length==0)
            {
                var pop = $(this)
                $(this).popover('show');
                $(this).next().find(".cia_input").company_autocomplete('','/ast/query/companies')
                $(this).next().find(".cia_input").focus();
                $(document).unbind('keypress');
                $(document).keypress(function(e){if(e.keyCode == 13){NewCompany(pop.next().find('.add_company'))}});
                $(".add_company").click(function(){NewCompany($(this))});
                event.stopPropagation()
                $(document).click(function(event){
                    if(!($(".cia_input").is(':focus')))
                    {
                        if(event.target.id != 'add_btn_id')
                        {
                            pop.popover('destroy');
                            $(document).unbind('keypress');
                            $(document).keypress(function(e){if (e.keyCode == 13){return addForm(this, "form");}});
                        }
                        
                    }
                });
            }
            else
            {
                $(this).popover('destroy');
                $(document).unbind('keypress');
                $(document).keypress(function(e){if (e.keyCode == 13){return addForm(this, "form");}});
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
                    add_btn.parent().parent().parent().parent().find('option').remove().end();
                    add_btn.parent().parent().parent().parent().find('select').append('<option value='+data.cia_id+'>'+data.cia_name+'</option>')
                    GetAllCompanies('false');
                    add_btn.parent().parent().parent().parent().find('select').val(data.cia_id);
                    $("#id_mbr_company_select").val(data.cia_id);
                    $(".popover").hide();
                    $(".new_company_pop").popover('destroy');
                    $(document).unbind('keypress');
                    $(document).keypress(function(e){if (e.keyCode == 13){return addForm(this, "form");}});
                }
                else if(data.result=="error")
                {
                    alert("Sorry, we couldn't add "+data.cia_name+" to our companies");
                }
            }
        });
    }

    function AddAutoComplete()
    {
         $(".item").each(function (index)
        {
            $(function() {
                $('[id=id_form-'+ index + '-mbr_mail]').autocomplete({
                    source: "/ast/query/users?prj_id="+$("#prj_id").attr("prj_id"),
                    change: function (event, ui) {
                            if(ui.item)
                            {
                                $(this).val(ui.item.email)
                                validaremail($(this))
                                $('[id=id_form-'+ index + '-mbr_name]').val(ui.item.name)
                                $('[id=id_form-'+ index + '-mbr_name]').prop('readonly', 'true')
                                $('[id=id_form-'+ index + '-mbr_company_select]').show()
                                GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail]'))
                                $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('')
                                $('[id=id_form-'+ index + '-mbr_mail]').css('border', '1px solid rgb(204, 204, 204)')
                                $('[id=id_form-'+ index + '-mbr_mail]').next('span').removeClass('error_mail_field');
                                $('[id=id_form-'+ index + '-mbr_name]').next('span').text('')
                                $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(204, 204, 204)')
                                $('[id=id_form-'+ index + '-mbr_name]').next('span').removeClass('error_name_field');
                                habilitar_send();
                            }
                            else if($('[id=id_form-'+ index + '-mbr_mail]').val()!="")
                            {
                                validaremail($(this))
                                $('[id=id_form-'+ index + '-mbr_name]').val("")
                                if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name]'), $('[id=id_form-'+ index + '-mbr_mail]'), $("#prj_id").attr('prj_id'))=='ok')
                                {
                                    habilitar_send();
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('')
                                    $('[id=id_form-'+ index + '-mbr_mail]').css('border', '1px solid rgb(204, 204, 204)')
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').removeClass('error_mail_field');
                                    $('[id=id_form-'+ index + '-mbr_name]').prop('readonly', 'true')
                                    // $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                    GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail]'))
                                    // $('[id=id_form-'+ index + '-mbr_company_select').show()
                                }
                                else if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name]'), $('[id=id_form-'+ index + '-mbr_mail]'), $("#prj_id").attr('prj_id'))=='user_in_prj')
                                {
                                    habilitar_send();
                                    $('[id=id_form-'+ index + '-mbr_mail}').css('border', '1px solid rgb(210, 25, 25)')
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').addClass('error_mail_field')
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('This user is in the project')
                                    $('[id=id_form-'+ index + '-mbr_mail]').focusout(function(){
                                       if($('[id=id_form-'+ index + '-mbr_mail]').val()=="")
                                       {
                                            $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('')
                                            $('[id=id_form-'+ index + '-mbr_mail]').css('border', '1px solid rgb(204, 204, 204)')
                                            $('[id=id_form-'+ index + '-mbr_mail]').next('span').removeClass('error_mail_field');
                                       }
                                   });
                                }
                                else
                                {
                                    habilitar_send();
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('')
                                    $('[id=id_form-'+ index + '-mbr_mail]').css('border', '1px solid rgb(204, 204, 204)')
                                    $('[id=id_form-'+ index + '-mbr_mail]').next('span').removeClass('error_mail_field');
                                    $('[id=id_form-'+ index + '-mbr_name]').removeAttr('readonly');
                                    GetAllCompanies('true');
                                    $('[id=id_form-'+ index + '-mbr_mail]').change(function(){
                                        validaremail($(this))
                                    });
                                }
                                
                            }
                            else
                            {
                                $('[id=id_form-'+ index + '-mbr_name]').val("")
                                $('[id=id_form-'+ index + '-mbr_name]').removeAttr('readonly')
                                GetAllCompanies('true');
                                $('[id=id_form-'+ index + '-mbr_company_select]').show()
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
                $('[id=id_form-'+ index + '-mbr_name]').autocomplete({
                    source: "/ast/query/users?prj_id="+$("#prj_id").attr("prj_id"),
                    change: function (event, ui) { 
                            if(ui.item)
                            {
                                $(this).val(ui.item.name)
                                $('[id=id_form-'+ index + '-mbr_mail]').val(ui.item.email)
                                validaremail($('[id=id_form-'+ index + '-mbr_mail]'))
                                $('[id=id_form-'+ index + '-mbr_mail]').prop('readonly', 'true')
                                $('[id=id_form-'+ index + '-mbr_company_select]').show()
                                GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail]'))
                                $('[id=id_form-'+ index + '-mbr_name]').next('span').text('')
                                $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(204, 204, 204)')
                                $('[id=id_form-'+ index + '-mbr_name]').next('span').removeClass('error_name_field');
                                $('[id=id_form-'+ index + '-mbr_mail]').next('span').text('')
                                $('[id=id_form-'+ index + '-mbr_mail]').css('border', '1px solid rgb(204, 204, 204)')
                                $('[id=id_form-'+ index + '-mbr_mail]').next('span').removeClass('error_mail_field');
                                habilitar_send();
                            }
                            else if($('[id=id_form-'+ index + '-mbr_name]').val()!="")
                            {
                                // $('[id=id_form-'+ index + '-mbr_mail').val("")
                                if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name]'), $('[id=id_form-'+ index + '-mbr_mail]'), $("#prj_id").attr('prj_id'))=='ok')
                                // if($("#prj_id").attr('s')=='ok')
                                {
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').text('')
                                    $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(204, 204, 204)')
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').removeClass('error_name_field');
                                    $('[id=id_form-'+ index + '-mbr_mail]').prop('readonly', 'true')
                                    // $('[id=id_form-'+ index + '-mbr_company_input').hide()
                                    GetUserCompanies($('[id=id_form-'+ index + '-mbr_mail]'))
                                    habilitar_send()
                                    // $('[id=id_form-'+ index + '-mbr_company_select').show()
                                }
                                else if(CheckNameAndMail($('[id=id_form-'+ index + '-mbr_name]'), $('[id=id_form-'+ index + '-mbr_mail]'), $("#prj_id").attr('prj_id'))=='user_in_prj')
                                {
                                    $('#btn-send').prop('disabled', 'true');
                                    $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(210, 25, 25)')
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').addClass('error_name_field')
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').text('This user is in the project')
                                    $('[id=id_form-'+ index + '-mbr_name]').focusout(function(){
                                       if($('[id=id_form-'+ index + '-mbr_name]').val()=="")
                                       {
                                            $('[id=id_form-'+ index + '-mbr_name]').next('span').text('')
                                            $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(204, 204, 204)')
                                            $('[id=id_form-'+ index + '-mbr_name]').next('span').removeClass('error_name_field');
                                       }
                                    });
                                    habilitar_send();
                                }
                                else
                                {
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').text('')
                                    $('[id=id_form-'+ index + '-mbr_name]').css('border', '1px solid rgb(204, 204, 204)')
                                    $('[id=id_form-'+ index + '-mbr_name]').next('span').removeClass('error_name_field');
                                    $('[id=id_form-'+ index + '-mbr_mail]').removeAttr('readonly');
                                    GetAllCompanies('true');
                                    $('[id=id_form-'+ index + '-mbr_mail]').change(function(){
                                        validaremail($(this))
                                    });
                                    habilitar_send()
                                }
                                
                            }
                            else
                            {
                                $('[id=id_form-'+ index + '-mbr_mail]').val("")
                                $('[id=id_form-'+ index + '-mbr_mail]').removeAttr('readonly')
                                GetAllCompanies('true');
                                $('[id=id_form-'+ index + '-mbr_company_select]').show()
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
            company = $('[id=id_form-'+ index + '-mbr_company_input]').val();
        });
        return company       
    }

    function CheckNameAndMail(name_field, email_field, prj_id)
    {
        var s = 'Error'
        // $("#prj_id").attr('s', 'error');
        $.ajax({
            type: "POST",
            url: "/prj/check_name_and_email/",
            data: {'email':email_field.val(), 'name':name_field.val(), 'prj_id':$("#prj_id").attr('prj_id'), 'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
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
                else if(data.result=="user_in_prj")
                {
                    s = 'user_in_prj'
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
                mail_field.parent().next().next().next().find('select').find('option').remove().end();
                $(data.companies).each(function(ind, node)
                {
                    mail_field.parent().next().next().next().find('select').append('<option value='+node.id+'>'+node.name+'</option>');
                })
            }
        });
    }

    function habilitar_send()
    {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var enable_invitation = true;
        $(".item").each(function(index){
            if($('[id="id_form-'+index+'-mbr_mail"]').val()=="" || $('[id="id_form-'+index+'-mbr_name"]').val()==""
                || $('[id="id_form-'+index+'-mbr_company_select"]').val()=="" || 
                $('[id="id_form-'+index+'-mbr_group"]').val()=="" || 
                $(document).find('.error_name_field').length > 0 || 
                $(document).find('.error_mail_field').length > 0 || 
                !regex.test($('[id="id_form-'+index+'-mbr_mail"]').val()))
            {
                enable_invitation = false;
            }
        });
        if (enable_invitation){
            $('#btn-send').removeAttr('disabled');
            $('#btn-send').attr('class','btn btn-small btn-primary');
        }
        else{
            $('#btn-send').prop('disabled', 'true');
            $('#btn-send').attr('class','btn btn-small');
        }

    }
    habilitar_send()
    $('[id="id_form-0-mbr_mail"]').change(function(){habilitar_send()});
    $('[id="id_form-0-mbr_name"]').change(function(){habilitar_send()});
    $('[id="id_form-0-mbr_company_select"]').change(function(){habilitar_send()});
    $('[id="id_form-0-mbr_group"]').change(function(){habilitar_send()});


    function GetAllCompanies(async_v)
    {
        $.ajax({
            type: "POST",
            url: "/prj/get_all_companies/",
            data: {'csrfmiddlewaretoken':$('[name="csrfmiddlewaretoken"]').attr("value")},
            async: false,
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
                            $("#id_mbr_company_select").append('<option value='+node.id+'>'+node.name+'</option>');
                        });
                    }
                    else if($('[id="id_form-'+index+'-mbr_company_select"]').length==1)
                    {
                        $(data.companies).each(function(ind, node)
                        {
                            $('[id="id_form-'+index+'-mbr_company_select"]').append('<option value='+node.id+'>'+node.name+'</option>');
                            $("#id_mbr_company_select").append('<option value='+node.id+'>'+node.name+'</option>');
                        });
                    }
                });
            }
        });
    }

});






