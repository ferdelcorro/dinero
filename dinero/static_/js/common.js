function toggle(element) {
        var ele = document.getElementById(element);
        if(ele.style.display == "") {
                ele.style.display = "none";
        }
        else {
            ele.style.display = "";
        }
    } 


function change_class(elementID, newClass) {
    $('#'+elementID).attr('class', newClass)
	// var element = document.getElementById(elementID);
	
	// element.setAttribute("class", newClass); //For Most Browsers
	// element.setAttribute("className", newClass); //For IE; harmless to other browsers.
}


function load_page(url) {
    window.location.href = url;
}


function email_autocomplete(v_txt_field, values_id, receiver) {
    try {
        $(v_txt_field).autoSuggest("/ast/query/users", {
            queryParam: "term",
            preFill: receiver,
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
    } catch(err) {};
}

function user_autocomplete(v_txt_field, v_data_field, v_source, dest_img, dest_name, dest_email, btn_2_enable) {
    $( v_txt_field ).autocomplete({
        source: v_source,
        search  : function(){$(this).addClass('working');},
        open    : function(){$(this).removeClass('working');},
        response: function(event, ui) {
            if (ui.content.length === 0) {
                $(v_data_field).val('');
                $(dest_name).html('');
                $(dest_email).html('');
                $(dest_img).attr('src','');
                $(this).removeClass('working');
                }
            },
        select: function (event, ui) { 
            $(v_data_field).val(ui.item.id);
            $(dest_name).html(ui.item.name);
            $(dest_email).html(ui.item.email);
            $(dest_img).attr("src",ui.item.photo_url);
            $(btn_2_enable).removeAttr("disabled");
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
            .append("<a>"+"<div class='ac ac-img'><img src='" + item.photo_url + "'></div>" + "<div class='ac ac-name'><b>" + item.name + "</b><br><span class='email'>" + item.email + "</span></div>" + "</a>" )
            .appendTo( ul );
            };
}

function company_autocomplete (v_txt_field, v_data_field, v_source) {
    $( v_txt_field ).autocomplete({
        source: v_source,
        search  : function(){$(this).addClass('working');},
        open    : function(){$(this).removeClass('working');},
        response: function(event, ui) {
            if (ui.content.length === 0) {
                $(v_data_field).val('');
                $(this).removeClass('working');
                }
            },
        select: function (event, ui) {
            $(v_data_field).val(ui.item.id);
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
            .append("<a>"+"<div class='ac ac-img'><img src='" + item.logo_url + "'></div><div class='ac ac-name'><b>" + item.label + "</b><br>" + item.location + "</div>" + "</a>" )
            .appendTo( ul );
            };
}

function client_autocomplete (v_txt_field, v_data_field, v_company) {
    var source = "/ast/query/c_clients/?company_id="+v_company;
    company_autocomplete(v_txt_field, v_data_field, source);
}

function project_autocomplete (v_txt_field, v_data_field, v_source) {
    $( v_txt_field ).autocomplete({
        source: v_source,
        search  : function(){$(this).addClass('working');},
        open    : function(){$(this).removeClass('working');},
        response: function(event, ui) {
            if (ui.content.length === 0) {
                $(v_data_field).val('');
                $(this).removeClass('working');
                }
            },
        select: function (event, ui) {
            $(v_data_field).val(ui.item.id);
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
            .append("<a>"+"<div class='ac ac-img'><img src='" + item.photo_url + "'></div><div class='ac ac-name'><b>" + item.label + "</b><br>" + item.code + ' | ' + item.client + "</div>" + "</a>" )
            .appendTo( ul );
            };
}

function system_autocomplete (v_txt_field, v_data_field, v_source) {
    $( v_txt_field ).autocomplete({
        source: v_source,
        search  : function(){$(this).addClass('working');},
        open    : function(){$(this).removeClass('working');},
        select: function (event, ui) {
            $(v_data_field).val(ui.item.id);
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
            .append("<a>"+"<div class='ac ac-img'><img src='/img/icons/app-icon-gray.png'></div><div class='ac ac-name'><b>" + item.label + "</b></div></a>" )
            .appendTo( ul );
            };
}

function order(col) {
    $('#order').val(col);
    $('#queryform').submit();
}


function search_button(launcher, div_search, search_field, data_list){
    $.expr[':'].containsIgnoreCase = function(n,i,m){
        return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };

    $(launcher).click(function() {
        $(launcher).hide();
        $(div_search).toggle( "slide", {direction: 'right'});
    });

    close_icon = search_field + "-close"
    $(close_icon).click(function() {
        $(div_search).toggle( "slide", {direction: 'right'}, function () {
            $(launcher).show();
            $(search_field).val('');
        });
        $(data_list).find("li").show();            
    });

    $(search_field).keyup(function(){
        //split the current value of searchInput
        var data = this.value.split(" ");
        //if empty show all rows //
        if (data == "") {
            $(data_list).find("li").show();
        }
        else {
            //hide all the rows
            $(data_list).find("li").hide();
            //create a jquery object of the rows
            var jo = $(data_list).find("li");
            //Recursively filter the jquery object to get results. 
            $.each(data, function(i, v){
                jo = jo.filter("*:containsIgnoreCase('"+v+"')");
            });
            //show the rows that match.
            jo.show();
            //Removes the placeholder text             
        }
    }).focus(function(){
          this.value="";
          $(this).css({"color":"black"});
          $(this).unbind('focus');
      }).css({"color":"#C0C0C0"});
}

function location_autocomplete (v_txt_field, v_data_field, v_source) {
    $( v_txt_field ).autocomplete({
        source: v_source,
        search  : function(){$(this).addClass('working');},
        open    : function(){$(this).removeClass('working');},
        response: function(event, ui) {
            if (ui.content.length === 0) {
                $(v_data_field).val('');
                $(this).removeClass('working');
                }
            },
        select: function (event, ui) {
            $(v_data_field).val(ui.item.id);
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            html = "<a>" + "<div class='ac ac-single-line'>" + item.label + "</div>" + "</a>";
            return $( "<li>" )
            .append( html )
            .appendTo( ul );
            };
}

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};


function setGetParameter(paramName, paramValue) {
    // Agrega o modifica un parametro GET (en URL actual), y redirecciona (Reload)
    var url = window.location.href;
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
    if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
    else
        url += "&" + paramName + "=" + paramValue;
    }
    window.location.href = url;
}
