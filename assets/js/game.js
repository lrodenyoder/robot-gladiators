//BEGIN GAME FUNCTIONS

//function to create random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//function to check if player wants to fight or skip
var fightOrSkip = function () {

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "" || promptFight === null) {
        window.alert("Please enter a valid answer! Try again.");
        //run function again until player enters valid answer
        return fightOrSkip();
    }

    //convert promptFight to all lowercase
    promptFight = promptFight.toLocaleLowerCase();

    //is player picks 'skip', confirm and stop the loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
};

//fight function (with parameter for enemy name)
var fight = function (enemy) {

    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player fi they'd like to fight or skip using fightOrSkip();
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }
        
            //subtract value of playerAttack from value of enemyHealth and use that result to update enemyHealth var
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
        
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        //player gets attacked first
        } else {

            //subtract value of enemyAttack from playerHealth and use that result to update playerHealth var
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
        
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave while() loop since player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function () {
    //reset player stats
    playerInfo.reset();

    //fight each enemy robot by looping over them and fighting one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);

        //if player is alive, keep fighting
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy based of the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemyHealth before new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            //pass the pickedEnemyName variable's value into the fight function, where it will assume the enemyName parameter
            fight(pickedEnemyObj);
            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } /*if player is dead, stop program*/else {
            window.alert("You have lost your robot in battle. Game over!");
            break;
        }
    }

    //after loop ends, player is either out of health or enemies to fight, run endGame();
    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    //check localStorage for high score
    var highScore = localStorage.getItem("highScore");
    
    if (highScore === null) {
        highScore = 0;
    }

    //if player has more money than current high score, player has new high highScore
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game. You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart Game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

    var shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};
//END GAME FUNCTIONS

//BEGIN GAME INFORMATION/VARIABLES

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 12)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 13)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
//END GAME INFORMATION/VARIABLES

//RUN GAME
startGame();