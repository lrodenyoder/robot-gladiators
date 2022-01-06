var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// you can also log multiple values at once
console.log(playerName, playerHealth, playerAttack, playerMoney);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;


//create function
var fight = function () {
    //alert players they are starting a round
    window.alert("Welcome robot gladiators!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "fight" || promptFight === "FIGHT") {
        

        //subtract value of playerAttack from value of enemyHealth and use that result to update enemyHealth var
        enemyHealth = enemyHealth - playerAttack;

        //log resulting message to console
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        
        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //subtract value of enemyAttack from playerHealth and use that result to update playerHealth var
        playerHealth = playerHealth - enemyAttack;

        //log resulting message to console
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }

        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        
    }

    else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            playerMoney = playerMoney - 2;
        }

        else {
            fight();
        }
    }

    else {
        window.alert("You need to choose a valid option. Try again!");
    }

};

//execute function
fight();