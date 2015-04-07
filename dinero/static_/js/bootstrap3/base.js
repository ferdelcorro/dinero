var default_term;
var urls;
var ids;
var default_wiki;
var arrow_open;

$('.body-content').scroll(function(){
    resize_navbar()
});

$("#menu_btn").click(function(e){
    show_menu(e)
});

$("#btnHelpOpen").click(function(e){
    open_help(e)
});

$("#more_btn").click(function(){
    slide_content_bar()
});

function change_icon_nav(size){
  var icons_array = $('.navbar-pic');
  $.each(icons_array, function(index, objects){
    var icon = $(objects).attr('src')
    if (size == 'small'){
      icon = icon.replace('40x40', '18x18');
    }
    else{
      icon = icon.replace('18x18', '40x40');
    }
    $(objects).attr('src', icon)
  });
}

function navbar_small(){
    $("#main_navbar").addClass('navbar-small');
    $("#main_navbar .navbar-icon").addClass('navbar-icon-small');
    $("#main_navbar .navbar-pic").addClass('navbar-pic-small');
    $("#main_navbar .nav .menu-btn").addClass('menu-btn-small');
    $("#main_navbar .navbar-brand").addClass('navbar-brand-small');
    $("#main_navbar .navbar-user").addClass('navbar-user-small');
    $("#main_navbar .user-rol").hide();
    change_icon_nav('small');
    $('.nav-bar-quick-icons').addClass('padding-small-icons');
    $("#secondary_navbar").slideUp(100);
    $("#third_navbar").addClass('content-navbar-small', 100);
    $("#sections_navbar").hide();
    $("#body-wrapper").addClass('expanded');

    $('#article_help').addClass('content-navbar-small')
    //$("#secondary_navbar").addClass('content-navbar-small',00);
}

function navbar_expanded(){
    $("#secondary_navbar").slideDown(200);
    $("#third_navbar").removeClass('content-navbar-small', 200);
    //$("#secondary_navbar").removeClass('content-navbar-small', 0);
    change_icon_nav('big');
    $("#main_navbar").removeAttr("style")
    $("#main_navbar").removeClass('navbar-small');
    $("#main_navbar .navbar-icon").removeClass('navbar-icon-small');
    $("#main_navbar .navbar-pic").removeClass('navbar-pic-small');
    $("#main_navbar .nav .menu-btn").removeClass('menu-btn-small');
    $("#main_navbar .navbar-brand").removeClass('navbar-brand-small');
    $("#main_navbar .navbar-user").removeClass('navbar-user-small');
    $('.nav-bar-quick-icons').removeClass('padding-small-icons');
    $("#main_navbar .user-rol").hide();
    $("#sections_navbar").show();

    $("#body-wrapper").removeClass('expanded');
    $('#article_help').removeClass('content-navbar-small')
}

function resize_navbar(){
    if($('.body-content').scrollTop() > 15){
      if (!$("#main_navbar").hasClass('navbar-small')){
        navbar_small();
      }
    }
    else{
      if ($("#main_navbar").hasClass('navbar-small')){
        navbar_expanded();
      }
    }
}

function show_menu(e){
    if($("#left_menu").is(":hidden")){
        $("#left_menu").fadeIn(200);
        e.stopPropagation();
        $('body').unbind('click');
        $('body').click(function(){
            $(".popover").popover('hide');
            $("#left_menu").fadeOut(200)
        });
    }
    else{
        $("#left_menu").fadeOut();
        $(".popover").popover('hide');
        $('body').unbind('click');
    }
}

