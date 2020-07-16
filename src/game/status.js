var GameStatus = cc.Class.extend({
    ctor: function () {
        this.endGame = false;
        this.score = 0;
        this.difficulty = 1;
    },
    getScore: function () {
        return this.score;
    },
    addScore: function (score) {
        this.score += score;
    },
    isEndGame: function () {
        return this.endGame;
    },
    setEndGame: function (newState) {
        this.endGame = newState;
    },
    setDifficulty: function (difficulty) {
        this._difficulty = difficulty;
    },
    getDifficulty: function () {
        return this._difficulty;
    }
})