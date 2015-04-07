var widgets_filters = {}

function show_filter_time(id, time){
    if(time == 'month'){
        $('#widget_ytd_'+id).removeClass('active');
        $('#widget_all_'+id).removeClass('active');
        $('#widget_mtd_'+id).addClass('active');
    }else if(time == 'year'){
        $('#widget_mtd_'+id).removeClass('active');
        $('#widget_all_'+id).removeClass('active');
        $('#widget_ytd_'+id).addClass('active');
    }else{
        $('#widget_ytd_'+id).removeClass('active');
        $('#widget_mtd_'+id).removeClass('active');
        $('#widget_all_'+id).addClass('active');
    }
}

function show_filter_who(id, who){
    if(who == 'only_mine'){
        $('#widget_all_people_'+id).removeClass('active');
        $('#widget_only_mine_'+id).addClass('active');
    }else{
        $('#widget_only_mine_'+id).removeClass('active');
        $('#widget_all_people_'+id).addClass('active');
    }
}

function load_widget(url, id, time, who){
    $('#modal_wait_'+id).show()
    if (typeof time == "undefined" || time == null){
        try{
            time = widgets_filters['time_'+id];
        }catch (err){
            time = 'month'
        }
    }else{
        widgets_filters['time_'+id] = time;
    }

    if(typeof who == "undefined" || who == null) { 
        try{
            who = widgets_filters['who_'+id];
        }catch (err){
            who = 'only_mine'
        }
    }else{
        widgets_filters['who_'+id] = who;
    }

    $.ajax({
        type: "GET",
        data: {'time': time,
                'who': who},
        url: url+id+'/',
        success: function(data) {
            $("#widget_info-"+id).html(data);
            $('#modal_wait_'+id).hide();
            if(!$('#widget_footer_'+id).hasClass('inactive')){
                show_filter_time(id, time);
                show_filter_who(id, who);
            }
        }
    });
}

function load_widget_prj(url, w_id, p_id, time, who){
    $('#modal_wait_'+w_id).show()
    
    if (typeof time == "undefined" || time == null){
        try{
            time = widgets_filters['time_'+w_id];
        }catch (err){
            time = 'month'
        }
    }else{
        widgets_filters['time_'+w_id] = time;
    }

    if(typeof who == "undefined" || who == null) { 
        try{
            who = widgets_filters['who_'+w_id];
        }catch (err){
            who = 'only_mine'
        }
    }else{
        widgets_filters['who_'+w_id] = who;
    }

    $.ajax({
        type: "GET",
        data: {'time': time,
                'who': who},
        url: url+w_id+'/'+p_id+'/',
        success: function(data) {
            $("#widget_info-"+w_id).html(data);
            $('#modal_wait_'+w_id).hide();
            if(!$('#widget_footer_'+w_id).hasClass('inactive')){
                show_filter_time(w_id, time);
                show_filter_who(w_id, who);
            }
        }
    });
}

function porcent(id, e, total){
  var total = parseFloat(total, 10);
  var e = parseInt(e, 10);
  var avg = 0.0;
  if (total != 0){
    avg = e / total;
  }
  avg = avg.toFixed(3);
  if (avg > 0.3){
    $('#'+id).html('<spam style="color: red">'+avg+'</spam>')
  }else{
    $('#'+id).text(avg)
  }
}

function apply_filter_time(url, id, time){
    if(!$('#widget_footer_'+id).hasClass('inactive')){
        load_widget(url, id, time)
    }
}

function apply_filter_who(url, id, time, who){
    if(!$('#widget_footer_'+id).hasClass('inactive')){
        load_widget(url, id, time, who)
    }
}

function month_filter(){
  $('.month').each(function (){
    if(!$(this).hasClass('active')){
      $(this).trigger('click');
    }
  })
  $('#YTD_filter').removeClass('active');
  $('#ALL_filter').removeClass('active');
  $('#MTD_filter').addClass('active');
}

function year_filter(){
  $('.year').each(function (){
    if(!$(this).hasClass('active')){
      $(this).trigger('click');
    }
  })
  $('#MTD_filter').removeClass('active');
  $('#ALL_filter').removeClass('active');
  $('#YTD_filter').addClass('active');
}

function global_all_time_filter(){
  $('.all').each(function (){
    if(!$(this).hasClass('active')){
      $(this).trigger('click');
    }
  })
  $('#MTD_filter').removeClass('active');
  $('#YTD_filter').removeClass('active');
  $('#ALL_filter').addClass('active');

  all_time_without_all();
}

