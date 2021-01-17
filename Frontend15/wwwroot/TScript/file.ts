window.onload = function () {
    let isChosen: boolean = false;
    let chosenFighter: string;  
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
        let player: Character;
        if (chosenFighter == 'Johnny') {
            player = new Johnny(`${chosenFighter}`, 100, 0, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe(`${chosenFighter}`, 100, 0, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token(`${chosenFighter}`, 100, 0, 'I AM UR DEATH!!!!');
        }
        let game: Game = new Game(player);
        game.StartGame();
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

        this.NextStep();
    }
    public isHeroTurn: boolean = true;
    
    public NextStep(): void {
        for (let i: number = 1; i < this.Player.MoveSet.length; i++) {
            this.Player.MoveSet[i].ChangeProgress();
            this.Player.MoveSet[i].Execute(this.Player, this.Enemies);
        }

        this.Player.RegularAttack(this.Player, this.Enemies);
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
    public ChangeProgress(): void {

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
        let curr_prog_perk1 = 0;
        $('#Perk3Use').on('click', function () {
            var check: string;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1)
            }
        });
    }
    public ChangeProgress(): void {
        let curr_prog_attack: number = 0;
        let curr_prog_enemy_attack: number = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk1").attr("aria-valuenow");
            curr_prog_attack += 20;
            if (curr_prog_attack <= 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
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
        });
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
        let curr_prog_perk1 = 0;
        let mana_prog = 0;
        let HP_prog = 0;
        $('#Perk1Use').on('click', function () {
            var check: string;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1);
                var checkMana: string = $("#ManaBar").attr("aria-valuenow");
                mana_prog = +checkMana;
                if (mana_prog >= 10) {
                    mana_prog -= 10;
                    $("#ManaBar").css("width", mana_prog + "%").attr("aria-valuenow", mana_prog);
                    var checkHP: string = $("#HPBar").attr("aria-valuenow");
                    HP_prog = +checkHP;
                    HP_prog += 10;
                    $("#HPBar").css("width", HP_prog + "%").attr("aria-valuenow", HP_prog);
                }
            }
        });
    }
    public ChangeProgress(): void {
        let curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk1").attr("aria-valuenow");
            curr_prog_attack += 25;
            if (curr_prog_attack < 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack >= 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
        });
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
        let curr_prog_perk2: number = 0;
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
    }
    public ChangeProgress(): void {
        let curr_prog_attack: number = 0;
        let curr_prog_enemy_attack: number = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk2").attr("aria-valuenow");
            curr_prog_attack += 10;
            if (curr_prog_attack <= 100) {
                $("#progPerk2").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk2").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
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
        });
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
        let curr_prog_perk3 = 0;
        $('#Perk3Use').on('click', function () {
            var check: string;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3)
            }
        });
    }
    public ChangeProgress(): void {
        let curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk3").attr("aria-valuenow");
            curr_prog_attack += 8;
            if (curr_prog_attack <= 100) {
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
        });
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
        let curr_prog_perk3 = 0;
        $('#Perk3Use').on('click', function () {
            var check: string = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3)
            }
        });
    }
    public ChangeProgress(): void {
        let curr_prog_attack = 0;
        $('#AttackButton').on('click', function () {
            curr_prog_attack = +$("#progPerk3").attr("aria-valuenow");
            curr_prog_attack += 15;
            if (curr_prog_attack <= 100) {
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk3").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
        });
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
    public RegularAttack(player: Character, targets: Unit[]): void {
        $('#AttackButton').on('click', function () {
            targets[0].hp -= 10;
            player.mana += 10;
            if (targets[0].hp >= 0) {
                $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp)
            }
            else if (targets[0].hp < 0) { //kill enemy
                targets[0].hp = 0;
                $("#EnemyHPBar").css("width", targets[0].hp + "%").attr("aria-valuenow", targets[0].hp)
                delete targets[0]
                targets.length--
            }
            $("#ManaBar").css("width", player.mana + "%").attr("aria-valuenow", player.mana)
        });
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
        this.MoveSet[0].Greet();
    }
    private GetSecondPerk(): void {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    }
    private GetThirdPerk(): void {
        this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
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
        this.MoveSet[0].Greet();
    }
    private GetSecondPerk(): void {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    }
    private GetThirdPerk(): void {
        this.MoveSet[2] = new SetOnFire('SetOnFire', 'SetOnFire');
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
        this.MoveSet[0].Greet();
    }
    private GetSecondPerk(): void {
        this.MoveSet[1] = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne');
        this.MoveSet[1].Greet();
    }
    private GetThirdPerk(): void {
        this.MoveSet[2] = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll');
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