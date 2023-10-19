$(window).on('load', function() {
    $.get('/getUserInfo', data => {
        console.log("data입니다");
    });
});