function slide_content_bar(){
    var fill = '<div class="btn-group sec-btn-hidden"><button type="button" class="btn btn-default disabled">&nbsp;</button></div>'
    if($(".sec-btn-hidden").length < 7){
        to_fill = 7 - $(".sec-btn-hidden").length
        for (i = 1; i <= to_fill; i++){
            $(".sec-btn-hidden :last").parent().after($.parseHTML(fill))
        }
    }
    var hidden_elements = $(".sec-btn-hidden");
    var visible_elements = $(".sec-btn-visible");
    visible_elements.removeClass('sec-btn-visible');
    visible_elements.addClass('sec-btn-hidden')
    hidden_elements.removeClass('sec-btn-hidden');
    hidden_elements.addClass('sec-btn-visible');
    $("#more_btn .btn").text() == "Next" ? $("#more_btn .btn").text("Previous") : $("#more_btn .btn").text("Next");
}
function get_notifications(){
      $.getJSON(
        "/msg/ntf/new/",
      function(data)
      {
        var content = ''
        if(data.count_new != '0'){
          content += '<div class="navbar-pic" style="background-color: red; padding: 5px; font-size: 1.5rem; font-weight: bold; text-align: center; opacity:1" id="notifcation_icon_area" data-toggle="dropdown" href="#menu1" src=""'
          content += ' onclick="javascript: get_list_notifications()" >'
          content += data.count_new
          content += '</div>'
          $('#notificaction_area').css('opacity', '1')
        }
        else if(data.pending != '0'){
          content += '<a href="#"><img class="navbar-pic" src="/static/img/icons/top-navbar-icons/40x40/bell-notifications.png"  id="notifcation_icon_area" data-toggle="dropdown" href="#menu1" src=""'
          content += ' onclick="javascript: get_list_notifications()" ></img></a>'
        }
        content += '<ul id="notification-list" class="dropdown-menu"></ul>'
        $('#notificaction_area').html(content)
    });
  }

  function get_list_notifications(){
      $.getJSON(
        "/msg/ntf/list/", 
        function(data){
          {
            $('#bar_notification_icon').hide();
            $('#notification_icon').hide();
            var menu = '';
            $.each(data, function(i, val) {
                $('#bar_notification_icon').show();
                $('#notification_icon').show();
                if (i > 0){
                  menu += '<li class="divider" style="margin: 0px 1px;"></li>'  
                }
                menu += '<li><a style="padding: 4px; background-color: transparent; background-image: none;" href="'+val.url+'">'
                menu += '<table style="width: 250px; color: rgb(88, 88, 88);"><tr><td style="width: 45px;"  class="no-padding">'
                if (val.picture != ''){
                  menu += '<img src="'+val.picture+'" style="min-width: 41px; max-width: 41px; padding: 3px;" title="'+val.author+'">'
                }
                else{
                  menu += '<i class="fa fa-bell" style="font-size: 26px; text-align: center; padding: 8px;"></i>'
                }
                menu += '</td><td style="width: 205px;" class="no-padding">'
                menu += '<table style="width: 267px;"><tr><td  class="no-padding">'+val.type+'</td><td  class="no-padding"></td><td style="text-align: right;" class="no-padding">'+val.date+' <a style="padding: 4px;" href="javascript: read_notifications(\''+val.id+'\')"><i class="fa fa-trash-o" style="font-size: 15px"></i></a></td><tr>'
                menu += '<tr><td colspan="3"  class="no-padding">' +val.description+'</td></tr></table>'
                menu += '</td><tr></table>'
                menu += '</a></li>'
            });
            var content = ''
            content += '<img class="navbar-pic" src="/static/img/icons/top-navbar-icons/40x40/bell-notifications.png"  id="notifcation_icon_area" data-toggle="dropdown" href="#menu1" src=""'
            content += ' onclick="javascript: get_list_notifications()" ></img>'
            content += '<ul id="notification-list" class="dropdown-menu"></ul>'
            $('#notificaction_area').html(content)
            $('#notification-list').html(menu)
          }
      });
  }

  function read_notifications(id) {
    $.ajax({
      type: "GET",
      url: "/msg/ntf/read/"+id+"/",
      success:
      function(data)
      {
        if(data == 'OK'){
          get_notifications()
        }
        else{
          alert(data);
        }
      }
    });
  }

  $(document).ready(function(){
    $('#article_help').hide();
    get_notifications();

    $('.btn-edit').click(function(){
      var target = '#' + $(this).attr('target');
      $(target + ' .edit').toggle();
      $(target + ' .display').toggle();
      $(this).toggleClass('active');
    });

    $('.btn-minimize').click(function(){
      $(this).toggleClass('active');
      var $panel_body = $(this).parent().siblings();
      $panel_body.slideToggle();
    })
  });

  function $_GET(param)
  {
  /* Obtener la url completa */
  var url = document.URL;
  /* Buscar a partir del signo de interrogación ? */
  url = String(url.match(/\?+.+/));
  /* limpiar la cadena quitándole el signo ? */
  url = url.replace("?", "");
  /* Crear un array con parametro=valor */
  url = url.split("&");

  /* 
  Recorrer el array url
  obtener el valor y dividirlo en dos partes a través del signo = 
  0 = parametro
  1 = valor
  Si el parámetro existe devolver su valor
  */
  x = 0;
  while (x < url.length)
  {
  p = url[x].split("=");
  if (p[0] == param)
  {
  return decodeURIComponent(p[1]);
  }
  x++;
  }
}


