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
        this.Char.Greet();
        this.Char.GetPerks();
        var curr_prog_attack = 0;
        var curr_prog_attack2 = 0;
        var curr_prog_attack3 = 0;
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
            var check2;
            check2 = $("#progPerk2").attr("aria-valuenow");
            curr_prog_attack2 = +check2;
            curr_prog_attack2 += 10;
            if (curr_prog_attack2 <= 100) {
                $("#progPerk2").css("width", curr_prog_attack2 + "%").attr("aria-valuenow", curr_prog_attack2);
            }
            else if (curr_prog_attack2 > 100) {
                curr_prog_attack2 = 100;
                $("#progPerk2").css("width", curr_prog_attack2 + "%").attr("aria-valuenow", curr_prog_attack2);
            }
            var check3;
            check3 = $("#progPerk2").attr("aria-valuenow");
            curr_prog_attack3 = +check3;
            curr_prog_attack3 += 10;
            if (curr_prog_attack3 <= 100) {
                $("#progPerk3").css("width", curr_prog_attack3 + "%").attr("aria-valuenow", curr_prog_attack3);
            }
            else if (curr_prog_attack3 > 100) {
                curr_prog_attack3 = 100;
                $("#progPerk3").css("width", curr_prog_attack3 + "%").attr("aria-valuenow", curr_prog_attack3);
            }
        });
        this.Char.Heal();
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
    Unit.prototype.Heal = function () {
        var cur_prog_heal = 0;
        $('#HealButton').on('click', function () {
            var now_prog_heal;
            now_prog_heal = $("#HPBar").attr("aria-valuenow");
            cur_prog_heal = +now_prog_heal;
            cur_prog_heal += 10;
            if (cur_prog_heal <= 100) {
                $("#HPBar").css("width", cur_prog_heal + "%").attr("aria-valuenow", cur_prog_heal);
            }
            else if (cur_prog_heal > 100) {
                cur_prog_heal = 100;
                $("#HPBar").css("width", cur_prog_heal + "%").attr("aria-valuenow", cur_prog_heal);
            }
        });
    };
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
var SelfHealing = /** @class */ (function (_super) {
    __extends(SelfHealing, _super);
    function SelfHealing(name, description, activator) {
        var _this = _super.call(this, name, description, activator) || this;
        _this.name = name;
        _this.description = description;
        _this.activator = activator;
        return _this;
    }
    SelfHealing.prototype.Greet = function () {
        $('#Perk1Title').html("" + this.name);
        $('#Perk1Desc').html("" + this.description);
    };
    SelfHealing.prototype.Execute = function ( /*targets: Unit[]*/) {
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
    return SelfHealing;
}(Move));
var StongAttackOneTarget = /** @class */ (function (_super) {
    __extends(StongAttackOneTarget, _super);
    function StongAttackOneTarget(name, description, activator) {
        var _this = _super.call(this, name, description, activator) || this;
        _this.name = name;
        _this.description = description;
        _this.activator = activator;
        return _this;
    }
    StongAttackOneTarget.prototype.Greet = function () {
        $('#Perk2Title').html("" + this.name);
        $('#Perk2Desc').html("" + this.description);
    };
    StongAttackOneTarget.prototype.Execute = function ( /*targets: Unit[]*/) {
        var curr_prog_perk2 = 0;
        $("" + this.activator).on('click', function () {
            var check;
            check = $("#progPerk2").attr("aria-valuenow");
            curr_prog_perk2 = +check;
            if (curr_prog_perk2 >= 100) {
                curr_prog_perk2 = 0;
                $("#progPerk2").css("width", curr_prog_perk2 + "%").attr("aria-valuenow", curr_prog_perk2);
            }
        });
    };
    return StongAttackOneTarget;
}(Move));
var StongAttackAll = /** @class */ (function (_super) {
    __extends(StongAttackAll, _super);
    function StongAttackAll(name, description, activator) {
        var _this = _super.call(this, name, description, activator) || this;
        _this.name = name;
        _this.description = description;
        _this.activator = activator;
        return _this;
    }
    StongAttackAll.prototype.Greet = function () {
        $('#Perk3Title').html("" + this.name);
        $('#Perk3Desc').html("" + this.description);
    };
    StongAttackAll.prototype.Execute = function ( /*targets: Unit[]*/) {
        var curr_prog_perk3 = 0;
        $("" + this.activator).on('click', function () {
            var check;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3);
            }
        });
    };
    return StongAttackAll;
}(Move));
var SetOnFire = /** @class */ (function (_super) {
    __extends(SetOnFire, _super);
    function SetOnFire(name, description, activator) {
        var _this = _super.call(this, name, description, activator) || this;
        _this.name = name;
        _this.description = description;
        _this.activator = activator;
        return _this;
    }
    SetOnFire.prototype.Greet = function () {
        $('#Perk3Title').html("" + this.name);
        $('#Perk3Desc').html("" + this.description);
    };
    SetOnFire.prototype.Execute = function ( /*targets: Unit[]*/) {
        var curr_prog_perk3 = 0;
        $("" + this.activator).on('click', function () {
            var check;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3);
            }
        });
    };
    return SetOnFire;
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
    Johnny.prototype.GetPerks = function () {
        this.GetFirstPerk();
        this.GetSecondPerk();
        this.GetThirdPerk();
    };
    Johnny.prototype.GetFirstPerk = function () {
        var perkID = '#Perk1Use';
        var firstPerk = new Sacrifice('Sacrifice', 'Lose HP, get Mana', "" + perkID);
        firstPerk.Greet();
        firstPerk.Execute();
    };
    Johnny.prototype.GetSecondPerk = function () {
        var perkID = '#Perk2Use';
        var SecondPerk = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', "" + perkID);
        SecondPerk.Greet();
        SecondPerk.Execute();
    };
    Johnny.prototype.GetThirdPerk = function () {
        var perkID = '#Perk3Use';
        var ThirdPerk = new SetOnFire('SetOnFire', 'SetOnFire', "" + perkID);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
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
    Token.prototype.GetPerks = function () {
        this.GetFirstPerk();
        this.GetSecondPerk();
        this.GetThirdPerk();
    };
    Token.prototype.GetFirstPerk = function () {
        var perkID = '#Perk1Use';
        var firstPerk = new SelfHealing('SelfHealing', 'Lose Mana, get HP', "" + perkID);
        firstPerk.Greet();
        firstPerk.Execute();
    };
    Token.prototype.GetSecondPerk = function () {
        var perkID = '#Perk2Use';
        var SecondPerk = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', "" + perkID);
        SecondPerk.Greet();
        SecondPerk.Execute();
    };
    Token.prototype.GetThirdPerk = function () {
        var perkID = '#Perk3Use';
        var ThirdPerk = new SetOnFire('StrongAttackAgainstOne', 'StrongAttackAgainstOne', "" + perkID);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
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
    BattleJoe.prototype.GetPerks = function () {
        this.GetFirstPerk();
        this.GetSecondPerk();
        this.GetThirdPerk();
    };
    BattleJoe.prototype.GetFirstPerk = function () {
        var perkID = '#Perk1Use';
        var firstPerk = new Sacrifice('Sacrifice', 'Lose HP, get Mana', "" + perkID);
        firstPerk.Greet();
        firstPerk.Execute();
    };
    BattleJoe.prototype.GetSecondPerk = function () {
        var perkID = '#Perk2Use';
        var SecondPerk = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', "" + perkID);
        SecondPerk.Greet();
        SecondPerk.Execute();
    };
    BattleJoe.prototype.GetThirdPerk = function () {
        var perkID = '#Perk3Use';
        var ThirdPerk = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll', "" + perkID);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
    };
    return BattleJoe;
}(Character));
//# sourceMappingURL=file.js.map