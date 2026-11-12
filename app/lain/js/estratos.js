$(document).ready(inicio);

var nombresEstratos = [];
var personajes = [];
var actores = [];

function inicio() {
    $("#ventanaModal").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        buttons: {
            Ok: function() {
              $(this).dialog("close");
            }
        }
    });
    

    mostrarEstratos();
    $("#opciones").change(autocompletar);

    for (var i = 0; i < estratos.length; i++) {
        nombresEstratos.push(estratos[i]["nombre"])
    }
    for (var i = 0; i < elencos.length; i++) {
        personajes.push(elencos[i]["personaje"])
    }
    for (var i = 0; i < elencos.length; i++) {
        actores.push(elencos[i]["actor"])
    }

    $("#busqueda").autocomplete({
        source: nombresEstratos
    });

    $("#buscar").click(filtrar);

}

function autocompletar() {
    var opcionElegida = $("#opciones").val();
    if (opcionElegida === "nombre") {
        $("#busqueda").autocomplete({
            source: nombresEstratos
        });
    } else if (opcionElegida === "personaje") {
        $("#busqueda").autocomplete({
            source: personajes
        });
    } else if (opcionElegida === "actor") {
        $("#busqueda").autocomplete({
            source: actores
        });
    }
}

function mostrarEstratos() {
    for (var z = 0; z < estratos.length; z++) {
        mostrarEstratosSubfuncion(z);
    }
}

function mostrarEstratosSubfuncion(x) {
    $("section div:eq(2)").append("\n\
    <a href='estrato.html?est="+ x + "'>\n\
        <article>\n\
            <figure>\n\
                <img src='img/estratos/"+ estratos[x]["imagen"][0] + "' alt='" + estratos[x]["nombre"] + "'>\n\
                <figcaption><h3>"+ estratos[x]["nombre"] + "</h3>\n\
            </figure>\n\
        </article>\n\
    </a>\n\
    ")
}


function filtrar() {
    var opcionElegida = $("#opciones").val();
    var filtro = $("#busqueda").val();
    $("div:eq(2)").empty();
    var alertador = true;
    for (var i = 0; i < estratos.length; i++) {
        if (opcionElegida === "nombre" && estratos[i]["nombre"] === filtro) {
            mostrarEstratosSubfuncion(i);
            alertador = false;
        } else if (opcionElegida === "personaje") {
            for (var j = 0; j < estratos[i]["elenco"].length; j++) {
                if (filtro === estratos[i]["elenco"][j]["personaje"]) {
                    mostrarEstratosSubfuncion(i);
                    alertador = false;
                }
            }
        } else if (opcionElegida === "actor") {
            for (var j = 0; j < estratos[i]["elenco"].length; j++) {
                if (filtro === estratos[i]["elenco"][j]["actor"]) {
                    mostrarEstratosSubfuncion(i);
                    alertador = false;
                }
            }
        }
    }

    if (alertador === true) {
        mostrarEstratos();
        $("#ventanaModal").dialog("open", "modal", true);
    } else {
        $("div:eq(1) p").empty();
    }
}