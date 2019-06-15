var obi_wan_kenobi = {
  healthPoints: 120,
  attackPower: 8,
  counterAttackPower: 10,
  name: "obi_wan_kenobi"
};

var lukeSkywalker = {
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 5,
  name: "lukeSkywalker"
};

var darthSidious = {
  healthPoints: 150,
  attackPower: 8,
  counterAttackPower: 20,
  name: "darthSidious"
};

var darthMaul = {
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 25,
  name: "darthMaul"
};

//sets the healthPoints to the display
var setHealthOnDisplay = function() {
  $("#obi_wan_kenobiHealthPoints").text(obi_wan_kenobi.healthPoints);
  $("#lukeSkywalkerHealthPoints").text(lukeSkywalker.healthPoints);
  $("#darthSidiousHealthPoints").text(darthSidious.healthPoints);
  $("#darthMaulHealthPoints").text(darthMaul.healthPoints);
};

//returns an object of the same name as an ID entered
var setObjectVarFromId = function(id) {
  if (id === obi_wan_kenobi.name) {
    return obi_wan_kenobi;
  } else if (id === lukeSkywalker.name) {
    return lukeSkywalker;
  } else if (id === darthSidious.name) {
    return darthSidious;
  } else if (id === darthMaul.name) {
    return darthMaul;
  } else {
    console.log("unknown");
  }
};

//resets the game to initial values and look
var resetGame = function() {
  window.location.reload();
};

$(document).ready(function() {
  var initialCharSelected = false; //if character is selected
  var currentCharDiv;
  var characterChosen;
  var characterToFight;
  var attackPowerHolder = 0;
  var noOneToAttack = true;
  var enemiesDefeatedCount = 0;

  setHealthOnDisplay();

  //do something if a card is clicked
  $(".card").on("click", function(e) {
    var cardArr = $(".card"); //array of the different cards

    //cheks if character isnt selected
    if (!initialCharSelected) {
      currentCharDiv = e.currentTarget.id; //hold current character
      characterChosen = setObjectVarFromId(e.currentTarget.id); //holds the chosen character
      attackPowerHolder = characterChosen.attackPower;

      $("#" + currentCharDiv).appendTo(".yourChar");
      initialCharSelected = true;
      var counter = 1;
      for (var i = 0; i < cardArr.length; i++) {
        console.log(cardArr[i].id);
        if (e.currentTarget.id != cardArr[i].id) {
          $("#" + cardArr[i].id).appendTo("#attack" + counter.toString());
          counter++;
        }
      }
    } else if (e.currentTarget.id != currentCharDiv) {
      $("#" + e.currentTarget.id).appendTo("#defenderSection");
      characterToFight = setObjectVarFromId(e.currentTarget.id);
      noOneToAttack = false;
    }
  });

  $("#attackButton").on("click", function() {
    if (!noOneToAttack) {
      if (initialCharSelected && characterToFight !== undefined) {
        $("#youAttackP").text(
          `You attacked ${characterToFight.name} for ${
            characterChosen.attackPower
          } damage`
        );

        $("#defenderAttackedP").text(
          `${characterToFight.name} attacked you back for ${
            characterToFight.counterAttackPower
          } damage`
        );
        characterToFight.healthPoints -= characterChosen.attackPower;
        if (characterToFight.healthPoints <= 0) {
          enemiesDefeatedCount++;
          console.log(enemiesDefeatedCount);
          if (enemiesDefeatedCount === 3) {
            $("#youAttackP").text("You have Won!!");
            $("#defenderAttackedP").text("GAME OVER!!!!");

            $("#defenderAttackedP").html(
              '<button type="button" class="btn btn-danger rounded-pill" id="resetButton">RESET</button>'
            );
            $("#resetButton").on("click", resetGame);
          } else {
            $("#youAttackP").text(`You have defeated ${characterToFight.name}`);
            $("#defenderAttackedP").text(
              "You can choose another character to fight."
            );
            $("#defenderSection").empty();
            noOneToAttack = true;
            characterChosen.attackPower += attackPowerHolder;
          }
        } else {
          characterChosen.healthPoints -= characterToFight.counterAttackPower;
          characterChosen.attackPower += attackPowerHolder;
        }
      }

      setHealthOnDisplay();

      if (characterChosen.healthPoints <= 0) {
        $("#youAttackP").text("You have been defeated");
        $("#defenderAttackedP").html(
          '<button type="button" class="btn btn-danger rounded-pill" id="resetButton">RESET</button>'
        );
        $("#resetButton").on("click", resetGame);
      }
    }
  });
});
