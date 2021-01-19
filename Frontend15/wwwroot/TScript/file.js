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
    $('#Johnny').on('click', function () {
        if (isChosen != true) {
            $("#Message").collapse('show');
            $("<p>Hi! I'm Johnny!</p>").appendTo("#Message");
            isChosen = true;
        }
        else {
            jQuery('#Message*').html("<p>Hi! I'm Johnny!</p>");
        }
        add_frameJohnny();
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
        add_frameBattleJoe();
        document.getElementById("Message").style.color = 'red';
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
        document.getElementById("Message").style.color = 'black';
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
    $(function () {
        $("#EnemyMoveButton").attr('disabled', 'disabled');
        $('#Perk1Use').attr('disabled', 'disabled');
        $('#Perk2Use').attr('disabled', 'disabled');
        $('#Perk3Use').attr('disabled', 'disabled');
        $('#PlayerButton').on('click', function () {
            $("#PlayerButton").attr('disabled', 'disabled');
            $("#EnemyMoveButton").removeAttr('disabled');
            game.isHeroTurn = true;
            game.NextStep();
        });
        $('#EnemyMoveButton').on('click', function () {
            $("#EnemyMoveButton").attr('disabled', 'disabled');
            $('#Perk1Use').attr('disabled', 'disabled');
            $('#Perk2Use').attr('disabled', 'disabled');
            $('#Perk3Use').attr('disabled', 'disabled');
            game.isHeroTurn = false;
            game.NextStep();
            $("#PlayerButton").removeAttr('disabled');
            for (var i = 0; i < game.Player.MoveSet.length; i++) {
                if (game.Player.MoveSet[i].rediness == 100) {
                    if (i == 0) {
                        $('#Perk1Use').removeAttr('disabled');
                        game.Player.MoveSet[0].Execute(game.Player, game.Enemies);
                    }
                    else if (i == 1) {
                        $('#Perk2Use').removeAttr('disabled');
                        game.Player.MoveSet[1].Execute(game.Player, game.Enemies);
                    }
                    else if (i == 2) {
                        $('#Perk3Use').removeAttr('disabled');
                        game.Player.MoveSet[2].Execute(game.Player, game.Enemies);
                    }
                }
            }
        });
    });
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
        };
        Game.prototype.NextStep = function () {
            for (var i = 0; i < this.Player.MoveSet.length; i++) {
                this.Player.MoveSet[i].ChangeProgress(this.Player);
            }
            if (this.isHeroTurn == true) {
                var isExecuted = false;
                for (var i = 0; i < this.Player.MoveSet.length; i++) {
                    if (this.Player.MoveSet[i].rediness == 100) {
                        this.Player.MoveSet[i].Execute(this.Player, this.Enemies);
                        isExecuted = true;
                    }
                }
                if (isExecuted == false)
                    this.Player.RegularAttack(this.Player, this.Enemies[0]);
            }
            else {
                var isExecuted = false;
                for (var i = 0; i < this.Enemies[0].MoveSet.length; i++) {
                    if (this.Enemies[0].MoveSet[i].rediness == 100) {
                        this.Enemies[0].MoveSet[i].Execute(this.Player, this.Enemies);
                    }
                }
                if (isExecuted == false)
                    this.Enemies[0].RegularAttack(this.Enemies[0], this.Player);
            }
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
            target.hp -= 10;
            player.mana += 10;
            if (player instanceof Character) {
                if (target.hp >= 0) {
                    $("#EnemyHPBar").css("width", target.hp + "%").attr("aria-valuenow", target.hp);
                }
                else if (target.hp < 0) { //kill enemy
                    /*target[0].hp = 0;
                    $("#EnemyHPBar").css("width", target[0].hp + "%").attr("aria-valuenow", target[0].hp)
                    delete target[0]
                    target.length--*/
                }
                $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
            }
            else {
                if (target.hp >= 0) {
                    $("#HPBar").css("width", target.hp + "%").attr("aria-valuenow", target.hp);
                }
                else if (target.hp < 0) { //kill enemy
                    /*target[0].hp = 0;
                    $("#EnemyHPBar").css("width", target[0].hp + "%").attr("aria-valuenow", target[0].hp)
                    delete target[0]
                    target.length--*/
                }
                $("#EnemyManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
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
            //...
        }
        Move.prototype.Greet = function () {
        };
        Move.prototype.Execute = function (player, targets) {
            //...
        };
        Move.prototype.ChangeProgress = function (player) {
        };
        Object.defineProperty(Move.prototype, "rediness", {
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
            $('#EnemyPerks #Perk1Title').html("" + this.name);
            $('#EnemyPerks #Perk1Desc').html("" + this.description);
        };
        Sacrifice.prototype.Execute = function (player, targets) {
            $('#Perk1Use').on('click', function () {
                if (player.MoveSet[0].rediness >= 100) {
                    player.MoveSet[0].rediness = 0;
                    $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
                }
            });
        };
        Sacrifice.prototype.ChangeProgress = function (player) {
            var curr_prog_enemy_attack = 0;
            player.MoveSet[0].rediness += 20;
            if (player.MoveSet[0].rediness <= 100) {
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
            }
            else if (player.MoveSet[0].rediness > 100) {
                player.MoveSet[0].rediness = 100;
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
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
                if (player.MoveSet[0].rediness >= 100) {
                    player.MoveSet[0].rediness = 0;
                    $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
                    if (player.mana >= 10) {
                        player.mana -= 10;
                        $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
                        player.hp += 10;
                        $("#HPBar").css("width", player.hp + "%").attr("aria-valuenow", player.hp);
                    }
                }
            });
        };
        SelfHealing.prototype.ChangeProgress = function (player) {
            player.MoveSet[0].rediness += 25;
            if (player.MoveSet[0].rediness < 100) {
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
            }
            else if (player.MoveSet[0].rediness >= 100) {
                player.MoveSet[0].rediness = 100;
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness);
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
            $('#Perk2Use').on('click', function () {
                player.MoveSet[1].rediness = 0;
                player.mana -= 35;
                $("#progPerk2").css("width", player.MoveSet[1].rediness + "%").attr("aria-valuenow", player.MoveSet[1].rediness);
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
            });
        };
        StongAttackOneTarget.prototype.ChangeProgress = function (player) {
            var curr_prog_enemy_attack = 0;
            player.MoveSet[1].rediness += 30;
            if (player.MoveSet[1].rediness <= 100) {
                $("#progPerk2").css("width", player.MoveSet[1].rediness + "%").attr("aria-valuenow", player.MoveSet[1].rediness);
            }
            else if (player.MoveSet[1].rediness > 100) {
                player.MoveSet[1].rediness = 100;
                $("#progPerk2").css("width", player.MoveSet[1].rediness + "%").attr("aria-valuenow", player.MoveSet[1].rediness);
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
                if (player.MoveSet[2].rediness >= 100) {
                    player.MoveSet[2].rediness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
                }
            });
        };
        StongAttackAll.prototype.ChangeProgress = function (player) {
            player.MoveSet[2].rediness += 8;
            if (player.MoveSet[2].rediness <= 100) {
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
            }
            else if (player.MoveSet[2].rediness > 100) {
                player.MoveSet[2].rediness = 100;
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
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
                if (player.MoveSet[2].rediness >= 100) {
                    player.MoveSet[2].rediness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
                }
            });
        };
        SetOnFire.prototype.ChangeProgress = function (player) {
            player.MoveSet[2].rediness += 15;
            if (player.MoveSet[2].rediness <= 100) {
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
            }
            else if (player.MoveSet[2].rediness > 100) {
                player.MoveSet[2].rediness = 100;
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness);
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
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        };
        Johnny.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        };
        Johnny.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[1].rediness = 0;
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
            if (isChosen == true) {
                document.getElementById('Johnny').style.border = "none";
                document.getElementById('BattleJoe').style.border = "none";
            }
            document.getElementById('Token').style.border = "2px solid blue";
            document.getElementById('Token').style.background = "gray";
        };
        Token.ActDeselected = function () {
            //...
        };
        Token.prototype.GetPerks = function () {
            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        };
        Token.prototype.GetFirstPerk = function () {
            this.MoveSet[0] = new SelfHealing('SelfHealing', 'Lose Mana, get HP');
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        };
        Token.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        };
        Token.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[2].rediness = 0;
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
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        };
        BattleJoe.prototype.GetSecondPerk = function () {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        };
        BattleJoe.prototype.GetThirdPerk = function () {
            this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
            this.MoveSet[2].rediness = 0;
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
    function add_frameJohnny() {
        if (isChosen == true) {
            document.getElementById('BattleJoe').style.border = "none";
            document.getElementById('Token').style.border = "none";
            document.getElementById('Token').style.background = "none";
        }
        document.getElementById('Johnny').style.border = "2px solid blue";
    }
    function add_frameBattleJoe() {
        if (isChosen == true) {
            document.getElementById('Johnny').style.border = "none";
            document.getElementById('Token').style.border = "none";
            document.getElementById('Token').style.background = "none";
        }
        document.getElementById('BattleJoe').style.border = "2px solid blue";
    }
});
//# sourceMappingURL=file.js.map