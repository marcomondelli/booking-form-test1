$(document).ready(function() {
    $('#arrivo').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function(selectedDate) {
            var mincheckout = $(this).datepicker('getDate');
            mincheckout.setDate(mincheckout.getDate() + 1);
            $('#partenza').datepicker('option', 'minDate', mincheckout);
            updateNumNotti();
        }
    });

    $('#partenza').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 1,
        onSelect: function(selectedDate) {
            updateNumNotti();
        }
    });

    // Contenggio numero notti selezionate
    function updateNumNotti() {
        var checkin = $('#arrivo').datepicker('getDate');
        var checkout = $('#partenza').datepicker('getDate');
        if (checkin && checkout) {
            var oneDay = 24 * 60 * 60 * 1000;
            var diffDays = Math.round(Math.abs((checkout - checkin) / oneDay));
            $('#numero-notti').text(diffDays);
            $('#container-numero-notti').show();
        } else {
            $('#container-numero-notti').hide();
        }
    }

    // Controllo disponibilità
    $('#booking-form').submit(function(event) {
        event.preventDefault();
        var checkin = $('#arrivo').datepicker('getDate');
        var checkout = $('#partenza').datepicker('getDate');
        var adulti = $('#adulti').val();
        var bambini = $('#bambini').val();
        var promoCode = $('#promo-code').val();
        var oneDay = 24 * 60 * 60 * 1000;
        var diffDays = Math.round(Math.abs((checkout - checkin) / oneDay));

        // Controllo codice promozionale o vuoto
        if (promoCode && promoCode !== "TEST") {
            $('#codice-invalido').modal('show');
            return;
        }else{
            // Modal conferma disponibilità
            $('#modal-prenotazione').modal('show');

            $('#booking-summary').html('');
            $('#booking-summary').append('<div>Data di arrivo: ' + $.datepicker.formatDate('dd-mm-yy', checkin) + '</div>');
            $('#booking-summary').append('<div>Data di partenza: ' + $.datepicker.formatDate('dd-mm-yy', checkout) + '</div>');
            $('#booking-summary').append('<div>Adulti: ' + adulti + '</div>');
            $('#booking-summary').append('<div>Bambini: ' + bambini + '</div>');
            $('#booking-summary').append('<div>Totale notti: ' + diffDays + '</div>');
            if (promoCode === "TEST"){
                $('#booking-summary').append('<div>Hai usato questo codice promozionale: ' + promoCode + '</div>');
            }
        }
    });
});