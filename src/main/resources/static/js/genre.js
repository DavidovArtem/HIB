let genresDto;

$(document).ready(function() {
    getGenresDto();
});

async function getGenresDto() {
    await fetch("/genresdto")
        .then(status)
        .then(json)
        .then(function(resp) {
            genresDto = resp;
            buildRows(resp);
        })
}

function buildRows(data) {
    var	rows = '';
    data.forEach(function(entry) {
        rows += '<tr>';
        rows += '<td>'+entry.id+'</td>';
        rows += '<td>'+entry.number+'</td>';
        rows += '<td>'+entry.body+'</td>';
        rows += '<td data-id="'+entry.id+'">';
        rows += '<button data-toggle="modal" data-target="#edit-genre" class="btn btn-primary" onclick="getGenreToEdit(parseInt($(this).parent(\'td\').data(\'id\'), 10))">Edit</button>';
        rows += '</td>';
        rows += '<td data-id="'+entry.id+'">';
        rows += '<button class="btn btn-danger" onclick="deleteGenre(parseInt($(this).parent(\'td\').data(\'id\'), 10))">Delete</button>';
        rows += '</td>';
        rows += '<td data-id="'+entry.id+'">';
        rows += '<button class="btn btn-success" onclick="moveUpGenre(parseInt($(this).parent(\'td\').data(\'id\'), 10))">Up</button>';
        rows += '</td>';
        rows += '<td data-id="'+entry.id+'">';
        rows += '<button class="btn btn-success" onclick="moveDownGenre(parseInt($(this).parent(\'td\').data(\'id\'), 10))">Down</button>';
        rows += '</td>';
        rows += '</tr>';
    });
    $("#genrestable").html(rows);
}

async function deleteGenre(id) {
    await fetch("/genre/" + id, {
        method: 'DELETE',
    });
    await getGenresDto();
}

async function moveUpGenre(id) {
    let prevElemIndex = genresDto.indexOf(genresDto.find(genreDto => genreDto.id === id)) - 1;

    if(prevElemIndex > -1) {
        await fetch("/genre/" + id + "/" + genresDto[prevElemIndex].id, {
            method: 'PUT',
        });
        await getGenresDto();
    }
}

async function moveDownGenre(id) {
    let nextElemIndex = genresDto.indexOf(genresDto.find(genreDto => genreDto.id === id)) + 1;

    if(nextElemIndex < genresDto.length) {
        await fetch("/genre/" + id + "/" + genresDto[nextElemIndex].id, {
            method: 'PUT',
        });
        await getGenresDto();
    }
}

async function setVacantNum() {
    await fetch("/vacantnum")
        .then(status)
        .then(json)
        .then(function(resp) {
            $("#nav-profile2").find("input[name='addGenreNumber']").val(resp);
        })
}

async function addGenre() {
    await fetch("/genre", {
        method: 'POST',
        body: JSON.stringify(
            {
                'id': null,
                'number': $("#addGenreNumber").val(),
                'genreLocale': {
                    'id': null,
                    'ru': $("#addGenreRu").val(),
                    'en': $("#addGenreEn").val(),
                    'fr': $("#addGenreFr").val(),
                    'it': $("#addGenreIt").val(),
                    'de': $("#addGenreDe").val(),
                    'cs': $("#addGenreCs").val(),
                    'gr': $("#addGenreGr").val()
                }
            }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    await getGenresDto();
    $('#nav-profile-tab2').attr('class', 'nav-item nav-link').attr('aria-selected', 'false');
    $('#nav-home-tab2').attr('class', 'nav-item nav-link active').attr('aria-selected', 'true');
    $('#nav-profile2').attr('class', 'tab-pane fade');
    $('#nav-home2').attr('class', 'tab-pane fade show active');
}

async function getGenreToEdit(id) {
    await fetch("/genre/" + id)
        .then(status)
        .then(json)
        .then(function(resp) {
            $("#edit-genre").find("input[name='editGenreId']").val(resp.id);
            $("#edit-genre").find("input[name='editGenreNumber']").val(resp.number);
            $("#edit-genre").find("input[name='editGenreLocaleId']").val(resp.genreLocale.id);
            $("#edit-genre").find("input[name='editGenreRu']").val(resp.genreLocale.ru);
            $("#edit-genre").find("input[name='editGenreEn']").val(resp.genreLocale.en);
            $("#edit-genre").find("input[name='editGenreFr']").val(resp.genreLocale.fr);
            $("#edit-genre").find("input[name='editGenreIt']").val(resp.genreLocale.it);
            $("#edit-genre").find("input[name='editGenreDe']").val(resp.genreLocale.de);
            $("#edit-genre").find("input[name='editGenreCs']").val(resp.genreLocale.cs);
            $("#edit-genre").find("input[name='editGenreGr']").val(resp.genreLocale.gr);
        })
}

async function editGenre() {
    await fetch("/genre/" + $("#editGenreId").val(), {
        method: 'PUT',
        body: JSON.stringify(
            {
                'id': $("#editGenreId").val(),
                'number': $("#editGenreNumber").val(),
                'genreLocale': {
                    'id': $("#editGenreLocaleId").val(),
                    'ru': $("#editGenreRu").val(),
                    'en': $("#editGenreEn").val(),
                    'fr': $("#editGenreFr").val(),
                    'it': $("#editGenreIt").val(),
                    'de': $("#editGenreDe").val(),
                    'cs': $("#editGenreCs").val(),
                    'gr': $("#editGenreGr").val()
                }
            }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    await getGenresDto();
    $(".modal").modal('hide');
}

function json(response) {
    return response.json()
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}