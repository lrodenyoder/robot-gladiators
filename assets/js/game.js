var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// you can also log multiple values at once
// console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// for (var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }


//create fight function
var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        //alert players they are starting a round
        // window.alert("Welcome robot gladiators!");

        // ask player it they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //is player picks 'skip', confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
                //if no (false), ask question again by running fight(); again
                // } else {
                //     fight();
                // }
                //if player did not enter a valid option
            }
        }

        //if player choses to fight
        
        //subtract value of playerAttack from value of enemyHealth and use that result to update enemyHealth var
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney = playerMoney + 20;
            //leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //subtract value of enemyAttack from playerHealth and use that result to update playerHealth var
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            //leave while() loop since player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        //if player choses to skip
        // else {
        //     window.alert("You need to choose a valid option. Try again!");
        // }
    }
};

//execute function to start game
// fight();

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
    } else {
        window.alert("You have lost your robot in battle. Game over!");
    }
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}