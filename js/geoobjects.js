ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
            center: [53.902512, 27.561481],
            zoom: 11
        }, {
            // searchControlProvider: 'yandex#search'
        });

    // Функция, которая по состоянию чекбоксов в меню
    // показывает или скрывает геообъекты из выборки.
    function checkState () {
        var shownObjects,
            byShape = new ymaps.GeoQueryResult();


        // Отберем объекты по форме.
        if ($('#house').prop('checked')) {
            byShape = myObjects.search('options.class = "house"');
        }
        if ($('#yard').prop('checked')) {
            byShape = myObjects.search('options.class = "yard"').add(byShape);
        }
        if ($('#microdistrict').prop('checked')) {
            byShape = myObjects.search('options.class = "microdistrict"').add(byShape);
        }
        if ($('#district').prop('checked')) {
            byShape = myObjects.search('options.class = "district"').add(byShape);
        }
        if ($('#city').prop('checked')) {
            byShape = myObjects.search('options.class = "city"').add(byShape);
        }

        // Мы отобрали объекты по цвету и по форме. Покажем на карте объекты,
        // которые совмещают нужные признаки.
        shownObjects = byShape.addToMap(myMap);
        // Объекты, которые не попали в выборку, нужно убрать с карты.
        myObjects.remove(shownObjects).removeFromMap(myMap);
    }

    $('#house').click(checkState);
    $('#yard').click(checkState);
    $('#microdistrict').click(checkState);
    $('#district').click(checkState);
    $('#city').click(checkState);

    // Создадим объекты из их JSON-описания и добавим их на карту.
    window.myObjects = ymaps.geoQuery({
        type: "FeatureCollection",
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [53.902512, 27.561481],

                },
                properties: {
                    balloonContentHeader: 'Минск',
                    balloonContent: '<a href="https://t.me/minsk_new">Telegram</a>'

                },
                options: {
                    preset: 'islands#redCircleDotIcon',
                    class: 'city'
                }
            },

        ]
    }).addToMap(myMap);
}
