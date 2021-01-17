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
            player = new Johnny(`${chosenFighter}`, 100, 100, 'I WILL WIN!!!!');
        }
        else if (chosenFighter == 'BattleJoe') {
            player = new BattleJoe(`${chosenFighter}`, 100, 100, "I WILL KILL Y'ALL!!!!");
        }
        else if (chosenFighter == 'Token') {
            player = new Token(`${chosenFighter}`, 100, 100, 'I AM UR DEATH!!!!');
        }
        let game: Game = new Game(player);
        game.StartGame();
    });

} 

class Game {
    constructor(public Char: Character) {

    }
    public StartGame(): void {


        this.Char.Greet();
        this.Char.GetPerks();

        let curr_prog_attack = 0;
        let curr_prog_attack2 = 0;
        let curr_prog_attack3 = 0;
        $('#AttackButton').on('click', function () {
            var check: string;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_attack = +check;
            curr_prog_attack += 10;
            if (curr_prog_attack <= 100) {
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            else if (curr_prog_attack > 100) {
                curr_prog_attack = 100;
                $("#progPerk1").css("width", curr_prog_attack + "%").attr("aria-valuenow", curr_prog_attack)
            }
            var check2: string;
            check2 = $("#progPerk2").attr("aria-valuenow");
            curr_prog_attack2 = +check2;
            curr_prog_attack2 += 10;
            if (curr_prog_attack2 <= 100) {
                $("#progPerk2").css("width", curr_prog_attack2 + "%").attr("aria-valuenow", curr_prog_attack2)
            }
            else if (curr_prog_attack2 > 100) {
                curr_prog_attack2 = 100;
                $("#progPerk2").css("width", curr_prog_attack2 + "%").attr("aria-valuenow", curr_prog_attack2)
            }
            var check3: string;
            check3 = $("#progPerk2").attr("aria-valuenow");
            curr_prog_attack3 = +check3;
            curr_prog_attack3 += 10;
            if (curr_prog_attack3 <= 100) {
                $("#progPerk3").css("width", curr_prog_attack3 + "%").attr("aria-valuenow", curr_prog_attack3)
            }
            else if (curr_prog_attack3 > 100) {
                curr_prog_attack3 = 100;
                $("#progPerk3").css("width", curr_prog_attack3 + "%").attr("aria-valuenow", curr_prog_attack3)
            }
        });
        this.Char.Heal();
    }
    public isHeroTurn: boolean = true;
    public Enemies: Unit[] = [];
    public NextStep(): void {
                                                         
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
        this._HP = this.MaxHP;
    
    }
    private _mana: number;
    public get mana(): number {
        return this._mana;
    }
    public set mana(n: number) {
        this._mana = this.MaxMana;
    }
    public Heal(): void {
        let cur_prog_heal = 0;
        $('#HealButton').on('click', function () {
            var now_prog_heal: string;
            now_prog_heal = $("#HPBar").attr("aria-valuenow");
            cur_prog_heal = +now_prog_heal;
            cur_prog_heal += 10;
            if (cur_prog_heal <= 100) {
                $("#HPBar").css("width", cur_prog_heal + "%").attr("aria-valuenow", cur_prog_heal)
            }
            else if (cur_prog_heal > 100) {
                cur_prog_heal = 100;
                $("#HPBar").css("width", cur_prog_heal + "%").attr("aria-valuenow", cur_prog_heal)
            }
        });
    } 
}

class Enemy extends Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {
        super(name, MaxHP, MaxMana);
    }
}
class Move {
    constructor(public name: string, public description: string, public activator: string) {
        //...
    }
    public Greet(): void {
    }
    public Execute(/*targets: Unit[]*/): void {
        //...
    }
}

