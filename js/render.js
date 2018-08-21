(function (root) {
    var EMPTY = root.grid.EMPTY;
    var WALL = root.grid.WALL;
    var SNAKE = root.grid.SNAKE;
    var APPLE = root.grid.APPLE;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    /**
     * Создает визуализацию сетки по его схеме 
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function render(grid, path) {
        if (path && path.length) {
            var point, 
                i;

            for (i = 0; i < path.length; i++) {
                point = path[i];
                grid[point[1]][point[0]] = SNAKE;
            }
            point = path[path.length - 1];
            grid[point[1]][point[0]] = APPLE;
        }

        var containerElem = element('div', 'grid'),
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        for (y = 0; y < grid.length; y++) {
            row = grid[y];
            rowElem = element('div', 'grid__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    case SNAKE:
                        type = 'snake';
                        break;

                    case APPLE:
                        type = 'apple';
                        break;

                    default:
                        type = undefined;
                }

                rowElem.appendChild(
                    element('div', 'grid__cell' + (type ? ' grid__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    root.grid.render = render;
})(this);
