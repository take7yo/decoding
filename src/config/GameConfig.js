var MW = MW || {};

//game state
MW.GAME_STATE = {
    HOME: 0,
    PLAY: 1,
    OVER: 2
};

// mode
MW.MODE = {
    EASY: 0,
    NORMAL: 1,
    HARD: 2
};

// grade
MW.GRADE = {
    DIGITAL2: 2,
    DIGITAL3: 3,
    DIGITAL4: 4,
    DIGITAL5: 5,
    DIGITAL6: 6,
    DIGITAL7: 7,
    DIGITAL8: 8,
    DIGITAL9: 9,
    DIGITAL10: 10
};

// grade time
MW.GRADE_TIME = {
    DIGITAL2: 10.0,
    DIGITAL3: 10.0,
    DIGITAL4: 30.0,
    DIGITAL5: 30.0,
    DIGITAL6: 60.0,
    DIGITAL7: 60.0,
    DIGITAL8: 120.0,
    DIGITAL9: 120.0,
    DIGITAL10: 180.0
};

MW.BACK_WHITE = {
    WIDTH: 400,
    HEIGHT: 380,
    RC_OUT_X: 0,
    RC_OUT_Y: 0,
    RC_OUT_WIDTH: 28,
    RC_OUT_HEIGHT: 25,
    RC_IN_X: 12,
    RC_IN_Y: 12,
    RC_IN_WIDTH: 1,
    RC_IN_HEIGHT: 1
};

MW.SHAPE = {
    WIDTH: 74,
    HEIGHT: 70
};

// number
MW.NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//keys
MW.KEYS = [];

//level
MW.LEVEL = {
    STAGE1: 1,
    STAGE2: 2,
    STAGE3: 3
};

//life
MW.LIFE = 4;

//score
MW.SCORE = 0;

//sound
MW.SOUND = true;

//enemy move type
MW.ENEMY_MOVE_TYPE = {
    ATTACK: 0,
    VERTICAL: 1,
    HORIZONTAL: 2,
    OVERLAP: 3
};

//delta x
MW.DELTA_X = -100;

//offset x
MW.OFFSET_X = -24;

//rot
MW.ROT = -5.625;

//bullet type
MW.BULLET_TYPE = {
    PLAYER: 1,
    ENEMY: 2
};

//weapon type
MW.WEAPON_TYPE = {
    ONE: 1
};

//unit tag
MW.UNIT_TAG = {
    ENMEY_BULLET: 900,
    PLAYER_BULLET: 901,
    ENEMY: 1000,
    PLAYER: 1000
};

//attack mode
MW.ENEMY_ATTACK_MODE = {
    NORMAL: 1,
    TSUIHIKIDAN: 2
};

//life up sorce
MW.LIFEUP_SORCE = [50000, 100000, 150000, 200000, 250000, 300000];

//container
MW.CONTAINER = {
    ENEMIES: [],
    ENEMY_BULLETS: [],
    PLAYER_BULLETS: [],
    EXPLOSIONS: [],
    SPARKS: [],
    HITS: [],
    BACKSKYS: [],
    BACKTILEMAPS: []
};

//bullet speed
MW.BULLET_SPEED = {
    ENEMY: -200,
    SHIP: 900
};
// the counter of active enemies
MW.ACTIVE_ENEMIES = 0;

MW.LOGOY = 350;
MW.FLAREY = 445;
MW.SCALE = 1.5;
MW.WIDTH = 480;
MW.HEIGHT = 720;
MW.FONTCOLOR = "#1f2d96";
MW.menuWidth = 84;
MW.menuHeight = 77;