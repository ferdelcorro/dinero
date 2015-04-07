function agregarEstados(form){
    var selec = form.country.options;
    for (i = 1; i < selec.length; i++) {

        if (selec[i].selected == true){
            location.href = '/prueba/' + selec[i].value + '/';
        }

    }
}

function agregarCiudades(form){
    var selec = form.state.options;
    for (i = 1; i < selec.length; i++) {

        if (selec[i].selected == true){
            var loc = document.location.href;
            var getString = loc.split('prueba/')[1];
            getString = getString.split('/')[0];
            location.href = '/prueba/' + getString + '/' + selec[i].value + '/';
        }

    }
}