function all_time_without_all(){
    $('.month').each(function (){
        var pk = $(this).attr('data-id');
        var url = $('#dash_widget_info-'+pk).attr('data-url');
        var prj = $('#dash_widget_info-'+pk).attr('data-prj');
        
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            if(typeof prj != 'undefined'){
                load_widget_prj(url, pk, prj, 'all')
            }else{
                load_widget(url, pk, 'all');
            }
        }
    })
    $('.year').each(function (){
        var pk = $(this).attr('data-id');
        var url = $('#dash_widget_info-'+pk).attr('data-url');
        var prj = $('#dash_widget_info-'+pk).attr('data-prj');
        
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            if(typeof prj != 'undefined'){
                load_widget_prj(url, pk, prj, 'all')
            }else{
                load_widget(url, pk, 'all');
            }
        }
    })
}

function filter_all(){  
  $('.all_people').each(function (){
    if(!$(this).hasClass('active')){
      $(this).trigger('click');
    }
  })
  $('#ONLY_mine').removeClass('active');
  $('#ALL_people').addClass('active');
}

function filter_mine(){
  $('.only_mine').each(function (){
    if(!$(this).hasClass('active')){
      $(this).trigger('click');
    }
  })
  $('#ALL_people').removeClass('active');
  $('#ONLY_mine').addClass('active');
}

function pro_widget(){
    if(!$('#pro_widget').hasClass('active')){
        $('.pro_widget').each(function (){
            if(!$(this).hasClass('loaded')){
                $(this).addClass('loaded');
                $(this).show()
                var pk = $(this).attr('data-id');
                var url = $(this).attr('data-url');
                var prj = $(this).attr('data-prj');
                if($('#ONLY_mine').hasClass('active')){
                    var who = 'only_mine'
                }else{
                    var who = 'all_people'
                }
                if($('#MTD_filter').hasClass('active')){
                    var time = 'month'
                }else if($('#YTD_filter').hasClass('active')){
                    var time = 'year'
                }else{
                    var time = 'all'
                }
                if(typeof prj != 'undefined'){
                    load_widget_prj(url, pk, prj)
                }else{
                    load_widget(url, pk, time, who);
                }
            }else{
                var pk = $(this).attr('data-id');
                var url = $(this).attr('data-url');
                var prj = $(this).attr('data-prj');

                if($('#ONLY_mine').hasClass('active')){
                    var who = 'only_mine'
                }else{
                    var who = 'all_people'
                }
                if($('#MTD_filter').hasClass('active')){
                    var time = 'month'
                }else if($('#YTD_filter').hasClass('active')){
                    var time = 'year'
                }else{
                    var time = 'all'
                }

                if($(this).find('.all_people').hasClass('active') && who == 'all_people'){
                    if(widgets_filters['time_'+pk] != time){
                        if(typeof prj != 'undefined'){
                            load_widget_prj(url, pk, prj)
                        }else{
                            load_widget(url, pk, time, who);
                        }
                    }
                }else{
                    if(typeof prj != 'undefined'){
                        load_widget_prj(url, pk, prj)
                    }else{
                        load_widget(url, pk, time, who);
                    }
                }
            }
            $(this).show()
        })
        $('#basic_widget').removeClass('active');
        $('#pro_widget').addClass('active');
    }
}

function basic_widget(){
  $('.pro_widget').each(function (){
      $(this).hide();
  })
  $('#pro_widget').removeClass('active');
  $('#basic_widget').addClass('active');
}

function show_popover(pk){
    $('#my_popover_'+pk).popover({
        content: $('#Popovers_'+pk).html(),
        html: true,
        container: 'body',
        //title: "{% blocktrans %}Widget explanation{% endblocktrans %}",
    })
    $('#my_popover_'+pk).popover('show')
    $('#my_popover_'+pk).attr('onclick', 'javascript: hide_popover('+pk+')')
}

function hide_popover(pk){
    $('#my_popover_'+pk).popover('destroy')
    $('#my_popover_'+pk).attr('onclick', 'javascript: show_popover('+pk+')')
}

function open_comments(){
    if($('#OpenComments').hasClass('active')){
        $('#OpenComments').removeClass('active');
        $('#OpenComments').find('.fa-comment').removeClass('btns-active')
        $('#OpenComments').find('.fa-comment').addClass('btns-inactive')
        $('.widget-comment').each(function(){
            var id = $(this).attr('data-id')
            hide_popover(id)
        })
    }else{
        $('#OpenComments').addClass('active');
        $('#OpenComments').find('.fa-comment').addClass('btns-active')
        $('#OpenComments').find('.fa-comment').removeClass('btns-inactive')
        $('.widget-comment').each(function(){
            var id = $(this).attr('data-id')
            show_popover(id);
        })
    }
}

function open_maps(country, city){
    if (typeof country != "undefined" || country != null){
        if (typeof city != "undefined" || city != null){
            var w = window.open('https://www.google.com.ar/maps/search/'+country+',+'+city)
        }else{
            var w = window.open('https://www.google.com.ar/maps/search/'+country)
        }
    }else{
        var w = window.open('https://www.google.com.ar/maps')
    }
}