//Пример способности
class Sacrifice extends Move {
    constructor(public name: string, public description: string, public activator: string) {
        super(name, description, activator);
    }
    public Greet(): void {
        $('#Perk1Title').html(`${this.name}`);
        $('#Perk1Desc').html(`${this.description}`);
    }
    public Execute(/*targets: Unit[]*/): void {
        let curr_prog_perk1 = 0;
        $(`${this.activator}`).on('click', function () {
            var check: string;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1)
            }
        });
    }
}
class SelfHealing extends Move {
    constructor(public name: string, public description: string, public activator: string) {
        super(name, description, activator);
    }
    public Greet(): void {
        $('#Perk1Title').html(`${this.name}`);
        $('#Perk1Desc').html(`${this.description}`);
    }
    public Execute(/*targets: Unit[]*/): void {
        let curr_prog_perk1 = 0;
        $(`${this.activator}`).on('click', function () {
            var check: string;
            check = $("#progPerk1").attr("aria-valuenow");
            curr_prog_perk1 = +check;
            if (curr_prog_perk1 >= 100) {
                curr_prog_perk1 = 0;
                $("#progPerk1").css("width", curr_prog_perk1 + "%").attr("aria-valuenow", curr_prog_perk1)
            }
        });
    }
}
class StongAttackOneTarget extends Move {
    constructor(public name: string, public description: string, public activator: string) {
        super(name, description, activator);
    }
    public Greet(): void {
        $('#Perk2Title').html(`${this.name}`);
        $('#Perk2Desc').html(`${this.description}`);
    }
    public Execute(/*targets: Unit[]*/): void {
        let curr_prog_perk2 = 0;
        $(`${this.activator}`).on('click', function () {
            var check: string;
            check = $("#progPerk2").attr("aria-valuenow");
            curr_prog_perk2 = +check;
            if (curr_prog_perk2 >= 100) {
                curr_prog_perk2 = 0;
                $("#progPerk2").css("width", curr_prog_perk2 + "%").attr("aria-valuenow", curr_prog_perk2)
            }
        });
    }
}
class StongAttackAll extends Move {
    constructor(public name: string, public description: string, public activator: string) {
        super(name, description, activator);
    }
    public Greet(): void {
        $('#Perk3Title').html(`${this.name}`);
        $('#Perk3Desc').html(`${this.description}`);
    }
    public Execute(/*targets: Unit[]*/): void {
        let curr_prog_perk3 = 0;
        $(`${this.activator}`).on('click', function () {
            var check: string;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3)
            }
        });
    }
}
class SetOnFire extends Move {
    constructor(public name: string, public description: string, public activator: string) {
        super(name, description, activator);
    }
    public Greet(): void {
        $('#Perk3Title').html(`${this.name}`);
        $('#Perk3Desc').html(`${this.description}`);
    }
    public Execute(/*targets: Unit[]*/): void {
        let curr_prog_perk3 = 0;
        $(`${this.activator}`).on('click', function () {
            var check: string;
            check = $("#progPerk3").attr("aria-valuenow");
            curr_prog_perk3 = +check;
            if (curr_prog_perk3 >= 100) {
                curr_prog_perk3 = 0;
                $("#progPerk3").css("width", curr_prog_perk3 + "%").attr("aria-valuenow", curr_prog_perk3)
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
   /* private GetFirstPerk(): void {
        let perkID: string = '#Perk1Use';
        let firstPerk: Move = new Sacrifice('Sacrifice', 'Lose HP, get Mana', `${perkID}`);
        firstPerk.Greet();
        firstPerk.Execute();
    }
    private GetSecondPerk(): void {
        let SecondPerk: Move;
        let perkID: string = '#Perk2Use';
        let localRand: number = this.randomInteger(1, 2);
        if (localRand == 1) {
            SecondPerk = new SelfHealing('SelfHealing', 'Lose Mana, get HP', `${perkID}`);
        }
        else if (localRand == 2) {
            SecondPerk = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        }
        SecondPerk.Greet();
        SecondPerk.Execute();
    }
    private GetThirdPerk(): void {
        let ThirdPerk: Move;
        let perkID: string = '#Perk3Use';
        let localRand: number = this.randomInteger(1, 2);
        if (localRand == 1) {
            ThirdPerk = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll', `${perkID}`);
        }
        else if (localRand == 2) {
            ThirdPerk = new SetOnFire('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        }
        ThirdPerk.Greet();
        ThirdPerk.Execute();
    }*/

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
        let perkID: string = '#Perk1Use';
        let firstPerk: Move = new Sacrifice('Sacrifice', 'Lose HP, get Mana', `${perkID}`);
        firstPerk.Greet();
        firstPerk.Execute();
    }
    private GetSecondPerk(): void {
        let perkID: string = '#Perk2Use';
        let SecondPerk: Move = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        SecondPerk.Greet();
        SecondPerk.Execute();
    }
    private GetThirdPerk(): void {
        let perkID: string = '#Perk3Use';
        let ThirdPerk: Move = new SetOnFire('SetOnFire', 'SetOnFire', `${perkID}`);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
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
        let perkID: string = '#Perk1Use';
        let firstPerk: Move = new SelfHealing('SelfHealing', 'Lose Mana, get HP', `${perkID}`);
        firstPerk.Greet();
        firstPerk.Execute();
    }
    private GetSecondPerk(): void {
        let perkID: string = '#Perk2Use';
        let SecondPerk: Move = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        SecondPerk.Greet();
        SecondPerk.Execute();
    }
    private GetThirdPerk(): void {
        let perkID: string = '#Perk3Use';
        let ThirdPerk: Move = new SetOnFire('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
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
        let perkID: string = '#Perk1Use';
        let firstPerk: Move = new Sacrifice('Sacrifice', 'Lose HP, get Mana', `${perkID}`);
        firstPerk.Greet();
        firstPerk.Execute();
    }
    private GetSecondPerk(): void {
        let perkID: string = '#Perk2Use';
        let SecondPerk: Move = new StongAttackOneTarget('StrongAttackAgainstOne', 'StrongAttackAgainstOne', `${perkID}`);
        SecondPerk.Greet();
        SecondPerk.Execute();
    }
    private GetThirdPerk(): void {
        let perkID: string = '#Perk3Use';
        let ThirdPerk: Move = new StongAttackAll('StrongAttackAgainstAll', 'StrongAttackAgainstAll', `${perkID}`);
        ThirdPerk.Greet();
        ThirdPerk.Execute();
    }
}

