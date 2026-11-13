var director = "Ryūtarō Nakamura";
var escritor = "Chiaki J. Konaka";
var productora = "production 2nd.";

var LainI = {"personaje": "Lain Iwakura","actor": "Kaori Shimizu"};
var ChisaY = {"personaje": "Chisa Yomoda", "actor": "Sumi Mutoh"};
var YasuoI = {"personaje": "Yasuo Iwakura","actor": "Ryûnosuke Ôbayashi"};
var MihoI = {"personaje": "Miho Iwakura","actor": "Rei Igarashi"};
var MikaI = {"personaje": "Mika Iwakura", "actor": "Ayako Kawasumi"};
var AliceM = {"personaje": "Alice Mizuki", "actor": "Yôko Asada"};
var ReikaY = {"personaje": "Reika Yamamoto", "actor": "Chiharu Tezuka"};
var JuriK = {"personaje": "Juri Kato", "actor": "Manabi Mizuno"};
var JJ = {"personaje": "JJ", "actor": "Wasei Chikada"};
var MiB2 = {"personaje": "Man in Black #2 / Lin Sui-Xi", "actor": "Takumi Yamazaki"};
var MasamiE = {"personaje": "Masami Eiri / Deus", "actor": "Show Hayami"};
var MiB1 = {"personaje": "Man in Black #1 / Karl Haushofer", "actor": "Jôji Nakata"};
var Nezumi = {"personaje": "Nezumi", "actor": "Shigeru Chiba"};

var elencos = [LainI,ChisaY,YasuoI,MihoI,MikaI,AliceM,ReikaY,JuriK,JJ,MiB1,MiB2,MasamiE,Nezumi];

