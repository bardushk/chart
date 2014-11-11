//
// Перетаскивание для планшета
//
(function ($) {
    $.fn.draggable = function (e) {

        var dragObject = null,      // Перетаскиваемый объект
            currentDropTarget,      // Текущая зона
            toushStartAt = null,    // Объект на который нажали
            dragThreshold = 9;      // Порог при перетаскивании (пикс)

        //
        // Нажали
        //
        var start = function (e) {
            var orig = e.originalEvent;
            var pos = $(this).parent().position();
            offset = {
                x: orig.changedTouches[0].pageX - pos.left,
                y: orig.changedTouches[0].pageY - pos.top
            };
            toushStartAt = { x: offset.x, y: offset.y, dragObject: this };
            return this;
        };

        //
        // Тащим
        //
        var move = function (e) {
            e.preventDefault();
            var orig = e.originalEvent;
            var pos = $(this).parent().position();
            var x = orig.changedTouches[0].pageX - offset.x;
            var y = orig.changedTouches[0].pageY - offset.y;

            if (toushStartAt) {
                if (Math.abs(toushStartAt.x - x) < dragThreshold && Math.abs(toushStartAt.y - y) < dragThreshold) {
                    return;
                }

                dragObject = $(toushStartAt.dragObject).parent();
                dragObject.addClass('selectedTile');
                toushStartAt = null;
            }

            $(this).parent().css({ top: y, left: x });

            var newTarget = getCurrentTarget(e);
            if (currentDropTarget && currentDropTarget !== newTarget) {
                $('.edit').parent('[zone=' + currentDropTarget + ']').removeClass('dropZone');
            }

            currentDropTarget = newTarget;

            if (newTarget) {
                $('.edit').parent('[zone=' + currentDropTarget + ']').addClass('dropZone');
            }
            return false;
        };

        //
        // Закончили перетаскивание
        //
        var stop = function (e) {
            toushStartAt = null;
            if (dragObject) {
                var orig = e.originalEvent;
                var pos = $(this).parent().position();
                var x = orig.changedTouches[0].pageX;
                var y = orig.changedTouches[0].pageY;
                dragObject.removeClass('selectedTile');
                dragObject.fadeOut();
                $('.edit').parent().each(
                    function () {
                        if (
                            x > $(this).position().left
                            && x < $(this).position().left + $(this).width()
                            && y > $(this).position().top
                            && y < $(this).position().top + $(this).height()
                            && dragObject.attr('zone') !== $(this).attr('zone')
                            ) {
                            // Нашли куда бросить панель
                            changePosition = true;
                            $(this).fadeOut();
                            SwapZones(dragObject.attr('zone'), $(this).attr('zone'), $(this).attr("workspaceNo"));
                        }
                    });
                Callback();
                dragObject = null
            }
        };

        //
        // Ищем зону над которой проносим плитку
        //
        function getCurrentTarget(e) {
            var dropTarget = null;
            if (!dragObject) return;
            e.preventDefault();
            var orig = e.originalEvent;
            var pos = $(this).parent().position();
            var x = orig.changedTouches[0].pageX;
            var y = orig.changedTouches[0].pageY;


            $('.edit').parent().each(
                function () {
                    if (
                        x > $(this).position().left
                        && x < $(this).position().left + $(this).width()
                        && y > $(this).position().top
                        && y < $(this).position().top + $(this).height()
                        && dragObject.attr('zone') !== $(this).attr('zone')
                        ) {
                        // Нашли зону для бросания
                        dropTarget = $(this).attr('zone');
                    }
                });
            return dropTarget;
        }

        this.bind("touchstart", start);
        this.bind("touchmove", move);
        this.bind("touchend", stop);
    }
}(jQuery));
