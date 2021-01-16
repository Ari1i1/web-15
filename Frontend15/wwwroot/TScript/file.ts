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

        //if ()
        // change progress bar

        this.Char.Greet();
        this.Char.GetPerks();

        let curr_prog_attack = 0;
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
        });

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
        
        let rand: number = 1;
        if (rand == 1) {
            let perkID: string = '#Perk1Use';
            let firstPerk: Move = new Sacrifice('Sacrifice', 'Lose HP, get Mana', `${perkID}`);
            firstPerk.Greet();
            firstPerk.Execute();
        }
    }
}
class Johnny extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number,/* protected selector: string,*/ public motto: string) {
        super(name, MaxHP, MaxMana, motto);
    }

    public ActSelected(): void {
        //...
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
}

