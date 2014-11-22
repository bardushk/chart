// 
// Диаграмма
//
(function (exports) {

    //#region Настройки по умолчанию
    var _settings = {
        TOP: 0,
        LEFT: 0,
        WIDTH: 150,
        HEIGHT: 75,
        TEXT: 'Прямоугольник',
        CSS: 'element',
        STYLE: ' position: absolute; '
    };
    //#endregion

    //#region Приватная часть

    // Список с объектами
    var _elementList = [];

    // Допустимые типы данных
    var types = ['rectangle', 'line', 'image'];

    //#endregion

    //#region Вспомогательные классы
    //
    // Элемент диаграммы
    //
    function Element(params) {
        this.type = params.type || types[0];
        this.text = params.text || params.TEXT;
        this.left = params.left || _settings.LEFT;
        this.top = params.top || _settings.TOP;
        this.width = params.width || _settings.WIDTH;
        this.height = params.height || _settings.HEIGHT;
        this.cssClass = params.cssClass || _settings.CSS;
        this.style = params.style || _settings.STYLE;

        
        this.toString = function () {
            var result = '';
            result += 'type: "' + this.type + '"';
            result += ', left: ' + this.left;
            result += ', top: ' + this.top;
            return '{ ' + result + ' }'
        }
        this.toHtml = function () {
            var style = this.style;
            style += '; width: ' + this.width + 'px; ';
            style += '; height: ' + this.height + 'px; ';
            style += '; left: ' + this.height + 'px; ';

            return '<div class = "' +  this.cssClass + '" style = "' + this.style + '">' + this.text + '</div>';
        }
    }

    //#endregion

    //#region Интерфейс

    //
    // Список элементов в html
    //
    exports.toHtml = function () {
        var result = '';
        for (var index in _elementList) {
            var element = _elementList[index];
            result += element.toHtml() + ', ';
        }
        return '[' + result + ']';
    }
    //
    // Список элементов в json
    //
    exports.toString = function() {
        var result = '';
        for (var index in _elementList) {
            var element = _elementList[index];
            result += element.toString() + ', ';
        }
        result = result.substr(0, result.length - 2);
        return '[' + result + ']';
    }
    //
    // Добавляем новый элемент
    //
    exports.addElement = function(params) {
        _elementList.push(new Element(params));
    }
    //#endregion

}(this.Diagramm = {}));