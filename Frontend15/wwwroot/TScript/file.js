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
$(document).ready(function () {
    var isChosen = false;
    var chosenFighter;
    var player;
    var game;
    var isStarted = false;
    $('#Johnny').on('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Johnny!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Johnny!</p>");
        }
        Johnny.ActSelected();
        BattleJoe.ActDeselected();
        Token.ActDeselected();
        document.getElementById("Message").style.color = 'black';
        chosenFighter = 'Johnny';
        $("#SelectButton").collapse('show');
    });
    $('#BattleJoe').on('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Battle Joe!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Battle Joe!</p>");
        }
        BattleJoe.ActSelected();
        Token.ActDeselected();
        Johnny.ActDeselected();
        chosenFighter = 'BattleJoe';
        $("#SelectButton").collapse('show');
    });
    $('#Token').on('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Token!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Token!</p>");
        }
        Token.ActSelected();
        Johnny.ActDeselected();
        BattleJoe.ActDeselected();
        chosenFighter = 'Token';
        $("#SelectButton").collapse('show');
    });
    $('#SelectButton').on('click', function () {
        $('#FighterPopup').modal('hide');
        if (chosenFighter == 'Johnny') {
            player = new Johnny("" + chosenFighter, 100, 0, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe("" + chosenFighter, 100, 0, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token("" + chosenFighter, 100, 0, 'I AM UR DEATH!!!!');
        }
        game = new Game(player);
        game.StartGame();
    });
    $('#PlayerButton').on('click', function () {
        game.isHeroTurn = true;
        game.isPerkChosen = false;
        game.NextStep();
    });
    $('#EnemyMoveButton').on('click', function () {
        game.isHeroTurn = false;
        game.NextStep();
    });
    $('#Perk1Use').on('click', function () {
        game.isHeroTurn = true;
        game.isPerkChosen = true;
        game.ChosenPerk = game.Player.MoveSet[0];
        game.NextStep();
    });
    $('#Perk2Use').on('click', function () {
        game.isHeroTurn = true;
        game.isPerkChosen = true;
        game.ChosenPerk = game.Player.MoveSet[1];
        game.NextStep();
    });
    $('#Perk3Use').on('click', function () {
        game.isHeroTurn = true;
        game.isPerkChosen = true;
        game.ChosenPerk = game.Player.MoveSet[2];
        game.NextStep();
    });
    var Game = /** @class */ (function () {
        function Game(Player) {
            this.Player = Player;
            this.Enemies = [];
            this._isHeroTurn = true;
            this._isPerkChosen = true;
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
            this.Render();
        };
        Object.defineProperty(Game.prototype, "isHeroTurn", {
            get: function () {
                return this._isHeroTurn;
            },
            set: function (isIt) {
                this._isHeroTurn = isIt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "isPerkChosen", {
            get: function () {
                return this._isPerkChosen;
            },
            set: function (isIt) {
                this._isPerkChosen = isIt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "ChosenPerk", {
            get: function () {
                return this._ChosenPerk;
            },
            set: function (chosen) {
                this._ChosenPerk = chosen;
            },
            enumerable: false,
            configurable: true
        });
        Game.prototype.NextStep = function () {
            for (var i = 0; i < this.Player.MoveSet.length; i++) {
                this.Player.MoveSet[i].ChangeProgress(this.Player);
            }
            if (this.isHeroTurn == true) {
                if (this.isPerkChosen == false)
                    this.Player.RegularAttack(this.Player, this.Enemies[0]);
                else {
                    this.ChosenPerk.Execute(this.Player, this.Enemies);
                    this.isPerkChosen = false;
                }
            }
            else {
                var isExecuted = false;
                for (var i = 0; i < this.Enemies[0].MoveSet.length; i++) {
                    if (this.Enemies[0].MoveSet[i].readiness == 100) {
                        this.Enemies[0].MoveSet[i].Execute(this.Player, this.Enemies);
                        isExecuted = true;
                    }
                }
                if (isExecuted == false)
                    this.Enemies[0].RegularAttack(this.Enemies[0], this.Player);
            }
            this.Render();
        };
        Game.prototype.Render = function () {
            $("#progPerk1").css("width", player.MoveSet[0].readiness + "%").attr("aria-valuenow", player.MoveSet[0].readiness);
            $("#progPerk2").css("width", player.MoveSet[1].readiness + "%").attr("aria-valuenow", player.MoveSet[1].readiness);
            $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness);
            $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
            $("#HPBar").css("width", player.hp + "%").attr("aria-valuenow", player.hp);
            $("#EnemyManaBar").css("width", this.Enemies[0].mana + "%").attr("aria-valuenow", this.Enemies[0].mana);
            $("#EnemyHPBar").css("width", this.Enemies[0].hp + "%").attr("aria-valuenow", this.Enemies[0].hp);
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
        Unit.prototype.RegularAttack = function (player, target) {
            if (player instanceof Character) {
                if (target.hp >= 0) {
                    target.hp -= 10;
                    player.mana += 10;
                    // game.NextStep();
                }
                else if (target.hp < 0) { //kill enemy
                    delete target[0];
                    //target.length--
                }
            }
            else {
                if (target.hp >= 0) {
                    target.hp -= 10;
                    player.mana += 10;
                    //game.NextStep();
                }
                else if (target.hp < 0) { //kill enemy
                    /*target[0].hp = 0;
                    $("#EnemyHPBar").css("width", target[0].hp + "%").attr("aria-valuenow", target[0].hp)
                    delete target[0]
                    target.length--*/
                }
            }
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
        }
        Move.prototype.Greet = function () {
        };
        Move.prototype.Execute = function (player, targets) {
        };
        Move.prototype.ChangeProgress = function (player) {
        };
        Object.defineProperty(Move.prototype, "readiness", {
            get: function () {
                return this._rediness;
            },
            set: function (n) {
                this._rediness = n;
            },
            enumerable: false,
            configurable: true
        });
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
            /*$('#EnemyPerks #Perk1Title').html(`${this.name}`);
            $('#EnemyPerks #Perk1Desc').html(`${this.description}`);*/
        };
        Sacrifice.prototype.Execute = function (player, targets) {
            $('#Perk1Use').on('click', function () {
                if (player.MoveSet[0].readiness >= 100) {
                    player.MoveSet[0].readiness = 0;
                }
            });
        };
        Sacrifice.prototype.ChangeProgress = function (player) {
            // let curr_prog_enemy_attack: number = 0;
            if (player.MoveSet[0].readiness < 100) {
                player.MoveSet[0].readiness += 20;
            }
            else if (player.MoveSet[0].readiness >= 100) {
                player.MoveSet[0].readiness = 100;
            }
            /*curr_prog_enemy_attack = +$("#EnemyPerks #progPerk1").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }*/
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
            $('#Perk1Use').on('click', function () {
                if (player.MoveSet[0].readiness >= 100) {
                    player.MoveSet[0].readiness = 0;
                    if (player.mana >= 10) {
                        player.mana -= 10;
                        player.hp += 10;
                    }
                }
            });
        };
        SelfHealing.prototype.ChangeProgress = function (player) {
            if (player.MoveSet[0].readiness < 100) {
                player.MoveSet[0].readiness += 25;
            }
            else if (player.MoveSet[0].readiness >= 100) {
                player.MoveSet[0].readiness = 100;
            }
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
            if (this.readiness == 100) {
                if (targets[0].hp >= 0) {
                    player.MoveSet[1].readiness = 0;
                    player.mana -= 35;
                    targets[0].hp -= 35;
                }
                else if (targets[0].hp < 0) { //kill enemy
                    targets[0].hp = 0;
                    delete targets[0];
                    targets.length--;
                }
                game.NextStep();
            }
        };
        StongAttackOneTarget.prototype.ChangeProgress = function (player) {
            var curr_prog_enemy_attack = 0;
            player.MoveSet[1].readiness += 30;
            if (player.MoveSet[1].readiness < 100) {
                player.MoveSet[1].readiness += 30;
            }
            else if (player.MoveSet[1].readiness >= 100) {
                player.MoveSet[1].readiness = 100;
            }
            /*curr_prog_enemy_attack = +$("#EnemyPerks #progPerk2").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }*/
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
            $('#Perk3Use').on('click', function () {
                if (player.MoveSet[2].readiness >= 100) {
                    player.MoveSet[2].readiness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness);
                }
            });
        };
        StongAttackAll.prototype.ChangeProgress = function (player) {
            if (player.MoveSet[2].readiness < 100) {
                player.MoveSet[2].readiness += 8;
            }
            else if (player.MoveSet[2].readiness >= 100) {
                player.MoveSet[2].readiness = 100;
            }
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
            $('#Perk3Use').on('click', function () {
                if (player.MoveSet[2].readiness >= 100) {
                    player.MoveSet[2].readiness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness);
                }
            });
        };
        SetOnFire.prototype.ChangeProgress = function (player) {
            if (player.MoveSet[2].readiness <= 100) {
                player.MoveSet[2].readiness += 15;
            }
            else if (player.MoveSet[2].readiness > 100) {
                player.MoveSet[2].readiness = 100;
            }
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
        Johnny.ActSelected = function () {
            document.getElementById('Johnny').style.border = "2px solid blue";
            $("#Message").css('color', 'red');
        };
        Johnny.ActDeselected = function () {
            document.getElementById('Johnny').style.border = "none";
        };
        Johnny.prototype.GetPerks = function () {
            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        };
        Johnny.prototype.GetFirstPerk = function () {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        };
        Johnny.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        };
        Johnny.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[1].readiness = 0;
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
        Token.ActSelected = function () {
            document.getElementById('Token').style.border = "2px solid blue";
            document.getElementById('Token').style.background = "gray";
            $("#Message").css('color', 'black');
        };
        Token.ActDeselected = function () {
            document.getElementById('Token').style.border = "none";
            document.getElementById('Token').style.background = "none";
        };
        Token.prototype.GetPerks = function () {
            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        };
        Token.prototype.GetFirstPerk = function () {
            this.MoveSet[0] = new SelfHealing('SelfHealing', 'Lose Mana, get HP');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        };
        Token.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        };
        Token.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[2].readiness = 0;
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
        BattleJoe.ActSelected = function () {
            document.getElementById('BattleJoe').style.border = "2px solid blue";
            $("#Message").css('color', 'red');
        };
        BattleJoe.ActDeselected = function () {
            document.getElementById('BattleJoe').style.border = "none";
        };
        BattleJoe.prototype.GetPerks = function () {
            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        };
        BattleJoe.prototype.GetFirstPerk = function () {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        };
        BattleJoe.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        };
        BattleJoe.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
            this.MoveSet[2].readiness = 0;
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
});
//# sourceMappingURL=file.js.map