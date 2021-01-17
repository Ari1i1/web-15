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
            player = new Johnny("" + chosenFighter, 100, 0, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe("" + chosenFighter, 100, 0, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token("" + chosenFighter, 100, 0, 'I AM UR DEATH!!!!');
        }
        var game = new Game(player);
        game.StartGame();
    });
};
var Game = /** @class */ (function () {
    function Game(Player) {
        this.Player = Player;
        this.Enemies = [];
        this.isHeroTurn = true;
    }
    Game.prototype.StartGame = function () {
        this.Player.hp = 100;
        this.Player.mana = 0;
        this.Player.Greet();
        this.Player.GetPerks();
        this.Enemies[0] = new EvilWarrior('Evil Warrior', 100, 0, 'Evil Warrior');
        this.Enemies[0].hp = 100;
        this.Enemies[0].mana = 0;
        this.Enemies[0].Greet();
        this.Enemies[0].GetPerks();
        this.NextStep();
    };
    Game.prototype.NextStep = function () {
        for (var i = 1; i < this.Player.MoveSet.length; i++) {
            this.Player.MoveSet[i].ChangeProgress();
            this.Player.MoveSet[i].Execute(this.Player, this.Enemies);
        }
        this.Player.RegularAttack(this.Player, this.Enemies);
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
            this._HP = n;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Unit.prototype, "mana", {
        get: function () {
            return this._mana;
        },
        set: function (n) {
            this._mana = n;
        },
        enumerable: false,
        configurable: true
    });
    Unit.prototype.MakeAMove = function () {
    };
    return Unit;
}());
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, MaxHP, MaxMana, description) {
        var _this = _super.call(this, name, MaxHP, MaxMana) || this;
        _this.name = name;
        _this.MaxHP = MaxHP;
        _this.MaxMana = MaxMana;
        _this.description = description;
        return _this;
    }
    Enemy.prototype.Greet = function () {
        $('#EnemyName').html("" + this.name);
        $('#EnemyDesc').html("" + this.description);
    };
    Enemy.prototype.GetPerks = function () {
    };
    return Enemy;
}(Unit));
var Move = /** @class */ (function () {
    function Move(name, description) {
        this.name = name;
        this.description = description;
        //...
    }
    Move.prototype.Greet = function () {
    };
    Move.prototype.Execute = function (player, targets) {
        //...
    };
    Move.prototype.ChangeProgress = function () {
    };
    return Move;
}());
//Пример способности
var Sacrifice = /** @class */ (function (_super) {
    __extends(Sacrifice, _super);
    function Sacrifice(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    Sacrifice.prototype.Greet = function () {
        $('#Perk1Title').html("" + this.name);
        $('#Perk1Desc').html("" + this.description);
        $('#EnemyPerks #Perk1Title').html("" + this.name);
        $('#EnemyPerks #Perk1Desc').html("" + this.description);
    };
    Sacrifice.prototype.Execute = function (player, targets) {
        var curr_prog_perk1 = 0;
        $('#Perk3Use').on('click', function () {
            var check;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1);
            }
        });
    };
    Sacrifice.prototype.ChangeProgress = function () {
        var curr_prog_attack = 0;
        var curr_prog_enemy_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk1").attr("aria-valuenow");
            curr_prog_attack += 20;
            if (curr_prog_attack <= 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            curr_prog_enemy_attack = +$("#EnemyPerks #progPerk1").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack);
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack);
            }
        });
    };
    return Sacrifice;
}(Move));
var SelfHealing = /** @class */ (function (_super) {
    __extends(SelfHealing, _super);
    function SelfHealing(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    SelfHealing.prototype.Greet = function () {
        $('#Perk1Title').html("" + this.name);
        $('#Perk1Desc').html("" + this.description);
    };
    SelfHealing.prototype.Execute = function (player, targets) {
        var curr_prog_perk1 = 0;
        var mana_prog = 0;
        var HP_prog = 0;
        $('#Perk1Use').on('click', function () {
            var check;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1);
                var checkMana = $("#ManaBar").attr("aria-valuenow");
                mana_prog = +checkMana;
                if (mana_prog >= 10) {
                    mana_prog -= 10;
                    $("#ManaBar").css("width", mana_prog + "%").attr("aria-valuenow", mana_prog);
                    var checkHP = $("#HPBar").attr("aria-valuenow");
                    HP_prog = +checkHP;
                    HP_prog += 10;
                    $("#HPBar").css("width", HP_prog + "%").attr("aria-valuenow", HP_prog);
                }
            }
        });
    };
    SelfHealing.prototype.ChangeProgress = function () {
        var curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk1").attr("aria-valuenow");
            curr_prog_attack += 25;
            if (curr_prog_attack < 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack >= 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
        });
    };
    return SelfHealing;
}(Move));
var StongAttackOneTarget = /** @class */ (function (_super) {
    __extends(StongAttackOneTarget, _super);
    function StongAttackOneTarget(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    StongAttackOneTarget.prototype.Greet = function () {
        $('#Perk2Title').html("" + this.name);
        $('#Perk2Desc').html("" + this.description);
        $('#EnemyPerks #Perk2Title').html("" + this.name);
        $('#EnemyPerks #Perk2Desc').html("" + this.description);
    };
    StongAttackOneTarget.prototype.Execute = function (player, targets) {
        var curr_prog_perk2 = 0;
        $('#Perk2Use').on('click', function () {
            curr_prog_perk2 = +$("#progPerk2").attr("aria-valuenow");
            if (curr_prog_perk2 == 100) {
                curr_prog_perk2 = 0;
                player.mana += 35;
                $("#progPerk2").css("width", curr_prog_perk2 + "%").attr("aria-valuenow", curr_prog_perk2);
                targets[0].hp -= 35;
                if (targets[0].hp >= 0) {
                    $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp);
                }
                else if (targets[0].hp < 0) { //kill enemy
                    targets[0].hp = 0;
                    $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp);
                    delete targets[0];
                    targets.length--;
                }
                $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
            }
        });
    };
    StongAttackOneTarget.prototype.ChangeProgress = function () {
        var curr_prog_attack = 0;
        var curr_prog_enemy_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk2").attr("aria-valuenow");
            curr_prog_attack += 10;
            if (curr_prog_attack <= 100) {
                $("#progPerk2").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk2").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            curr_prog_enemy_attack = +$("#EnemyPerks #progPerk2").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack);
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack);
            }
        });
    };
    return StongAttackOneTarget;
}(Move));
var StongAttackAll = /** @class */ (function (_super) {
    __extends(StongAttackAll, _super);
    function StongAttackAll(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    StongAttackAll.prototype.Greet = function () {
        $('#Perk3Title').html("" + this.name);
        $('#Perk3Desc').html("" + this.description);
    };
    StongAttackAll.prototype.Execute = function (player, targets) {
        var curr_prog_perk3 = 0;
        $('#Perk3Use').on('click', function () {
            var check;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3);
            }
        });
    };
    StongAttackAll.prototype.ChangeProgress = function () {
        var curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk3").attr("aria-valuenow");
            curr_prog_attack += 8;
            if (curr_prog_attack <= 100) {
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
        });
    };
    return StongAttackAll;
}(Move));
var SetOnFire = /** @class */ (function (_super) {
    __extends(SetOnFire, _super);
    function SetOnFire(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    SetOnFire.prototype.Greet = function () {
        $('#Perk3Title').html("" + this.name);
        $('#Perk3Desc').html("" + this.description);
    };
    SetOnFire.prototype.Execute = function (player, targets) {
        var curr_prog_perk3 = 0;
        $('#Perk3Use').on('click', function () {
            var check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3);
            }
        });
    };
    SetOnFire.prototype.ChangeProgress = function () {
        var curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk3").attr("aria-valuenow");
            curr_prog_attack += 15;
            if (curr_prog_attack <= 100) {
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack);
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
    Character.prototype.RegularAttack = function (player, targets) {
        $('#AttackButton').on('click', function () {
            targets[0].hp -= 10;
            player.mana += 10;
            if (targets[0].hp >= 0) {
                $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp);
            }
            else if (targets[0].hp < 0) { //kill enemy
                targets[0].hp = 0;
                $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp);
                delete targets[0];
                targets.length--;
            }
            $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
        });
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
        this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
        this.MoveSet[0].Greet();
    };
    Johnny.prototype.GetSecondPerk = function () {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    };
    Johnny.prototype.GetThirdPerk = function () {
        this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
        this.MoveSet[2].Greet();
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
        this.MoveSet[0] = new SelfHealing('SelfHealing', 'Lose Mana, get HP');
        this.MoveSet[0].Greet();
    };
    Token.prototype.GetSecondPerk = function () {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    };
    Token.prototype.GetThirdPerk = function () {
        this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
        this.MoveSet[2].Greet();
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
        this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
        this.MoveSet[0].Greet();
    };
    BattleJoe.prototype.GetSecondPerk = function () {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    };
    BattleJoe.prototype.GetThirdPerk = function () {
        this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
        this.MoveSet[2].Greet();
    };
    return BattleJoe;
}(Character));
var EvilWarrior = /** @class */ (function (_super) {
    __extends(EvilWarrior, _super);
    function EvilWarrior(name, MaxHP, MaxMana, description) {
        var _this = _super.call(this, name, MaxHP, MaxMana, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    /*public get Moves(): Move[] {
        // вернуть набор перков ближнего боя
    }*/
    EvilWarrior.prototype.GetPerks = function () {
        this.GetFirstPerk();
        this.GetSecondPerk();
    };
    EvilWarrior.prototype.GetFirstPerk = function () {
        this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
        this.MoveSet[0].Greet();
    };
    EvilWarrior.prototype.GetSecondPerk = function () {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    };
    return EvilWarrior;
}(Enemy));
var EvilArcher = /** @class */ (function (_super) {
    __extends(EvilArcher, _super);
    function EvilArcher(name, MaxHP, MaxMana, description) {
        var _this = _super.call(this, name, MaxHP, MaxMana, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    return EvilArcher;
}(Enemy));
var EvilMage = /** @class */ (function (_super) {
    __extends(EvilMage, _super);
    function EvilMage(name, MaxHP, MaxMana, description) {
        var _this = _super.call(this, name, MaxHP, MaxMana, description) || this;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    return EvilMage;
}(Enemy));
//# sourceMappingURL=file.js.map