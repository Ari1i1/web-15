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
    var chosenFighter = null;
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
        var game = new Game(chosenFighter);
        game.StartGame();
        $('#FighterPopup').modal('hide');
        // document.getElementById('HeroName').innerHTML = `${chosenFighter}`;
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
        /*const field = document.querySelector('.field');
        let heightWindow = document.documentElement.clientHeight;
        let widthWindow = document.documentElement.clientWidth;
        let player = document.createElement("img");
        player.src = "../img/Johnny.png";
        player.className = "img";
        let top = Math.random() * (heightWindow - 120);
        let left = Math.random() * (widthWindow - 120);
        player.style.top = top + 'px';
        player.style.left = left + 'px';
        field.appendChild(player);*/
    };
    Game.prototype.NextStep = function () {
        document.getElementById('Perk1Use').addEventListener('click', function () {
            //our progress bar 
            $('.Perk1Use').each(function () {
                var now = $(this).attr('aria-valuenow');
                var siz = now - 10;
                $(this).css('width', siz + '%');
            });
            // evil pb
            $('.Perk1Use').each(function () {
                var now = $(this).attr('aria-valuenow');
                var siz = now - 10;
                $(this).css('width', siz + '%');
            });
        });
        // ...
    };
    return Game;
}());
var Unit = /** @class */ (function () {
    function Unit(name, MaxHP, MaxMana) {
        this.name = name;
        this.MaxHP = MaxHP;
        this.MaxMana = MaxMana;
    }
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
    function Move(name, description) {
        this.name = name;
        this.description = description;
        //...
    }
    Move.prototype.Execute = function (targets) {
        //...
    };
    return Move;
}());
//Пример способности
/*class Sacrifice extends Move {
    constructor() {
        super();
    }
    public Execute(targets: Unit[]): void {
            
    }
}*/
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.selector = selector;
        _this.motto = motto;
        return _this;
    }
    Character.prototype.Greet = function () {
        //...
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
    return Character;
}(Unit));
var Johnny = /** @class */ (function (_super) {
    __extends(Johnny, _super);
    function Johnny(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
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
    function Token(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
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
    function BattleJoe(name, MaxHP, MaxMana, selector, motto) {
        var _this = _super.call(this, name, MaxHP, MaxMana, selector, motto) || this;
        _this.name = name;
        _this.selector = selector;
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