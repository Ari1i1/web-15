$(document).ready(function () {
    let isChosen: boolean = false;
    let chosenFighter: string;
    let player: Character;
    let game: Game;

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
            player = new Johnny(`${chosenFighter}`, 100, 0, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe(`${chosenFighter}`, 100, 0, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token(`${chosenFighter}`, 100, 0, 'I AM UR DEATH!!!!');
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
            for (let i: number = 0; i < game.Player.MoveSet.length; i++) {
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


    class Game {
        constructor(public Player: Character) {

        }
        public Enemies: Enemy[] = [];
        public StartGame(): void {

            this.Player.hp = 100;
            this.Player.mana = 0;
            this.Player.Greet();
            this.Player.GetPerks();

            this.Enemies[0] = new EvilWarrior('Evil Warrior', 100, 0, 'Evil Warrior');
            this.Enemies[0].hp = 100;
            this.Enemies[0].mana = 0;
            this.Enemies[0].Greet();
            this.Enemies[0].GetPerks();

        }
        public isHeroTurn: boolean = true;

        public NextStep(): void {
            for (let i: number = 0; i < this.Player.MoveSet.length; i++) {
                this.Player.MoveSet[i].ChangeProgress(this.Player);
            }
            if (this.isHeroTurn == true) {
                let isExecuted: boolean = false;
                for (let i: number = 0; i < this.Player.MoveSet.length; i++) {
                    if (this.Player.MoveSet[i].rediness == 100) {
                        this.Player.MoveSet[i].Execute(this.Player, this.Enemies);
                        isExecuted = true;
                    }
                }
                if (isExecuted == false)
                    this.Player.RegularAttack(this.Player, this.Enemies[0]);
            }
            else {
                let isExecuted: boolean = false;
                for (let i: number = 0; i < this.Enemies[0].MoveSet.length; i++) {
                    if (this.Enemies[0].MoveSet[i].rediness == 100) {
                        this.Enemies[0].MoveSet[i].Execute(this.Player, this.Enemies);
                    }
                }
                if (isExecuted == false)
                    this.Enemies[0].RegularAttack(this.Enemies[0], this.Player);
            }
        }
    }

    class Unit {
        constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {

        }
        public MoveSet: Move[] = [];
        private _HP: number;
        public get hp(): number {
            return this._HP;
        }
        public set hp(n: number) {
            this._HP = n;

        }
        private _mana: number;
        public get mana(): number {
            return this._mana;
        }
        public set mana(n: number) {
            this._mana = n;
        }

        public MakeAMove(): void {

        }
        public RegularAttack(player: Unit, target: Unit): void {
            target.hp -= 10;
            player.mana += 10;
            if (player instanceof Character) {
                if (target.hp >= 0) {
                    $("#EnemyHPBar").css("width", target.hp + "%").attr("aria-valuenow", target.hp)
                }
                else if (target.hp < 0) { //kill enemy
                    /*target[0].hp = 0;
                    $("#EnemyHPBar").css("width", target[0].hp + "%").attr("aria-valuenow", target[0].hp)
                    delete target[0]
                    target.length--*/
                }
                $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana)
            }
            else {
                if (target.hp >= 0) {
                    $("#HPBar").css("width", target.hp + "%").attr("aria-valuenow", target.hp)
                }
                else if (target.hp < 0) { //kill enemy
                    /*target[0].hp = 0;
                    $("#EnemyHPBar").css("width", target[0].hp + "%").attr("aria-valuenow", target[0].hp)
                    delete target[0]
                    target.length--*/
                }
                $("#EnemyManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana)
            }
        }
    }

    class Enemy extends Unit {
        constructor(public name: string, protected MaxHP: number, protected MaxMana: number, public description: string) {
            super(name, MaxHP, MaxMana);
        }
        public Greet(): void {
            $('#EnemyName').html(`${this.name}`);
            $('#EnemyDesc').html(`${this.description}`);
        }
        public GetPerks(): void {

        }
    }
    class Move {
        constructor(public name: string, public description: string) {
            //...
        }
        public Greet(): void {
        }
        public Execute(player: Character, targets: Unit[]): void {
            //...
        }
        public ChangeProgress(player: Character): void {

        }
        private _rediness: number;
        public get rediness(): number {
            return this._rediness;
        }
        public set rediness(n: number) {
            this._rediness = n;
        }
    }

    //Пример способности
    class Sacrifice extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk1Title').html(`${this.name}`);
            $('#Perk1Desc').html(`${this.description}`);
            $('#EnemyPerks #Perk1Title').html(`${this.name}`);
            $('#EnemyPerks #Perk1Desc').html(`${this.description}`);
        }
        public Execute(player: Character, targets: Unit[]): void {
            $('#Perk1Use').on('click', function () {
                if (player.MoveSet[0].rediness >= 100) {
                    player.MoveSet[0].rediness = 0;
                    $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness)
                }
            });
        }
        public ChangeProgress(player: Character): void {
            let curr_prog_enemy_attack: number = 0;
            player.MoveSet[0].rediness += 20;
            if (player.MoveSet[0].rediness <= 100) {
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness)
            }
            else if (player.MoveSet[0].rediness > 100) {
                player.MoveSet[0].rediness = 100;
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness)
            }
            curr_prog_enemy_attack = +$("#EnemyPerks #progPerk1").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk1").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
        }
    }
    class SelfHealing extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk1Title').html(`${this.name}`);
            $('#Perk1Desc').html(`${this.description}`);
        }
        public Execute(player: Character, targets: Unit[]): void {
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
        }
        public ChangeProgress(player: Character): void {
            player.MoveSet[0].rediness += 25;
            if (player.MoveSet[0].rediness < 100) {
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness)
            }
            else if (player.MoveSet[0].rediness >= 100) {
                player.MoveSet[0].rediness = 100;
                $("#progPerk1").css("width", player.MoveSet[0].rediness + "%").attr("aria-valuenow", player.MoveSet[0].rediness)
            }
        }
    }
    class StongAttackOneTarget extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk2Title').html(`${this.name}`);
            $('#Perk2Desc').html(`${this.description}`);
            $('#EnemyPerks #Perk2Title').html(`${this.name}`);
            $('#EnemyPerks #Perk2Desc').html(`${this.description}`);
        }
        public Execute(player: Character, targets: Unit[]): void {
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
        }
        public ChangeProgress(player: Character): void {
            let curr_prog_enemy_attack: number = 0;
            player.MoveSet[1].rediness += 30;
            if (player.MoveSet[1].rediness <= 100) {
                $("#progPerk2").css("width", player.MoveSet[1].rediness + "%").attr("aria-valuenow", player.MoveSet[1].rediness)
            }
            else if (player.MoveSet[1].rediness > 100) {
                player.MoveSet[1].rediness = 100;
                $("#progPerk2").css("width", player.MoveSet[1].rediness + "%").attr("aria-valuenow", player.MoveSet[1].rediness)
            }
            curr_prog_enemy_attack = +$("#EnemyPerks #progPerk2").attr("aria-valuenow");
            curr_prog_enemy_attack += 20;
            if (curr_prog_enemy_attack <= 100) {
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
            else if (curr_prog_enemy_attack > 100) {
                curr_prog_enemy_attack = 100;
                $("#EnemyPerks #progPerk2").css("width", curr_prog_enemy_attack + "%").attr("aria-valuenow", curr_prog_enemy_attack)
            }
        }
    }
    class StongAttackAll extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk3Title').html(`${this.name}`);
            $('#Perk3Desc').html(`${this.description}`);
        }
        public Execute(player: Character, targets: Unit[]): void {
            $('#Perk3Use').on('click', function () {
                if (player.MoveSet[2].rediness >= 100) {
                    player.MoveSet[2].rediness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
                }
            });
        }
        public ChangeProgress(player: Character): void {
            player.MoveSet[2].rediness += 8;
            if (player.MoveSet[2].rediness <= 100) {
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
            }
            else if (player.MoveSet[2].rediness > 100) {
                player.MoveSet[2].rediness = 100;
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
            }
        }
    }
    class SetOnFire extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk3Title').html(`${this.name}`);
            $('#Perk3Desc').html(`${this.description}`);
        }
        public Execute(player: Character, targets: Unit[]): void {
            $('#Perk3Use').on('click', function () {
                if (player.MoveSet[2].rediness >= 100) {
                    player.MoveSet[2].rediness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
                }
            });
        }
        public ChangeProgress(player: Character): void {
            player.MoveSet[2].rediness += 15;
            if (player.MoveSet[2].rediness <= 100) {
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
            }
            else if (player.MoveSet[2].rediness > 100) {
                player.MoveSet[2].rediness = 100;
                $("#progPerk3").css("width", player.MoveSet[2].rediness + "%").attr("aria-valuenow", player.MoveSet[2].rediness)
            }
        }
    }

    class Character extends Unit {
        constructor(name: string, MaxHP: number, MaxMana: number,/* protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana);
        }
        public Greet(): void {
            $('#HeroName').html(`${this.name}`);
            $('#MottoText').html(`${this.motto}`);
        }
        public ActSelected(): void {
            //...
        }
        public ActDeselected(): void {
            //...
        }
        protected _Highlight(): void {
            //...
        }
        protected _DeHighlight(): void {
            //...
        }
        public GetPerks(): void {

        }

    }
    class Johnny extends Character {
        constructor(public name: string, MaxHP: number, MaxMana: number,/* protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana, motto);
        }

        public ActSelected(): void {
            //...
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[2].Greet();
        }

    }
    class Token extends Character {
        constructor(public name: string, MaxHP: number, MaxMana: number, /*protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana, motto);
        }

        public static ActSelected(): void {
            if (isChosen == true) {
                document.getElementById('Johnny').style.border = "none";
                document.getElementById('BattleJoe').style.border = "none";
            }
            document.getElementById('Token').style.border = "2px solid blue";
            document.getElementById('Token').style.background = "gray";
        }
        public static ActDeselected(): void {
            //...
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new SelfHealing('SelfHealing', 'Lose Mana, get HP');
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[2].rediness = 0;
            this.MoveSet[2].Greet();
        }
    }
    class BattleJoe extends Character {
        constructor(public name: string, MaxHP: number, MaxMana: number, /*protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana, motto);
        }

        public ActSelected(): void {
            //...
        }
        public ActDeselected(): void {
            //...
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].rediness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].rediness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
            this.MoveSet[2].rediness = 0;
            this.MoveSet[2].Greet();
        }
    }

    class EvilWarrior extends Enemy {
        constructor(public name: string, MaxHP: number, MaxMana: number, public description: string) {
            super(name, MaxHP, MaxMana, description);
        }
        /*public get Moves(): Move[] {
            // вернуть набор перков ближнего боя
        }*/
        public GetPerks(): void {
            this.GetFirstPerk();
            this.GetSecondPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].Greet();
        }
    }

    class EvilArcher extends Enemy {
        constructor(public name: string, MaxHP: number, MaxMana: number, public description: string) {
            super(name, MaxHP, MaxMana, description);
        }
        /*public get Moves(): Move[] {
            // вернуть набор перков дальнего боя
        }*/
    }

    class EvilMage extends Enemy {
        constructor(public name: string, MaxHP: number, MaxMana: number, public description: string) {
            super(name, MaxHP, MaxMana, description);
        }
        /*public get Moves(): Move[] {
            // вернуть набор магических перков
        }*/
    }

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