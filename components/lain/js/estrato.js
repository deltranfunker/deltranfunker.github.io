var ruta = window.location.href;
var posicion = ruta.indexOf("=");
var nroEstrato = ruta.substring(posicion + 1);

$(document).ready(inicio);

function inicio() {
    $("title").html(estratos[nroEstrato]["nombre"]);
    $("article:eq(0)").html("\n\
    <div>\n\
        <figure>"+
                galeria() +
            "<div id='valoracion'>"+
                ranking() +
                "<span>"+ (Math.round((estratos[nroEstrato]["rating"]["total"] / estratos[nroEstrato]["rating"]["votantes"]) * 10) / 10) + " / 5</span>\n\
            </div>\n\
            entre <span id='votantes'>"+ estratos[nroEstrato]["rating"]["votantes"] +" votantes</span>\n\
        </figure>\n\
        <div>\n\
            <h2 style='display:inline-block'>"+ estratos[nroEstrato]["nombre"] + "</h2> - <span>" + estratos[nroEstrato]["duracion"] + "</span><br><br>\n\
            <p>"+ estratos[nroEstrato]["sinopsis"] + "</p><br>\n\
            <span>Emisión: "+ estratos[nroEstrato]["fecha"] + "</span><br>\n\
            <span>Dirección: "+ estratos[nroEstrato]["direccion"] + "</span><br>\n\
            <span>Escritor: "+ estratos[nroEstrato]["escritor"] + "</span><br>\n\
            <span>Productora: "+ estratos[nroEstrato]["productora"] + "</span><br>\n\
            <span>Actores: </span>\n\
        </div>\n\
    </div>\n\
    ");
    for (var i = 0; i < estratos[nroEstrato]["elenco"].length; i++) {
        if (i + 1 !== estratos[nroEstrato]["elenco"].length) {
            $("span:eq(7)").append(estratos[nroEstrato]["elenco"][i]["actor"] + " (" + estratos[nroEstrato]["elenco"][i]["personaje"] + "), ");
        } else {
            $("span:eq(7)").append(estratos[nroEstrato]["elenco"][i]["actor"] + " (" + estratos[nroEstrato]["elenco"][i]["personaje"] + ")");
        }
    }
    for (var i = 0; i < estratos[nroEstrato]["comentarios"].length; i++) {
        $("#comentarios").append("\n\
        <div>\n\
            <span>"+ estratos[nroEstrato]["comentarios"][i]["usuario"] + ":</span><br>\n\
            <span>"+ estratos[nroEstrato]["comentarios"][i]["comentario"] + "</span>\n\
            <p class='starability-result' data-rating='"+ estratos[nroEstrato]["comentarios"][i]["calificacion"] + "'></p>\n\
        </div>\n\
        ");
    }

    $("#enviar").click(ingresarComentario)

    $("#ventanaModal").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}


var textoAlertas;
var nombre;
var comentario;
var valorRating;

function ingresarComentario() {
    textoAlertas = [];
    nombre = $("form :input:eq(0)").val();
    comentario = $("form :input:eq(1)").val();
    valorRating = parseInt($(":checked").val());
    var alertador = false;

    if (nombre === "") {
        $("form :input:eq(0)").css("background-color", "red");
        textoAlertas.push("el <span>nombre</span>");
        alertador = true;
    }
    if (comentario === "") {
        $("form :input:eq(1)").css("background-color", "red");
        textoAlertas.push("el <span>comentario</span>");
        alertador = true;
    }
    if (valorRating === 0) {
        $("fieldset").css("background-color", "red");
        textoAlertas.push("la <span>calificación</span>");
        alertador = true;
    }


    if (alertador === true) {
        detallarAlerta();
    } else {
        comentar();
    }
}

function detallarAlerta() {
    $("div#ventanaModal p").text("No pusiste ");
    for (var i = 0; i < textoAlertas.length; i++) {
        if (i === textoAlertas.length - 1) {
            $("div#ventanaModal p").append(textoAlertas[i]);
        } else if (i === textoAlertas.length - 2) {
            $("div#ventanaModal p").append(textoAlertas[i] + " ni ");
        } else {
            $("div#ventanaModal p").append(textoAlertas[i] + ", ");
        }
    }
    $("#ventanaModal").dialog("open", "modal", true);
    $("form :input").keyup(restaurarColor);
    $("form fieldset").click(restaurarColorStar);
}

function restaurarColor() {
    $(this).css("background-color", "#252525");
}

function restaurarColorStar() {
    $(this).css("background-color", "transparent")
}

function comentar() {
    $("form :input:eq(0)").val("");
    $("form :input:eq(1)").val("");
    $("form fieldset :radio:eq(0)").prop("checked", true);
    $("#comentarios").prepend("\n\
        <div>\n\
            <span>"+ nombre + ":</span><br>\n\
            <span>"+ comentario + "</span>\n\
            <p class='starability-result' data-rating="+ valorRating + "></p>\n\
        </div>\n\
        ");
    
    estratos[nroEstrato]["rating"]["total"] += valorRating;
    estratos[nroEstrato]["rating"]["votantes"]++;

    $("div#valoracion").html(
        ranking() +
        "<span>"+ (Math.round((estratos[nroEstrato]["rating"]["total"] / estratos[nroEstrato]["rating"]["votantes"]) * 10) / 10) + " / 5</span>\n\
    ");
    $("span#votantes").html(estratos[nroEstrato]["rating"]["votantes"] +" votantes");
}

function galeria() {
    var galeriaImg = "<div class='fotorama' data-width='100%' data-nav='thumbs' data-autoplay='true'>";
    for (var i=0; i < estratos[nroEstrato]["imagen"].length; i++){
        galeriaImg += "<a href='img/estratos/"+ estratos[nroEstrato]["imagen"][i] + "'><img src='img/estratos/"+ estratos[nroEstrato]["imagen"][i] + "' alt='" + estratos[nroEstrato]["nombre"] + "'></img></a>"
    }
    galeriaImg += "</div>"
    return galeriaImg;
}

function ranking(){
    var rankingFinalPorcentaje = (Math.round((estratos[nroEstrato]["rating"]["total"] / estratos[nroEstrato]["rating"]["votantes"]) * 10) / 10)*20;
    return "<svg viewBox='0 0 1000 200' class='rating'>\n\
                <defs>\n\
                    <polygon id='star' points='100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 '/>\n\
                    <clipPath id='stars'>\n\
                        <use xlink:href='#star'/>\n\
                        <use xlink:href='#star' x='20%'/>\n\
                        <use xlink:href='#star' x='40%'/>\n\
                        <use xlink:href='#star' x='60%'/>\n\
                        <use xlink:href='#star' x='80%'/>\n\
                    </clipPath>\n\
                </defs>\n\
                <rect class='rating__background' clip-path='url(#stars)'></rect>\n\
                <rect width='"+ rankingFinalPorcentaje +"%' class='rating__value' clip-path='url(#stars)'></rect>\n\
            </svg>"
}