function order(col) {
  url = location.href
  if (url[url.length-1] == '/'){
    url += '?order='+col
  }
  else{
    parametro = $_GET('order')
    if (parametro == null) {
      parametro = col
      url += '&order='+parametro
    }
    else{
      parametro = parametro.replace('-'+col, '')
      parametro = parametro.replace(col.replace('-', ''), '')
      parametro += '.'+col
      if (parametro[0] == '.'){
        parametro = parametro.substring(1);
      }
      parametro = parametro.replace('..', '.')
    }
    url = url.replace("?order="+$_GET('order'),'?order='+parametro)
    url = url.replace("&order="+$_GET('order'),'&order='+parametro)
  }
  location.href = url
}

function clear_order(col) {
  url = location.href
  parametro = $_GET('order')
    if (parametro == null) {
      parametro = col
    }
    else{
      parametro = parametro.replace('-'+col, '')
      parametro = parametro.replace(col.replace('-', ''), '')
      if (parametro[0] == '.'){
        parametro = parametro.substring(1);
      }
      if (parametro[parametro.length-1] == '.'){
        parametro = parametro.substring(0,parametro.length-1);
      }
      parametro = parametro.replace('..', '.')
    }
    url = url.replace("?order="+$_GET('order'),'?order='+parametro)
    url = url.replace("&order="+$_GET('order'),'&order='+parametro)
    url = url.replace("?order=&",'?')
    if (parametro == '')
    {
      url = url.replace("?order=",'') 
      url = url.replace("&order=",'') 
    }else{
      url = url.replace("&order=&",'&')
    }
  location.href = url
}

function change_status(status){
  $('[name="status"]').val(status)
  if (status == "active"){
    $('#status_active').addClass('active');
    $('#status_in_active').removeClass('active');
    $('#status_all').removeClass('active');
  }
  else if (status == "in_active"){
    $('#status_in_active').addClass('active');
    $('#status_active').removeClass('active');
    $('#status_all').removeClass('active');
  }
  else if (status == "all"){
    $('#status_all').addClass('active');
    $('#status_active').removeClass('active');
    $('#status_in_active').removeClass('active');
  }
}

function clicked_change_status(status){
  change_status(status)
  $('#filter_console').submit();
}

function clear_selections() {
  var $checks = $('[id^="chk_"]');
  $('input:checkbox:checked').removeAttr('checked');
  update_selection();
}

function update_selection() {
  var totalChecked = $('[id^="chk_"]:input:checkbox:checked').length;
  if (totalChecked > 0) {
      $('#alert_selection_count').html(totalChecked);
      $('#alert_selection').slideDown();
    } else {
      $('#alert_selection').slideUp();
    }
}

$('#check_all').click(function(){
  var array_check = $('[id^="chk_"]');
  $.each(array_check, function(index, objects){
    $(objects).prop("checked", $('#check_all').is(':checked'));
  });
  update_selection();
});

$('[id^="chk_"]').click(function() {
  update_selection();
});


content_menu = '<h3 class="pull-left">Menu</h3><br><hr>'
content_menu += '<div class="popover-content" style="padding: 9px 14px 30px">'
content_menu += '<a href="/connectors/login_to_frank/"><li class="nav-bar-quick-icons">'
content_menu += '<img class="navbar-pic" src="/static/img/icons/top-navbar-icons/40x40/Swith-cia.png"></img>'
content_menu += '</li></a>'
content_menu += '</div>'

$('#el_super_menu').popover(
  {
    content: content_menu,
    placement: 'bottom',
    html: true
  }
);


function toggleSidebar(){
  $('#body-wrapper').toggleClass('toggled');
  return;
}

