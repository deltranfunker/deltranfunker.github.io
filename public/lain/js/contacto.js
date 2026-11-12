var paises = [
	"- Seleccioná un país -",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

var textoAlertas = [];

$(document).ready(inicio);

function inicio() {
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

	mostrarPaises();
	$("form").submit(verificarFormulario);
}

function mostrarPaises() {
	for (var i = 0; i < paises.length; i++) {
		$("#pais").append("\n\
        <option value='"+ paises[i] + "'>" + paises[i] + "</option>\n\
        ");
	}
}

function verificarFormulario() {
	var alertador = false;
	textoAlertas = [];

	var nombre = $("form :input:eq(0)").val();
	var email = $("form :input:eq(1)").val();
	var fechaNac = $("form :input:eq(2)").val();
	var pais = $("form :input:eq(3)").val();
	var celular = $("form :input:eq(4)").val();
	var comentario = $("form :input:eq(5)").val();

	if (nombre === "") {
		$("form :input:eq(0)").css("background-color", "red");
		textoAlertas.push("el <span>nombre</span>");
		alertador = true;
	}
	if (email === "" || email.indexOf("@") === -1 || email.indexOf(".", email.indexOf("@")) === -1) {
		$("form :input:eq(1)").css("background-color", "red");
		textoAlertas.push("el <span>email</span>");
		alertador = true;
	}
	if (fechaNac === "") {
		$("form :input:eq(2)").css("background-color", "red");
		textoAlertas.push("la <span>fecha de nacimiento</span>");
		alertador = true;
	}
	if (pais === "- Seleccioná un país -") {
		$("form :input:eq(3)").css("background-color", "red");
		textoAlertas.push("el <span>país</span>");
		alertador = true;
	}
	if (isNaN(celular) || celular === "") {
		$("form :input:eq(4)").css("background-color", "red");
		textoAlertas.push("el <span>celular</span>");
		alertador = true;
	}
	if (comentario === "") {
		$("form :input:eq(5)").css("background-color", "red");
		textoAlertas.push("el <span>comentario</span>");
		alertador = true;
	}


	if (alertador === true) {
		detallarAlerta();
		event.preventDefault();
	} else {
		$("form :input:eq(0)").val("");
		$("form :input:eq(1)").val("");
		$("form :input:eq(2)").val("");
		$("form :input:eq(3)").val(paises[0]);
		$("form :input:eq(4)").val("");
		$("form :input:eq(5)").val("");
	}
}

function detallarAlerta() {
	$("div#ventanaModal p").text("Pusiste mal ");
	for (var i = 0; i < textoAlertas.length; i++) {
		if (i === textoAlertas.length - 1) {
			$("div#ventanaModal p").append(textoAlertas[i]);
		} else if (i === textoAlertas.length - 2) {
			$("div#ventanaModal p").append(textoAlertas[i] + " y ");
		} else {
			$("div#ventanaModal p").append(textoAlertas[i] + ", ");
		}
	}
	$("#ventanaModal").dialog("open", "modal", true);
	$("form :input").keyup(restaurarColor);
	$("form :input").change(restaurarColor);
}

function restaurarColor() {
	$(this).css("background-color", "#252525");
}