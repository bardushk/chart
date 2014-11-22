//
// Переводим массивы и объекты в строку
//
(function (exports) {
    exports.toString = function (object, result) {
        var result = result || '';
        if (typeof object === 'object') {
            result += '{ ';
            for (var key in object) {
                var value = object[key];
                if (typeof value !== 'function') {
                    result += key + ': ' + exports.toString(value) + ', ';
                }
            }
            result = result.substr(0, result.length - 2) + ' }';
        }
        else {
            result += object;
        }
        return result;
    }
}(this.Export = {}));