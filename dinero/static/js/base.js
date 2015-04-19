function time(url, intervalo, dato){
	if(dato == 's'){
		if(intervalo == 'year'){
			$('#sueldo_all').removeClass('active')
			$('#sueldo_year').addClass('active')
		}else{
			$('#sueldo_year').removeClass('active')
			$('#sueldo_all').addClass('active')
		}
	}else{
		if(intervalo == 'year'){
			$('#gasto_all').removeClass('active')
			$('#gasto_month').removeClass('active')
			$('#gasto_year').addClass('active')
		}else if(intervalo == 'all'){
			$('#gasto_year').removeClass('active')
			$('#gasto_month').removeClass('active')
			$('#gasto_all').addClass('active')
		}else{
			$('#gasto_all').removeClass('active')
			$('#gasto_year').removeClass('active')
			$('#gasto_month').addClass('active')
		}
	}
	
	$.ajax({
		type: "GET",
		data: {'time': intervalo,},
		url: url,
		success: function(data) {
			$("#sueldos_id").html(data);
		}
	});
}

$(function() {
	$( ".date-field" ).datepicker();
});

function search(e, url){
	if(e.keyCode == 13){
		library_search($('#term').val(), url)
	}
}

function library_search(node, url) {
	if(node){
		$.ajax({
			type: "GET",
			url: url+"buscar/",
			data: {
				'term': node,
			},
			success: function(data){
				$("#productos_id").html(data);
			},
			dataType: 'html'
		});
	}else{
		alert('No ha ingresado un parámetro de búsqueda')
	}
}

function buscar_balance(e){
	var from = $('#date_from').val()
	var to = $('#date_to').val()

	$.ajax({
		type: "GET",
		url: '/dinero/filter_balance/',
		data: {
			'from': from,
			'to': to,
		},
		success: function(data){
			$("#balance_body").html(data);
		},
		dataType: 'html'
	});
}

function validate_errors(name_form, json_errors){
    //$('#'+name_form).find('.has-error').removeClass('has-error');
    for (var key in json_errors) {
    	//$('#'+name_form).find('#id_'+key).parent().addClass('has-error')
    	$('#'+name_form).find('#id_'+key).addClass('has-error')
    	$('#'+name_form).find('#id_'+key).tooltip({
	      title: json_errors[key], placement: 'bottom'
	    })
    }
  	//$($('.has-error')[0]).children().putCursor()
}

function eliminar(url, tipo, id, confirmed){
    if(confirmed){
        var $form = $('#form');
        var post_data = $form.serialize();
        post_data['id'] = id
        $.post(url, post_data, function(response){
        	$('#borrar_modal').hide();
            switch (response.result) {
                case 'ERROR':
                    alert('Ha ocurrido un error, refresque e intente nuevamente')
                    break
                case 'OK':
                	location.reload();
            }
        }, 'json');
    }else{
        $.ajax({
            type: "GET",
            url: url,
            data: {
                'id': id,
            },
            success: function(data){
                $('#borrar_modal').html(data);
                $('#'+tipo).modal('show');
            },
            dataType: 'html'
        });
    }
    
}

function modificar(url, tipo, id, confirmed){
    if(confirmed){
        var $form = $('#form');
        var post_data = $form.serialize();
        post_data['id'] = id
        $.post(url, post_data, function(response){
            switch (response.result) {
                case 'ERROR':
                    validate_errors('form', response.errors);
                    break
                case 'OK':
                	$('#modificar_modal').hide();
                	location.reload();
            }
        }, 'json');
    }else{
        $.ajax({
            type: "GET",
            url: url,
            data: {
                'id': id,
            },
            success: function(data){
                $('#modificar_modal').html(data);
                $('#'+tipo).modal('show');
            },
            dataType: 'html'
        });
    }
    
}

function tarjeta_select(tarjeta){
	if (tarjeta.value != ''){
		var url = '/tarjeta/tarjeta_selected/'+tarjeta.value+'/'
		$.ajax({
            type: "GET",
            url: url,
            success: function(data){
                $('#beneficios').html(data);
            },
            dataType: 'html'
        });
	}
}

function beneficio_select(beneficio){
	if (beneficio.value != ''){
		var url = '/tarjeta/beneficio_selected/'+beneficio.value+'/'
		$.ajax({
            type: "GET",
            url: url,
            success: function(data){
                $('#modal').html(data);
                $('#modificar_beneficio').modal('show');
            },
            dataType: 'html'
        });
	}
}

function ver_valor(url, pk, modal){
    $.ajax({
        type: "GET",
        url: url+pk+'/',
        success: function(data){
            $('#modal').html(data);
            $('#'+modal).modal('show');
        },
        dataType: 'html'
    });
}