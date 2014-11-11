﻿//
// Перетаскивание плиток в режиме редактирования
//
var dragMaster = (function () {
    var dragObject = null,      // Перетаскиваемый объект
        mouseOffset,            // Смещение
        currentDropTarget,      // Текущая зона
        mouseDownAt = null,
        dragThreshold = 3;      //  Порог при перетаскивании плиток (пикс).

    // получить сдвиг target относительно курсора мыши
    function getMouseOffset(target, e) {
        var docPos = getPosition(target)
        return { x: e.pageX - docPos.x, y: e.pageY - docPos.y }
    }

    function mouseDown(e) {
        alert('mouseDown');
        e = fixEvent(e);
        if (e.which != 1) return;
        mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this }

        // получить сдвиг элемента относительно курсора мыши
        mouseOffset = getMouseOffset(this, e);
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
        // отменить перенос и выделение текста при клике на тексте
        document.ondragstart = function () { return false };
        document.body.onselectstart = function () { return false };
        return false;
    }

    //
    // Ищем зону над которой проносим плитку
    //
    function getCurrentTarget(e) {
        var dropTarget = null;
        if (!dragObject) return;
        $('.node').parent().each(
            function () {
                if (
                    e.pageX > $(this).position().left
                    && e.pageX < $(this).position().left + $(this).width()
                    && e.pageY > $(this).position().top
                    && e.pageY < $(this).position().top + $(this).height()
                    && dragObject.attr('zone') !== $(this).attr('zone')
                    ) {
                    // Нашли зону для бросания
                    dropTarget = $(this).attr('zone');
                }
            });
        return dropTarget;
    }

    function mouseMove(e) {
        e = fixEvent(e);

        if (mouseDownAt) {
            if (Math.abs(mouseDownAt.x - e.pageX) < dragThreshold && Math.abs(mouseDownAt.y - e.pageY) < dragThreshold) {
                return;
            }

            dragObject = $(mouseDownAt.dragObject).parent();
            dragObject.addClass('selectedTile');
            mouseDownAt = null;
        }

        if (dragObject) {
            dragObject.css({ position: 'absolute', top: e.pageY - mouseOffset.y + 'px', left: e.pageX - mouseOffset.x + 'px' });           
        }

        var newTarget = getCurrentTarget(e);
        if (currentDropTarget && currentDropTarget !== newTarget) {
            $('.edit').parent('[zone=' + currentDropTarget + ']').removeClass('dropZone');
        }

        currentDropTarget = newTarget;

        if (newTarget) {
            $('.edit').parent('[zone=' + currentDropTarget + ']').addClass('dropZone');
        }

        return false;
    }

    function mouseUp(e) {
        mouseDownAt = null;

        if (dragObject) {
            dragObject.removeClass('selectedTile');
            dragObject.fadeOut();
            $('.edit').parent().each(
                function () {
                    if (
                        e.pageX > $(this).position().left
                        && e.pageX < $(this).position().left + $(this).width()
                        && e.pageY > $(this).position().top
                        && e.pageY < $(this).position().top + $(this).height()
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
            document.onmousemove = null
            document.onmouseup = null
            document.ondragstart = null
            document.body.onselectstart = null
        }
    }
    return {
        init: function () {
            dragObject = null;
            document.onmousemove = mouseMove;
            document.onmouseup = mouseUp;
        },

        makeDraggable: function (element) {
            $('body').on('click', '.chartTest', function () { alert('chartTest'); });
        }
    }
}());

dragMaster.init();
dragMaster.makeDraggable('.node');

function SwapZones(zoneAOrderNo, zoneBOrderNo, workspaceNo) {
}

function fixEvent(e) {
    // получить объект событие для IE
    e = e || window.event

    // добавить pageX/pageY для IE
    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement
        var body = document.body
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    // добавить which для IE
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0))
    }
    return e
}

function getPosition(e) {
    var left = 0;
    var top = 0;
    while (e.offsetParent) {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
    }
    left += e.offsetLeft;
    top += e.offsetTop;
    return { x: left, y: top }
}

