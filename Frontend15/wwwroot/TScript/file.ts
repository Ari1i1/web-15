$(document).ready(function () {
    let isChosen: boolean = false;
    let chosenFighter: string;
    let player: Character;
    let game: Game;
    let isStarted: boolean = false;

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

            this.Render();
        }

        protected _isHeroTurn: boolean = true;
        public get isHeroTurn(): boolean {
            return this._isHeroTurn;
        }
        public set isHeroTurn(isIt: boolean) {
            this._isHeroTurn = isIt;
        }

        protected _isPerkChosen: boolean = true;
        public get isPerkChosen(): boolean {
            return this._isPerkChosen;
        }
        public set isPerkChosen(isIt: boolean) {
            this._isPerkChosen = isIt;
        }

        protected _ChosenPerk: Move;
        public get ChosenPerk(): Move {
            return this._ChosenPerk;
        }
        public set ChosenPerk(chosen: Move) {
            this._ChosenPerk = chosen;
        }
        public NextStep(): void {
            for (let i: number = 0; i < this.Player.MoveSet.length; i++) {
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
                let isExecuted: boolean = false;
                for (let i: number = 0; i < this.Enemies[0].MoveSet.length; i++) {
                    if (this.Enemies[0].MoveSet[i].readiness == 100) {
                        this.Enemies[0].MoveSet[i].Execute(this.Player, this.Enemies);
                        isExecuted = true;
                    }
                }
                if (isExecuted == false)
                    this.Enemies[0].RegularAttack(this.Enemies[0], this.Player);
            }
            this.Render();
        }
        public Render(): void {
            $("#progPerk1").css("width", player.MoveSet[0].readiness + "%").attr("aria-valuenow", player.MoveSet[0].readiness)
            $("#progPerk2").css("width", player.MoveSet[1].readiness + "%").attr("aria-valuenow", player.MoveSet[1].readiness)
            $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness)
            $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana);
            $("#HPBar").css("width", player.hp + "%").attr("aria-valuenow", player.hp);
            $("#EnemyManaBar").css("width", this.Enemies[0].mana + "%").attr("aria-valuenow", this.Enemies[0].mana)
            $("#EnemyHPBar").css("width", this.Enemies[0].hp + "%").attr("aria-valuenow", this.Enemies[0].hp)
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
            if (player instanceof Character) {
                if (target.hp >= 0) {
                    target.hp -= 10;
                    player.mana += 10;
                   // game.NextStep();
                }
                else if (target.hp < 0) { //kill enemy
                    delete target[0]
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
        }
        public Greet(): void {
        }
        public Execute(player: Character, targets: Unit[]): void {
        }
        public ChangeProgress(player: Character): void {
        }
        private _rediness: number;
        public get readiness(): number {
            return this._rediness;
        }
        public set readiness(n: number) {
            this._rediness = n;
        }
        public isChosen: boolean;
    }

    //Пример способности
    class Sacrifice extends Move {
        constructor(public name: string, public description: string) {
            super(name, description);
        }
        public Greet(): void {
            $('#Perk1Title').html(`${this.name}`);
            $('#Perk1Desc').html(`${this.description}`);
            /*$('#EnemyPerks #Perk1Title').html(`${this.name}`);
            $('#EnemyPerks #Perk1Desc').html(`${this.description}`);*/
        }
        public Execute(player: Character, targets: Unit[]): void {
            $('#Perk1Use').on('click', function () {
                if (player.MoveSet[0].readiness >= 100) {
                    player.MoveSet[0].readiness = 0;
                }
            });
        }
        public ChangeProgress(player: Character): void {
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
                if (player.MoveSet[0].readiness >= 100) {
                    player.MoveSet[0].readiness = 0;
                    if (player.mana >= 10) {
                        player.mana -= 10; 
                        player.hp += 10;
                    }
                }
            });
        }
        public ChangeProgress(player: Character): void {
            if (player.MoveSet[0].readiness < 100) {
                player.MoveSet[0].readiness += 25;
            }
            else if (player.MoveSet[0].readiness >= 100) {
                player.MoveSet[0].readiness = 100;
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
        }
        public ChangeProgress(player: Character): void {
            let curr_prog_enemy_attack: number = 0;
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
                if (player.MoveSet[2].readiness >= 100) {
                    player.MoveSet[2].readiness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness)
                }
            });
        }
        public ChangeProgress(player: Character): void {
            if (player.MoveSet[2].readiness < 100) {
                player.MoveSet[2].readiness += 8;
            }
            else if (player.MoveSet[2].readiness >= 100) {
                player.MoveSet[2].readiness = 100;
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
                if (player.MoveSet[2].readiness >= 100) {
                    player.MoveSet[2].readiness = 0;
                    $("#progPerk3").css("width", player.MoveSet[2].readiness + "%").attr("aria-valuenow", player.MoveSet[2].readiness)
                }
            });
        }
        public ChangeProgress(player: Character): void {
            if (player.MoveSet[2].readiness <= 100) {
                player.MoveSet[2].readiness += 15;
            }
            else if (player.MoveSet[2].readiness > 100) {
                player.MoveSet[2].readiness = 100;
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

        public static ActSelected(): void {
            document.getElementById('Johnny').style.border = "2px solid blue";
            $("#Message").css('color', 'red');
        }
        public static ActDeselected(): void {
            document.getElementById('Johnny').style.border = "none";
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[2].Greet();
        }

    }
    class Token extends Character {
        constructor(public name: string, MaxHP: number, MaxMana: number, /*protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana, motto);
        }

        public static ActSelected(): void {
            document.getElementById('Token').style.border = "2px solid blue";
            document.getElementById('Token').style.background = "gray";
            $("#Message").css('color', 'black');
        }
        public static ActDeselected(): void {
            document.getElementById('Token').style.border = "none";
            document.getElementById('Token').style.background = "none";
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new SelfHealing('SelfHealing', 'Lose Mana, get HP');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
            this.MoveSet[2].readiness = 0;
            this.MoveSet[2].Greet();
        }
    }
    class BattleJoe extends Character {
        constructor(public name: string, MaxHP: number, MaxMana: number, /*protected selector: string,*/ public motto: string) {
            super(name, MaxHP, MaxMana, motto);
        }

        public static ActSelected(): void {
            document.getElementById('BattleJoe').style.border = "2px solid blue";
            $("#Message").css('color', 'red');
        }
        public static ActDeselected(): void {
            document.getElementById('BattleJoe').style.border = "none";
        }
        public GetPerks(): void {

            this.GetFirstPerk();
            this.GetSecondPerk();
            this.GetThirdPerk();
        }
        private GetFirstPerk(): void {
            this.MoveSet[0] = new Sacrifice('Sacrifice', 'Lose HP, get Mana');
            this.MoveSet[0].readiness = 0;
            this.MoveSet[0].Greet();
        }
        private GetSecondPerk(): void {
            this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
            this.MoveSet[1].readiness = 0;
            this.MoveSet[1].Greet();
        }
        private GetThirdPerk(): void {
            this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
            this.MoveSet[2].readiness = 0;
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

});