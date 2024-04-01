$(document).ready(function () {
    const swiper = new Swiper(".swiper-slider", {
        // Optional parameters
        width: 600,
        centeredSlides: true,
        slidesPerView: 2,
        grabCursor: true,
        freeMode: false,
        loop: true,
        loopedSlides: 1,
        mousewheel: false,
        spaceBetween: 15,
        keyboard: {
            enabled: true
        },

        // Enabled autoplay mode
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },

        // // If we need pagination
        // pagination: {
        //     el: ".swiper-pagination",
        //     dynamicBullets: true,
        //     clickable: true

        // },

        // If we need navigation
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        // Responsive breakpoints
        breakpoints: {
            640: {
                slidesPerView: 1.25,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
    var response

    // fetching
    $.ajax({
        url: 'http://localhost:3000/customer-details',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Handle successful response
            response = data;
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error:', error);
        }
    });

    // index page
    $('#search').submit(function (e) {
        e.preventDefault();

        let shipmentId = $('[name="shipmentId"]').val()
        var result = $.map(response, function (obj, index) {
            if (obj.TrackingID == shipmentId) {
                return obj;
            }
        });

        if (result.length != 0) {

            result = result[0]
            console.log(result);
            var date = result.DeliveryDate
            var date = date.split('T')[0]

            if (date == '0000-00-00') {
                date = 'Not Delivered'
            }

            $('#modal-body').append(`<table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" id="mid">
            <theadaz
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">
            Name
            </th>
            <th scope="col" class="px-6 py-3">
                        Shipment Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Pickup Address
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Destination
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Shiping Address
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Delivery Date
                    </th>
                </tr>
            </theadaz>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${result.Name}
                    </th>
                    <td class="px-6 py-4">
                        ${result.ShipmentDate}
                    </td>
                    <td class="px-6 py-4">
                        ${result.PickupAddress}
                    </td>
                    <td class="px-6 py-4">
                        ${result.Destination}
                    </td>
                    <td class="px-6 py-4">
                        ${result.ShippingAddress}
                    </td>
                    <td class="px-6 py-4">
                        ${result.Status}
                    </td>
                    <td class="px-6 py-4">
                        ${date}
                    </td>
                </tr>
            </tbody>
        </table>`);
        } else {
            $('#modal-body').append('<p id="mid" class="text-xl font-semibold text-red-500">Invalid ID</p>');
        }
    });
    $('#close').click(function () {
        $('#mid').remove();

    });

    // Admin page

});