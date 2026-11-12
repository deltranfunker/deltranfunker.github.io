var primerEmision = new Date("July 6, 1998 16:00:00");

$(document).ready(inicio);

var imagenes = ["lain.gif", "lain2.gif", "lain3.gif", "lain4.gif", "lain5.gif", "lain6.gif"];

function inicio(){
    var i = obtenerValorRandom(0, imagenes.length-1);
    $("main").css("background-image", "url(img/index/"+imagenes[i]+")");
    $("main").css("--myVar", "url(img/index/"+imagenes[i]+")")
    contador();
    setInterval("contador()",1000);
}

function obtenerValorRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function contador(){
    var fechaActual = new Date();
    var haceTantoTiempo = fechaActual - primerEmision;

    var seg = Math.round(haceTantoTiempo/1000);
    var mostrarSeg = seg%60;
    var min = Math.floor(seg/60);
    var mostrarMin = min%60;
    var hor = Math.floor(min/60);
    var mostrarHor = hor%24;
    var dias = Math.floor(hor/24);
    var mostrarDias = ((dias/4)%366) + (((dias/4)*3)%365);
    var aniosNormales = Math.floor(((dias/4)*3)/365);
    var aniosBisiesto = Math.floor((dias/4)/366);
    var aniosTotales = aniosNormales + aniosBisiesto;

    $("section#trailer p:eq(0)").html("Hace " + aniosTotales +
    " años, " + mostrarDias + " días, " + mostrarHor + " horas, " +
    mostrarMin + " minutos y " + mostrarSeg + " segundos que se emitió el primer estrato en televisión."
    );
}