function expand_sidebar(){
  if($('#btnContract').hasClass('active')){
    $('#btnContract').removeClass('active');
    $('#btnExpand').addClass('active');
    $('#btnExpand_img').attr('src', '/static/img/icons/contract-icons/Pantalla_completa_activa.png')
    $('#btnContract_img').attr('src', '/static/img/icons/contract-icons/Pantalla_parcial_inactiva.png')

    var a = $('.transparency2')
    a.removeClass('transparency2')
    a.addClass('transparency')
    toggleSidebar();

    toggleWidget_lg();

    try{
      contract_cal();
    }
    catch(e){
      var a = 1;
    }
    
    //var options = { direction: 'right' };
    //$('#info-right-box').hide('slide', options, 1000, function() {
    //  $('.left-col').toggleClass('col-md-9', 'col-md-11');
    //  $('.left-col').toggleClass('col-lg-9', 'col-lg-11');
    //})
  }
}

function contract_sidebar() {  
  if($('#btnExpand').hasClass('active')) {
    $('#btnExpand').removeClass('active');
    $('#btnContract').addClass('active');
    $('#btnExpand_img').attr('src', '/static/img/icons/contract-icons/Pantalla_completa_Inactiva.png')
    $('#btnContract_img').attr('src', '/static/img/icons/contract-icons/Pantalla_parcial_activa.png')
    var a = $('.transparency')
    a.removeClass('transparency')
    a.addClass('transparency2')
    toggleSidebar();
    
    toggleWidget_lg();

    try{
      expand_cal();
    }
    catch(e){
      var a = 1;
    }
  }  
}


function toggleWidget_lg(){
  $('.dashboard-widget-frame').each(function(){
    if($($(this).parent()).hasClass('welcome')){
      if($($(this).parent()).hasClass('col-lg-4')){
        $($(this).parent()).removeClass('col-lg-4');
        $($(this).parent()).addClass('col-lg-3');
      }else{
        $($(this).parent()).removeClass('col-lg-3');
        $($(this).parent()).addClass('col-lg-4');
      }
    }
  });
}


$('#btnContract').click(function(e) {
  contract_sidebar();
  try{
    unfixed_header()
  }
  catch(e){
    var a = 1;
  }
});


$('#btnExpand').click(function(e) {
  expand_sidebar();
  try{
    unfixed_header()
  }
  catch(e){
    var a = 1;
  }
});

function contract_right_col() {
  var options = { direction: 'right' };
  $('.right-col').toggle('slide', options, 1000);
  $('.left-col').toggleClass('col-md-9', 'col-md-11');
  $('.left-col').toggleClass('col-lg-9', 'col-lg-11');
  $('#info-right-box').fadeIn(1000, function() {
    $('#btnContract').addClass('active');
  })
  try{
    expand_cal();
  }
  catch(e){
    var a = 1;
  }
}

jQuery.fn.putCursor = function() {

  return this.each(function() {

    $(this).focus()

    // If this function exists...
    if (this.setSelectionRange) {
      // ... then use it (Doesn't work in IE)

      // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      var len = $(this).val().length * 2;

      this.setSelectionRange(len, len);
    
    } else {
    // ... otherwise replace the contents with itself
    // (Doesn't work in Google Chrome)

      $(this).val($(this).val());
      
    }

    // Scroll to the bottom, in case we're in a tall textarea
    // (Necessary for Firefox and Google Chrome)
    this.scrollTop = 999999;

  });

};

function validate_errors(name_form, json_errors){
  $('#'+name_form).find('.has-error').removeClass('has-error');
  for (var key in json_errors) {
    $('#'+name_form).find('#id_'+key).parent().addClass('has-error')
    $('#'+name_form).find('#id_'+key).tooltip({
      title: json_errors[key], placement: 'bottom'
    })
  }
  $($('.has-error')[0]).children().putCursor()
}


jQuery.fn.company_autocomplete = function(data) {
  var v_data_field = '#' + data['data_field'] || '';
  var v_source = data['data_url'] || '/ast/query/companies';

  $(this).autocomplete({
      source: v_source,
      minLength: 2,
      search  : function(){$(this).addClass('working');},
      open    : function(){$(this).removeClass('working');},
      response: function(event, ui) {
        if (ui.content.length === 0){
          $(v_data_field).val('');
          $(this).removeClass('working');
          $(this).removeClass('ui-selected-option');
        }
      },
      select: function (event, ui) {
          $(v_data_field).val(ui.item.id);
          $(this).addClass('ui-selected-option');
      },
    }
  )
  .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
    return $( "<li>" )
    .append("<a>"+"<div class='ac ac-img'><img src='" + item.logo_url + "'></div><div class='ac ac-name'><b>" + item.label + "</b><br>" + item.location + "</div>" + "</a></li>" )
    .appendTo( ul );
  };

  $(this).on("input",function(e) {
      $(v_data_field).val('');
      $(this).removeClass('ui-selected-option');
  });

  $(this).blur(function() {
    if ( $(v_data_field).val() == '' ) {
          $(this).removeClass('ui-selected-option');
    }
  });

}


