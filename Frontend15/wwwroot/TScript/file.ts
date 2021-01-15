window.onload = function () {
    let isChosen = false;
    let chosenFighter = null;  
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
        let game = new Game(chosenFighter);
        game.StartGame();
        $('#FighterPopup').modal('hide');
       // document.getElementById('HeroName').innerHTML = `${chosenFighter}`;
    });


} 

class Game {
    constructor(public Char: Character) {

    }
    public StartGame(): void {

        //if ()

        /*const field = document.querySelector('.field');
        let heightWindow = document.documentElement.clientHeight;
        let widthWindow = document.documentElement.clientWidth;
        let player = document.createElement("img");
        player.src = "../img/Johnny.png";
        player.className = "img";
        let top = Math.random() * (heightWindow - 120);
        let left = Math.random() * (widthWindow - 120);
        player.style.top = top + 'px';
        player.style.left = left + 'px';
        field.appendChild(player);*/
    }
    public isHeroTurn: boolean = true;
    public Enemies: Unit[] = [];
    public NextStep(): void {
        document.getElementById('Perk1Use').addEventListener('click', () => {
           //our progress bar 
            $('.Perk1Use').each(function () {
                let now: any = $(this).attr('aria-valuenow');
                let siz = now - 10;
                $(this).css('width', siz + '%');
            });
            // evil pb
            $('.Perk1Use').each(function () {
                let now: any = $(this).attr('aria-valuenow');
                let siz = now - 10;
                $(this).css('width', siz + '%');
            });
        });                                                    
        // ...
    }
}

class Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {

    }
    /*public MoveSet: Move[] = [];
    private _HP: number;
    public get hp(): number {
        //...
    }
    public set hp(n: number) {
        //...
    
    }
    private _mana: number;
    public get mana(): number {
        //...
    }
    public set mana(n: number) {
        //...
    }*/

}

class Enemy extends Unit {
    constructor(public name: string, protected MaxHP: number, protected MaxMana: number) {
        super(name, MaxHP, MaxMana);
    }
}
class Move {
    constructor(public name: string, public description: string) {
        //...
    }
    public Execute(targets: Unit[]): void {
        //...
    }
}

//Пример способности
/*class Sacrifice extends Move {
    constructor() {
        super();
    }
    public Execute(targets: Unit[]): void {
            
    }
}*/
class Character extends Unit {
    constructor(name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana);
    }
    public Greet(): void {
        //...
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
}
class Johnny extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
    }
    public ActSelected(): void {
        //...
    }
}
class Token extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
    }
    public ActSelected(): void {
        //...
    }
    public ActDeselected(): void {
        //...
    }
}
class BattleJoe extends Character {
    constructor(public name: string, MaxHP: number, MaxMana: number, protected selector: string, public motto: string) {
        super(name, MaxHP, MaxMana, selector, motto);
    }
    public ActSelected(): void {
        //...
    }
    public ActDeselected(): void {
        //...
    }
}