var estrato1 = {
    "nombre": "01: WEIRD",
    "fecha": "6 de Julio de 1998",
    "duracion": "23:56",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "People are getting emails from a girl, Chisa Yomoda, who killed herself last week, which claim that she only gave up her body, but is actually still alive inside The Wired, and that God is also there. After getting one of these emails, the introverted Lain Iwakura becomes interested in computers and asks her father for a new Navi.",
    "imagen": ["01.jpg", "01-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK],
    "comentarios": [
        {"usuario": "Dernassil47", "comentario": "No entendí nada", "calificacion": 5},
        {"usuario": "Volken", "comentario": "Que raro", "calificacion": 4},
        {"usuario": "Deltran", "comentario": "Primero!!!", "calificacion": 5}
    ],
    "rating": {"total": 73, "votantes": 19}
};
var estrato2 = {
    "nombre": "02: GIRLS",
    "fecha": "13 de Julio de 1998",
    "duracion": "23:54",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "Alice, Juri, and Reika talk to Lain saying they saw her during their first visit to the hardcore techno club 'Cyberia', but with a far more vigorous and forceful personality. After some persuasion, Lain decides to join Alice and her friends who are at Cyberia again to disprove that it was her. However, Lain becomes involved with a shooting in the club by a man under the influence of the micro-machine drug Accela.",
    "imagen": ["02.jpg", "02-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK],
    "comentarios": [
        {"usuario": "K6", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Volken", "comentario": "¿¡Cuántas copas tenés!?", "calificacion": 1},
        {"usuario": "Dernassil47", "comentario": "Andaaa", "calificacion": 3},
        {"usuario": "Artusio Dev", "comentario": "Primero!!!", "calificacion": 5}
    ],
    "rating": {"total": 67, "votantes": 18}
};
var estrato3 = {
    "nombre": "03: PSYCHE",
    "fecha": "20 de Julio de 1998",
    "duracion": "23:56",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "The episode opens again on a crowded Tokyo street. In front of the Cyberia Café, the police have arrived to investigate the shooting. As Lain and Alice exit the club, a voiceover states: 'You've probably heard of Lain . . . '  The voice continues, 'Lain of the Wired.'",
    "imagen": ["03.jpg", "03-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK],
    "comentarios": [
        {"usuario": "Volken", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "K6", "comentario": "Primero!!!", "calificacion": 5}
    ],
    "rating": {"total": 60, "votantes": 16}
};
var estrato4 = {
    "nombre": "04: RELIGION",
    "fecha": "27 de Julio de 1998",
    "duracion": "23:56",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "Again we see a busy Tokyo street, the familiar opening. A voice is heard: 'I don't need parents. Every human is alone and is connected to nobody.'",
    "imagen": ["04.jpg", "04-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK, JJ, MiB2],
    "comentarios": [
        {"usuario": "Volken", "comentario": "Dejá de spamear Dernassil47 >:(", "calificacion": 1},
        {"usuario": "Dernassil47", "comentario": "Let's all love Lain", "calificacion": 5},
        {"usuario": "Dernassil47", "comentario": "Let's all love Lain", "calificacion": 5},
        {"usuario": "Dernassil47", "comentario": "Let's all love Lain", "calificacion": 5},
        {"usuario": "Dernassil47", "comentario": "Let's all love Lain", "calificacion": 5},
        {"usuario": "Artusio Dev", "comentario": "Primero!!!", "calificacion": 1}
    ],
    "rating": {"total": 59, "votantes": 15}
};
var estrato5 = {
    "nombre": "05: DISTORTION",
    "fecha": "3 de Agosto de 1998",
    "duracion": "23:55",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "The Tokyo streets pass at night with the familiar flash of the crosswalk lights. A voice is heard 'If you can hear it, it is talking to you. If you can see it, it is your…'",
    "imagen": ["05.jpg", "05-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK, MasamiE],
    "comentarios": [
        {"usuario": "Artusio Dev", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Dernassil47", "comentario": "Me desuscribo", "calificacion": 1},
        {"usuario": "K6", "comentario": "Primero!!!", "calificacion": 5}
    ],
    "rating": {"total": 61, "votantes": 16}
};
var estrato6 = {
    "nombre": "06: KIDS",
    "fecha": "10 de Agosto de 1998",
    "duracion": "23:54",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "People are walking the streets of Tokyo at night. A female voice informs us, 'When humans are connected, small voices will become larger. When humans are connected, even life will get longer so...'",
    "imagen": ["06.jpg", "06-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK],
    "comentarios": [
        {"usuario": "Volken", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Dernassil47", "comentario": "Sub x sub", "calificacion": 5},
        {"usuario": "Dernassil47", "comentario": "Hola. ¿Saben dónde se encuentran los capitulos siguientes?", "calificacion": 2},
        {"usuario": "Dernassil47", "comentario": "Qué loco", "calificacion": 3},
        {"usuario": "K6", "comentario": "Primero!!!", "calificacion": 2}
    ],
    "rating": {"total": 56, "votantes": 15}
};
var estrato7 = {
    "nombre": "07: SOCIETY",
    "fecha": "17 de Agosto de 1998",
    "duracion": "23:54",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "The very, very familiar opening of the city at night. A female voice says, 'I’ll tell this only to you. You’re the only one who doesn’t know what happened in this society, and what is going on.'",
    "imagen": ["07.jpg", "07-2.jpg"],
    "elenco": [LainI, MikaI, AliceM, MiB1, MiB2, Nezumi],
    "comentarios": [
        {"usuario": "Volken", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Artusio Dev", "comentario": "Qué loco", "calificacion": 5},
        {"usuario": "K6", "comentario": "Primero!!!", "calificacion": 4}
    ],
    "rating": {"total": 55, "votantes": 14}
};
var estrato8 = {
    "nombre": "08: RUMORS",
    "fecha": "24 de Agosto de 1998",
    "duracion": "23:54",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "Night time in the city. Stock footage of cars and people. A female voice asks, 'Do you want to hurt yourself too? Do you want to feel your mind scraped by a rasp? If you want that never turn your eyes away.'",
    "imagen": ["08.jpg", "08-2.jpg"],
    "elenco": [LainI, MikaI, AliceM, ReikaY, JuriK, MasamiE],
    "comentarios": [
        {"usuario": "Volken", "comentario": "No entendí nada", "calificacion": 4},
        {"usuario": "YimiYian", "comentario": "Qué loco", "calificacion": 2},
        {"usuario": "Deltran", "comentario": "Qué loco", "calificacion": 3},
        {"usuario": "Volken", "comentario": "Primero!!!", "calificacion": 5}
    ],
    "rating": {"total": 55, "votantes": 14}
};
var estrato9 = {
    "nombre": "09: PROTOCOL",
    "fecha": "31 de Agosto de 1998",
    "duracion": "23:53",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "Stock opening footage replays scenes of the city and its people at night. A female voice says, 'If you want to avoid the pain, you should believe in God. Whether you believe in God or not, he is always with you.'",
    "imagen": ["09.jpg", "09-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, MasamiE],
    "comentarios": [
        {"usuario": "YimiYian", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Artusio Dev", "comentario": "Qué loco", "calificacion": 4},
        {"usuario": "K6", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 5},
        {"usuario": "Deltran", "comentario": "Una vez me pasó eso :O", "calificacion": 5}
    ],
    "rating": {"total": 53, "votantes": 14}
};
var estrato10 = {
    "nombre": "10: LOVE",
    "fecha": "7 de Setiembre de 1998",
    "duracion": "23:54",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "The stock opening footage is shown. No voice over is added. Only the ever present hum of the electrical wires is heard….",
    "imagen": ["10.jpg", "10-2.jpg"],
    "elenco": [LainI, YasuoI, MikaI, AliceM, MasamiE],
    "comentarios": [
        {"usuario": "Chisa Yomoda", "comentario": "¡Los estoy viendo! :)", "calificacion": 5},
        {"usuario": "Artusio Dev", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 4},
        {"usuario": "Voken", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 5},
        {"usuario": "Deltran", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 4},
        {"usuario": "K6", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 5},
        {"usuario": "Artusio dev", "comentario": "Una vez me pasó eso :O", "calificacion": 5}
    ],
    "rating": {"total": 57, "votantes": 14}
};
var estrato11 = {
    "nombre": "11: INFORNOGRAPHY",
    "fecha": "14 de Setiembre de 1998",
    "duracion": "23:57",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "People are walking in the city. Lain is in her room. She raises an arm towards the ceiling. An electrical cord is wrapped around her arm. A cross walk light turns red. An electrical clip is attached to Lain’s hair. The sound of energy moving through its various conduits can be heard. Numbers and figures scroll on a computer screen. More scenes of the city are presented. Lain connects two electrical plugs. She then attaches an electric conduit patch to her face.",
    "imagen": ["11.jpg", "11-2.jpg"],
    "elenco": [LainI, AliceM, ReikaY, JuriK, MasamiE, ChisaY],
    "comentarios": [
        {"usuario": "YimiYian", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "K6", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 3},
        {"usuario": "Artusio Dev", "comentario": "Polvo eres...", "calificacion": 5},
        {"usuario": "Deltran", "comentario": "Una vez me pasó eso :O", "calificacion": 5}
    ],
    "rating": {"total": 51, "votantes": 14}
};
var estrato12 = {
    "nombre": "12: LANDSCAPE",
    "fecha": "21 de Setiembre de 1998",
    "duracion": "23:53",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "Stock opening footage. Lain says, 'I see that is so. This world’s so simple. I’ve never known that. I had felt that this world was only scary and vast… But now I understand. I feel very relieved.' A female voice replies, 'I said so didn’t I?'",
    "imagen": ["12.jpg", "12-2.jpg"],
    "elenco": [LainI, MikaI, AliceM, MasamiE, ReikaY, JuriK, MiB1, MiB2],
    "comentarios": [
        {"usuario": "Dernassil47", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "Volken", "comentario": "No lo vi todavía y ya sé que va a ser un gran estrato :)", "calificacion": 5},
        {"usuario": "Deltran", "comentario": "Una vez me pasó eso :O", "calificacion": 3}
    ],
    "rating": {"total": 54, "votantes": 13}
};
var estrato13 = {
    "nombre": "13: EGO",
    "fecha": "28 de Setiembre de 1998",
    "duracion": "23:59",
    "direccion": director,
    "escritor": escritor,
    "productora": productora,
    "sinopsis": "A screen is clicked on. A digitized image of Lain is on the screen. Lain says, 'Well, it became unclear again. Where am I? Here, or where you are? I exist everywhere where you are. I know it. Because I am connected to you. But I…. Where is the true Me? Well, I know there is no true me. I am only inside of people who know I exist. But is this really me talking right now? Am I myself? I… Who am I?' The screen is clicked off.",
    "imagen": ["13.jpg", "13-2.jpg"],
    "elenco": [LainI, YasuoI, MihoI, MikaI, AliceM, ReikaY, JuriK, MasamiE],
    "comentarios": [
        {"usuario": "Artusio Dev", "comentario": "Yo solo sé que no sé nada", "calificacion": 5},
        {"usuario": "Dernassil47", "comentario": "No entendí nada", "calificacion": 2},
        {"usuario": "YimiYian", "comentario": "Una obra maestra concluye", "calificacion": 5},
        {"usuario": "Deltran", "comentario": "Me traumé", "calificacion": 3},
        {"usuario": "Volken", "comentario": "¡Que final épico!", "calificacion": 5},
        {"usuario": "K6", "comentario": "Qué loco", "calificacion": 5},
        {"usuario": "Lain", "comentario": "Los amo a todos <3", "calificacion": 5},
    ],
    "rating": {"total": 58, "votantes": 14}
};

var estratos = [estrato1, estrato2, estrato3, estrato4, estrato5, estrato6, estrato7, estrato8, estrato9, estrato10, estrato11, estrato12, estrato13];