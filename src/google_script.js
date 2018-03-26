//Script google à ajouter sur un drive pour permettre au collaborateur de se positionner sur une mission

function doGet(e) {
    //openByUrl correspond au google sheet pour le stockage des positionnements des collaborateurs sur les missions
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1PuObLnK00Ylt4Fdlm6ZbVnupaqnmkDQD5ijDhUPp2R0/edit#gid=0");
    //getSheetByName est le nom de l'onglet du google sheet
    var sheet = ss.getSheetByName("Missions");
    return insert_value(e, sheet);
}

function insert_value(request, sheet) {

    var nom = request.parameter.nom;
    var mission = request.parameter.mission;
    var message = 'Action effectuée avec succès';
    var lr = sheet.getLastRow();
    var flag = 1;
    var statut = 'CREATED';

    for (var i = 1; i <= lr; i++) {
        var sheet_nom = sheet.getRange(i, 2).getValue();
        var sheet_mission = sheet.getRange(i, 3).getValue();

        if (sheet_nom.trim() === nom.trim() && sheet_mission.trim() === mission.trim()) {
            flag = 0;
            statut = 'CONFLICT'
            message = "Vous vous êtes déjà positionné sur cette mission";
        }
    }

    if (flag === 1) {
        var d = new Date();
        var currentTime = d.toLocaleString();
        var rowData = sheet.appendRow([currentTime, nom, mission]);
    }

    var json = {
        message: message,
        statut: statut,
    }

    return ContentService.createTextOutput(request.parameter.callback + "(" + JSON.stringify(json) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
}