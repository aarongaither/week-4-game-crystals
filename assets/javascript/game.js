function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeGems() {
    for (let i = 0; i < go.pics.length; i++) {
        let imgElem = $("<img>").attr("id", i + 1).attr("src", "assets/images/" + go.pics[i]);
        $("#crystals").append(imgElem);
        imgElem.click(function() { go.gameLoop(this.id); });
    }
}

let go = {
    targetNum: 0,
    currentTotal: 0,
    crystalNums: [],
    wins: 0,
    losses: 0,
    pics: ["gem1.svg", "gem2.svg", "gem3.svg", "gem4.svg"],
    init: function() {
        this.currentTotal = 0;
        this.generateTargetNum();
        this.generateCrystalNums();
        this.updatePage("targetNum");
        this.updatePage("currentTotal");
    },
    generateTargetNum: function() {
        this.targetNum = getRandom(19, 120);
    },
    generateCrystalNums: function() {
    	this.crystalNums = [];
        while (this.crystalNums.length < 4) {
            let rand = getRandom(1, 12);
            if (this.crystalNums.indexOf(rand) === -1) {
                this.crystalNums.push(rand);
            }
        }
    },
    gameLoop: function(index) {
        this.addVal(index);
        if (!this.checkWin()) { this.checkLose(); }
    },
    addVal: function(index) {
        console.log("index:", index);
        this.currentTotal += this.crystalNums[index - 1];
        this.updatePage("currentTotal");
    },
    updatePage: function(id) {
        $("#" + id).text(this[id]);
    },
    checkWin: function() {
        if (this.currentTotal === this.targetNum) {
            this.wins += 1;
            this.updatePage("wins");
            this.init();
            return true;
        } else {
            return false;
        }
    },
    checkLose: function() {
        if (this.currentTotal > this.targetNum) {
            this.losses += 1;
            this.updatePage("losses");
            this.init();
            return true;
        } else {
            return false;
        }
    }
}

//setup page
makeGems();
// init game
go.init();
go.updatePage("wins");
go.updatePage("losses");
