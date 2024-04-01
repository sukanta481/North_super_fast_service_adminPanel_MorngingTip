$(document).ready(function () {

    $(addData).submit(function (e) {
        e.preventDefault();
        let name, date, pickup, destination, shipping
        name = $('[name="name"]').val()
        date = $('[name="date"]').val()
        pickup = $('[name="pickup"]').val()
        destination = $('[name="destination"]').val()
        shipping = $('[name="shipping"]').val()

        // console.log(name, date, pickup, destination, shipping);

        // if the product delivered or not
        if ($('[name="check"]').is(":checked")) {
            console.log('yas');
        } else {
            console.log('Process');
        }

    });
});