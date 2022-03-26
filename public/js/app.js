const preloading = () => {
    $('.main').fadeIn('slow');
    $('.preloading').fadeOut('preloading');
}

const spinner = () => {
    return `
    <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
    `;
}

const online = () => {
    if (navigator.onLine) {
        return true;
    } else {
        return false;
    }
}

//Alerts
const success = (title, msg, position) => {
    iziToast.show({
        title: title,
        message: msg,
        backgroundColor: '#28df99',
        closeOnEscape: true,
        position: position
    });
}

const danger = (title, msg, position) => {
    iziToast.show({
        title: title,
        message: msg,
        backgroundColor: '#F29191',
        closeOnEscape: true,
        position: position
    });
}

const warning = (title, msg, position) => {
    iziToast.show({
        title: title,
        message: msg,
        backgroundColor: '#ffd571',
        closeOnEscape: true,
        position: position
    });
}

const closeAlert = () => {

    var toast = document.querySelector('.iziToast');

    iziToast.hide({
        transitionOut: 'fadeOutUp'
    }, toast);
}

const question = ({
    btn,
    afirmacion,
    color,
    nombre,
    pregunta,
    metodo,
    url,
    datos
}, callback) => {

    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        zindex: 999,
        title: nombre,
        message: pregunta,
        position: 'center',
        backgroundColor: color,
        buttons: [
            ['<button><b>No, cerrar<b></button>', function (instance, toast) {

                instance.hide({
                    transitionOut: 'fadeOut'
                }, toast, 'button');

            }],
            [`<button>${afirmacion}</button>`, async function (instance, toast) {

                (btn ? disableBtn(btn) : null);

                closeAlert();

                $.ajax({
                    type: metodo,
                    url: url,
                    data: datos,
                    dataType: 'json',
                    success: (response) => {
                        callback(response);
                    },
                    error: (err) => {
                        danger('Ups, lo siento', 'Ocurrió un problema, inténtalo más tarde', 'bottomRight');
                    }
                })

            }, true]
        ]
    });

}

//Btn
const disableBtn = (btn) => {
    $(btn).html(spinner());
    $(btn).prop('disabled', true);
}

const enableBtn = (btn, text) => {
    $(btn).html(text);
    $(btn).prop('disabled', false);
}

//Close modal
$('.ab__modal__close').click(() => {
    $('.ab-modal').removeClass('open');
});

$(document).keyup((e) => {
    if (e.keyCode == 27) {
        $('.ab-modal').removeClass('open');
    }
});

//Obtener extension de archivo 
function get_extension(name) {

    var texto = name;
    var longitud = texto.length;
    var extension = '';

    while (longitud >= 0) {

        if (texto.charAt(longitud) != '.') {
            extension += texto.charAt(longitud);
        } else {
            extension = extension.split('').reverse().join('');
            break;
        }

        longitud--;
    }

    return extension.toLowerCase();
}


//Capitalize
const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}