jQuery.fn.email_autocomplete = function(values_id, receiver) {
//  try {
      var v_source = "/ast/query/users";
      $(this).autoSuggest(v_source, {
          queryParam: "term",
          selectedValuesProp: "id",
          startText: "Name or email address...",
          minChars: 2,
          asHtmlID: values_id,
          formatList: function(data, elem) {
              var label = "<div class='ac ac-img'><img src='" + data.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + data.value + "</b><br><span class='ac-info'>" + data.email + "</span></div>"
              var new_elem = elem.html(label);
              return new_elem;
              }
      });        
//  } catch(err) {};
}

jQuery.fn.email_autocomplete2 = function(data) {
//  try {
      var v_source = data['data_url'] || "/ast/query/users";
      $(this).autoSuggest(v_source, {
          queryParam: "term",
          extraParams: data['extraParams'] || '',
          preFill: data['preFill'] || '',
          selectedValuesProp: "id",
          startText: data['startText'] || "Name or email address...",
          preFill: data['preFill'] || '',
          minChars: 2,
          asHtmlID: data['data_field'] || false,
          flat: data['flat'] || false,
          formatList: function(rdata, elem) {
              var label = "<div class='ac ac-img'><img src='" + rdata.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + rdata.value + "</b><br><span class='ac-info'>" + rdata.email + "</span></div>"
              var new_elem = elem.html(label);
              return new_elem;
              }
      });        
//  } catch(err) {};
}


jQuery.fn.user_autocomplete = function(data) {

  var v_source = data['data_url'];
  var dest_img = data['dest_img'];
  var dest_name = data['dest_name'];
  var dest_email = data['dest_email'];
  var btn_2_enable = data['btn_2_enable'] || false;

  $(this).autoSuggest(v_source, {
      queryParam: "term",
      extraParams: data['extraParams'] || '',
      preFill: data['preFill'] || '',
      selectedValuesProp: "id",
      startText: data['startText'] || "Name or email address...",
      minChars: 2,
      selectionLimit: data['selectionLimit'] || false,
      asHtmlID: data['data_field'] || false,
      formatList: function(rdata, elem) {
          var label = "<div class='ac ac-img'><img src='" + rdata.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + rdata.value + "</b><br><span class='ac-info'>" + rdata.email + "</span></div>"
          var new_elem = elem.html(label);
          return new_elem;
      },
      selectionAdded: function(elem) {
        if (btn_2_enable) {
          $('#'+btn_2_enable).removeAttr('disabled');
        }
      }
  });        
}


function generate_select_input(id_campo, options)
{
    $('#'+id_campo).textext({
        plugins : 'autocomplete arrow',
    })
    .bind('getSuggestions', function(e, data)
    {
        var list = options,
            textext = $(e.target).textext()[0],
            query = (data ? data.query : '') || ''
            ;
        $(this).trigger(
            'setSuggestions',
            { result : textext.itemManager().filter(list, query) }
        );
    })
}


jQuery.fn.contact_autocomplete_1 = function(data) {
  var v_data_field = '#' + data['data_field'] || '';
  var v_source = data['data_url'] || '/contacts/query/contacts/';

  $(this).autocomplete({
      source: v_source,
      minLength: 2,
      search  : function(){$(this).addClass('working');},
      open    : function(){$(this).removeClass('working');},
      response: function(event, ui) {
        if (ui.content.length === 0){
          $(v_data_field).val('');
          $(this).removeClass('working');
          $(this).removeClass('ui-selected-option');
        }
      },
      select: function (event, ui) {
          $(v_data_field).val(ui.item.id);
          $(this).addClass('ui-selected-option');
      },
    }
  )
  .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
    data = "<a>";
    data = data + "  <div class='ac ac-img'><img src='" + item.photo_url + "'></div>";
    data = data + "  <div class='ac ac-name'><b>" + item.name + "</b><br><span class='ac-info'>" + item.company + "</span></div>";
    data = data + "  <div class='ac ac-info'>" + item.email + "</div>";
    data = data + "</a></li>" ;
    return $( "<li>" )
    .append(data)
    .appendTo( ul );
  };

  $(this).on("input",function(e) {
      $(v_data_field).val('');
      $(this).removeClass('ui-selected-option');
  });

  $(this).blur(function() {
    if ( $(v_data_field).val() == '' ) {
          $(this).removeClass('ui-selected-option');
    }
  });

}

