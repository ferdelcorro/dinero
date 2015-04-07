function cerrar() {
        parent.FilterComm('project', $("#prj_id").attr('value'));
    }

    function close_modal() {
        $("#modalMeetData").modal('hide');
    }

    function new_agenda(btn)
    {
        if(btn.attr('id')=="edit_agenda")
        {
            $("#modal_titulo").text("{% trans 'AGENDA' %}");
            $("#modalText").attr('origin', 'agenda');
            $("#modalText").val($("#agenda_content").find('p').text());
            $('#modalMeetData').modal('show');
        }
        else
        {
            $("#modal_titulo").text("{% trans 'AGENDA' %}");
            $("#modalText").attr('origin', 'agenda');
            $('#modalMeetData').modal('show');
        }
    }

    function new_action(btn)
    {
        if(btn.attr('id')=="edit_actions")
        {
            $("#modal_titulo").text("{% trans 'ACTION' %}");
            $("#modalText").attr('origin', 'action');
            $("#modalText").val($("#action_content").find('p').text());
            $('#modalMeetData').modal('show');
        }
        else
        {
            $("#modal_titulo").text("{% trans 'ACTION' %}");
            $("#modalText").attr('origin', 'action');
            $('#modalMeetData').modal('show');
        }
    }

    function new_minute(btn)
    {
        if(btn.attr('id')=="edit_minute")
        {
            $("#modal_titulo").text("{% trans 'MINUTE' %}");
            $("#modalText").attr('origin', 'minute');
            $("#modalText").val($("#minute_content").find('p').text());
            $('#modalMeetData').modal('show');
        }
        else
        {
            $("#modal_titulo").text("{% trans 'MINUTE' %}");
            $("#modalText").attr('origin', 'minute');
            $('#modalMeetData').modal('show');
        }
    }

    function save_meeting_changes(element, data)
    {
        var result = ""
        $.ajax({
            type: "POST",
            url: "/calendar/save_meeting_changes/",
            data: {'meeting_id':$("#meet_id").attr('value'), 'element':element, 'data':data, 'csrfmiddlewaretoken': $("#csrf").attr('value')},
            async: false,
            success:
            function(data)
            {
                result = data.result
            }
        });
        return result  
    }

    function save_modal()
    {
        if($("#modalText").attr('origin')=='agenda')
        {
            var status = save_meeting_changes('agenda', $("#modalText").val())
            if($("#modalText").val() != "")
            {
                if(status == 'ok')
                {
                    $("#agenda_content").html('<p>'+$("#modalText").val()+'</p>');
                    $("#modalText").val('');
                    $("#agenda_content").css('text-align' ,'justify');
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
            else
            {
                if(status == 'ok')
                {
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
        }
        else if($("#modalText").attr('origin')=='minute')
        {
            var status = save_meeting_changes('minute', $("#modalText").val())
            if($("#modalText").val() != "")
            {
                if(status == 'ok')
                {
                    $("#minute_content").html('<p>'+$("#modalText").val()+'</p>');
                    $("#modalText").val('');
                    $("#minute_content").css('text-align' ,'justify');
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
            else
            {
                if(status == 'ok')
                {
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
        }
        else if($("#modalText").attr('origin')=='action')
        {
            var status = save_meeting_changes('actions', $("#modalText").val())
            if($("#modalText").val() != "")
            {
                if(status == 'ok')
                {
                    $("#action_content").html('<p>'+$("#modalText").val()+'</p>');
                    $("#modalText").val('');
                    $("#action_content").css('text-align' ,'justify');
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
            else
            {
                if(status == 'ok')
                {
                    $("#success_changes").fadeIn().delay(2000).fadeOut();
                }
                else
                {
                    $("#unsuccess_changes").fadeIn().delay(2000).fadeOut();
                }
            }
        }
        close_modal();
    }

    function upload_files(p_type) {
        u = "/files/upload/?parent=tmp&parent_id={{prj.id}}&container=project&container_id={{prj.id}}&category=yes&reload=reload&folder={{folder.id}}&type=" + p_type
        $('#frame-upload').attr('src',u);
        $('#modal-upload').modal('show');
    }

    function createMeeting(){
        $("#m_agenda").attr('value', $("#agenda_content").text());
        $("#m_minute").attr('value', $("#minute_content").text());
        $("#m_action").attr('value', $("#action_content").text());
        $('#frmNewMeeting').submit()
    }

    window.set_attachments = function(filename) {
        s = "<div class='attachment span'><i class='icon-file'></i> " + filename + "</div>"
        $('#div-attachments').append(s);
        $('#div-attachments').removeClass('hide');
    }

    function expand(btn, element)
    {
       if(element == 'agenda')
       {
            if($("#agenda_content").height()<=20)
            {
                $("#agenda_content").animate({'max-height':$("#agenda_content").find('p').height()},500);
                btn.removeClass('fa-caret-left');
                btn.addClass('fa-caret-down')
            }
            else
            {
                $("#agenda_content").animate({'max-height':'20px'},500);
                btn.removeClass('fa-caret-down');
                btn.addClass('fa-caret-left')
            }
       }
       else if(element == 'minute')
       {
            if($("#minute_content").height()<=20)
            {
                $("#minute_content").animate({'max-height':$("#minute_content").find('p').height()},500);
                btn.removeClass('fa-caret-left');
                btn.addClass('fa-caret-down')
            }
            else
            {
                $("#minute_content").animate({'max-height':'20px'},500);
                btn.removeClass('fa-caret-down');
                btn.addClass('fa-caret-left')
            }
       }
       else if(element == 'actions')
       {
            if($("#action_content").height()<=20)
            {
                $("#action_content").animate({'max-height':$("#action_content").find('p').height()},500);
                btn.removeClass('fa-caret-left');
                btn.addClass('fa-caret-down')
            }
            else
            {
                $("#action_content").animate({'max-height':'20px'},500);
                btn.removeClass('fa-caret-down');
                btn.addClass('fa-caret-left')
            }
       } 
    }