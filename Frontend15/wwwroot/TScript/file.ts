window.onload = function () {
    let isChosen: boolean = false;
    let chosenFighter: string;  
    let player: Character;
    let game: Game;
    document.getElementById('Johnny').addEventListener('click', () => {
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
    document.getElementById('BattleJoe').addEventListener('click', () => {
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
    document.getElementById('Token').addEventListener('click', () => {
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
    document.getElementById('SelectButton').addEventListener('click', () => {
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
        game.NextStep();
    });
    $('#EnemyMoveButton').on('click', function () {
        game.isHeroTurn = false;
        game.NextStep();
    });
    
} 

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
        for (let i: number = 1; i < this.Player.MoveSet.length; i++) {
            this.Player.MoveSet[i].ChangeProgress(this.Player);
        }
        if (this.isHeroTurn == true) {
            this.Player.RegularAttack(this.Player, this.Enemies[0]);
            for (let i: number = 1; i < this.Player.MoveSet.length; i++) {
                if (this.Player.MoveSet[i].rediness == 100) {
                    this.Player.MoveSet[i].Execute(this.Player, this.Enemies);
                }
            }
        }
        else {
            this.Enemies[0].RegularAttack(this.Enemies[0], this.Player);
            for (let i: number = 1; i < this.Enemies[0].MoveSet.length; i++) {
                if (this.Enemies[0].MoveSet[i].rediness == 100) {
                    this.Enemies[0].MoveSet[i].Execute(this.Player, this.Enemies);
                }
            }
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
        if (player.name == 'Johnny' || player.name == 'BattleJoe' || player.name == 'Token') {
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