function helpOpen(node) {
  load_wiki(node);
}

function open_help(e) {
  if($('#article_help').is(':hidden')){
    $('#article_help').show("slide", { direction: "right" }, 500);
  }else{
    $('#article_help').hide("slide", { direction: "right" }, 500);
    default_term = null;
  }
  
  e.stopPropagation();
  $('body').unbind('click');
  $("#article_help").click(function(e){
    e.stopPropagation();
  });
  $('body').click(function(){
      $('#article_help').hide("slide", { direction: "right" }, 500);
  });
}

function load_wiki(node, e) {
    if (typeof node === "undefined" || node === null) { 
      node = help_id_access;
    }
    if(node == 'home'){
      $.ajax({
        type: "GET",
        url: "/library/home_help/",
        success: function(data){
            $("#help_navbar").html(data);
            $("#fer_search").hide()
            $('#article').hide()
            
            try {
                external_hide(); //para external_article_help
            }
            catch(err) {
                //
            }
        },
        dataType: 'html'
      });
    }else{
      $.ajax({
        type: "GET",
        url: "/library/my_article/" + node + "/",
        //data: {'wiki': node},
        success: function(data){
            $("#help_navbar").html(data);
            $("#fer_search").hide()
            $('#default_home').hide()
            try {
                external_hide(); //para external_article_help
            }
            catch(err) {
                //
            }
        },
        dataType: 'html'
      });
    }
}

function search(e){
    if(e.keyCode == 13){
        search_wiki($('#term').value)
    }
}

function library_search(node) {
    default_term = node;
    $.ajax({
        type: "GET",
        url: "/library/my_search/",
        data: {
            'term': node,
        },
        success: function(data){
            $("#help_navbar").html(data);
            $('#help_home').hide()
            $('#btnHelpClose').show()
            $('#fer_search').show()
            try {
                external_hide(); //para external_article_help
            }
            catch(err) {
                //
            }
        },
        dataType: 'html'
    });
}

function search_wiki() {
    var wiki = $("#term").val()
    if(wiki){
        if(typeof arrow_open != 'undefined'){
          $('#collapse-'+arrow_open).collapse('hide')
          $('#sort-up-'+arrow_open).hide()
          $('#sort-desc-'+arrow_open).show()
          arrow_open = undefined;
        }
        library_search(wiki)
    }else{
        alert('No ha ingresado un parámetro de búsqueda')
    }
}

function changeArrow(node) {
    var desc = $('#sort-desc-'+node)
    var up = $('#sort-up-'+node)
    var body = $('#collapse-'+node)
    var collapse = $('#collapse-'+node).hasClass('in')
    if($(desc).is(':visible') && !collapse){

        if(node != arrow_open){
            $('#collapse-'+arrow_open).collapse('hide')
            $('#sort-up-'+arrow_open).hide()
            $('#sort-desc-'+arrow_open).show()
        }
        body.collapse('show')
        desc.hide()
        up.show()
        arrow_open = node
    }else{
        if(!desc.is(':visible') && collapse){
            body.collapse('hide')
            up.hide()
            desc.show()
        }
    }
}

function external_help() {
  //var w = window.open('/external_article_help/')
  if(default_term){
    var w = window.open('/external_article_help/'+default_term+'/')
  }else{
    var w = window.open('/external_article_help/')
  }
}

$('.children_a').click(function( event ) {
  event.preventDefault();
  var pk = e.attr("href").split('/library/article/')[1]
  alert(pk)
  pk = pk.replace('/', '')
  alert(pk)
  load_wiki(pk);
});

function show_select_children(pk){
  e.preventDefault();
  var pk = e.attr("href").split('/library/article/')[1]
  pk = pk.replace('/', '')
  load_wiki(pk);
}
