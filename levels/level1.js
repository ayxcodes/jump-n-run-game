let level1;

/**
 * Initializes the game level by creating a new Level instance.
 *
 * The following elements are included:
 * - Bottles: 15 instances of Bottle objects.
 * - Enemies: 7 Chickens, 8 SmallChickens, and 1 Endboss.
 * - Clouds: 8 instances of Cloud objects.
 * - Background: Multiple layers of background objects with different images and positions.
 *
 * This function assigns the created Level instance to the global variable `level1`.
 */
function initLevel() {
    level1 = new Level(
        [],

        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],

        [
            new backgroundObject('img/5_background/layers/air.png',-719),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new backgroundObject('img/5_background/layers/air.png', 0),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new backgroundObject('img/5_background/layers/air.png', 719),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new backgroundObject('img/5_background/layers/air.png', 719*2),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

            new backgroundObject('img/5_background/layers/air.png', 719*3),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

            new backgroundObject('img/5_background/layers/air.png', 719*4),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),

            new backgroundObject('img/5_background/layers/air.png', 719*5),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),

            new backgroundObject('img/5_background/layers/air.png', 719*6),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),

            new backgroundObject('img/5_background/layers/air.png', 719*7),
            new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
            new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
            new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),

            new backgroundObject('img/5_background/layers/air.png', 719*8),
            new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*8),
            new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*8),
            new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*8)
        ]
    );
}