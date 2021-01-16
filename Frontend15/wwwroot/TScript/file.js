var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var isChosen = false;
    var chosenFighter;
    document.getElementById('Johnny').addEventListener('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Johnny!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Johnny!</p>");
        }
        chosenFighter = 'Johnny';
        $("#SelectButton").collapse('show');
    });
    document.getElementById('BattleJoe').addEventListener('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Battle Joe!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Battle Joe!</p>");
        }
        chosenFighter = 'BattleJoe';
        $("#SelectButton").collapse('show');
    });
    document.getElementById('Token').addEventListener('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Token!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Token!</p>");
        }
        chosenFighter = 'Token';
        $("#SelectButton").collapse('show');
    });
    document.getElementById('SelectButton').addEventListener('click', function () {
        $('#FighterPopup').modal('hide');
        var player;
        if (chosenFighter == 'Johnny') {
            player = new Johnny("" + chosenFighter, 100, 100, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe("" + chosenFighter, 100, 100, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token("" + chosenFighter, 100, 100, 'I AM UR DEATH!!!!');
        }
        var game = new Game(player);
        game.StartGame();
    });
};
var Game = /** @class */ (function () {
    function Game(Char) {
        this.Char = Char;
        this.isHeroTurn = true;
        this.Enemies = [];
    }
    Game.prototype.StartGame = function () {
        //if ()
        // change progress bar
        this.Char.Greet();
        this.Char.GetPerks();
        var curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            var check;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_attack = +check;
            curr_prog_attack += 10;
            if (curr_prog_attack <= 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
        });
    };
    Game.prototype.NextStep = function () {
    };
    return Game;
}());
var Unit = /** @class */ (function () {
    function Unit(name, MaxHP, MaxMana) {
        this.name = name;
        this.MaxHP = MaxHP;
        this.MaxMana = MaxMana;
        this.MoveSet = [];
    }
    Object.defineProperty(Unit.prototype, "hp", {
        get: function () {
            return this._HP;
        },
        set: function (n) {
            this._HP = this.MaxHP;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Unit.prototype, "mana", {
        get: function () {
            return this._mana;
        },
        set: function (n) {
            this._mana = this.MaxMana;
        },
        enumerable: false,
        configurable: true
    });
    return Unit;
}());
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, MaxHP, MaxMana) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.name = name;
        _this.MaxHP = MaxHP;
        _this.MaxMana = MaxMana;
        return _this;
    }
    return Enemy;
}(Unit));
var Move = /** @class */ (function () {
    function Move(name, description, activator) {
        this.name = name;
        this.description = description;
        this.activator = activator;
        //...
    }
    Move.prototype.Greet = function () {
    };
    Move.prototype.Execute = function ( /*targets: Unit[]*/) {
        //...
    };
    return Move;
}());
//Пример способности
var Sacrifice = /** @class */ (function (_super) {
    __extends(Sacrifice, _super);
    function Sacrifice(name, description, activator) {
        var _this = _super.call(this, name, description, activator) || this;
        _this.name = name;
        _this.description = description;
        _this.activator = activator;
        return _this;
    }
    Sacrifice.prototype.Greet = function () {
        $('#Perk1Title').html("" + this.name);
        $('#Perk1Desc').html("" + this.description);
    };
    Sacrifice.prototype.Execute = function ( /*targets: Unit[]*/) {
        var curr_prog_perk1 = 0;
        $("" + this.activator).on('click', function () {
            var check;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1);
            }
        });
    };
    return Sacrifice;
}(Move));
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, MaxHP, MaxMana, /* protected selector: string,*/ motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.motto = motto;
        return _this;
    }
    Character.prototype.Greet = function () {
        $('#HeroName').html("" + this.name);
        $('#MottoText').html("" + this.motto);
    };
    Character.prototype.ActSelected = function () {
        //...
    };
    Character.prototype.ActDeselected = function () {
        //...
    };
    Character.prototype._Highlight = function () {
        //...
    };
    Character.prototype._DeHighlight = function () {
        //...
    };
    Character.prototype.GetPerks = function () {
        var rand = 1;
        if (rand == 1) {
            var perkID = '#Perk1Use';
            var firstPerk = new Sacrifice('Sacrifice', 'Lose HP, get Mana', "" + perkID);
            firstPerk.Greet();
            firstPerk.Execute();
        }
    };
    return Character;
}(Unit));
var Johnny = /** @class */ (function (_super) {
    __extends(Johnny, _super);
    function Johnny(name, MaxHP, MaxMana, /* protected selector: string,*/ motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, motto) || this;
        _this.name = name;
        _this.motto = motto;
        return _this;
    }
    Johnny.prototype.ActSelected = function () {
        //...
    };
    return Johnny;
}(Character));
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token(name, MaxHP, MaxMana, /*protected selector: string,*/ motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, motto) || this;
        _this.name = name;
        _this.motto = motto;
        return _this;
    }
    Token.prototype.ActSelected = function () {
        //...
    };
    Token.prototype.ActDeselected = function () {
        //...
    };
    return Token;
}(Character));
var BattleJoe = /** @class */ (function (_super) {
    __extends(BattleJoe, _super);
    function BattleJoe(name, MaxHP, MaxMana, /*protected selector: string,*/ motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, motto) || this;
        _this.name = name;
        _this.motto = motto;
        return _this;
    }
    BattleJoe.prototype.ActSelected = function () {
        //...
    };
    BattleJoe.prototype.ActDeselected = function () {
        //...
    };
    return BattleJoe;
}(Character));
//# sourceMappingURL=file.js.map