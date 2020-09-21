$(document).ready(function() {
    $("button").on("click", getDJ);
});
function getDJ() {
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        type: 'GET',
        dataType: 'json',
        data: {
            format: 'json'
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function(data) {
            $('.joke').html(data.joke);
        },
        error: function(xhr, status, error) {
            console.log('there was an error')
        }
    });
}

