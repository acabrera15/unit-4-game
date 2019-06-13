var obi_wan_kenobi = {
  healthPoints: 120,
  attackPower: 8,
  counterAttackPower: 10,
  name: "obi_wan_kenobi",
};

var lukeSkywalker = {
  healthPoints: 180,
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

$(document).ready(function() {
  var initialCharSelected = false; //if character is selected
  var currentCharDiv;
  var characterChosen;
  var characterToFight;
  var attackPowerHolder = 0;

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
    }
  });

  $("#attackButton").on("click", function() {
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

      characterChosen.healthPoints -= characterToFight.counterAttackPower;
      characterToFight.healthPoints -= characterChosen.attackPower;
      characterChosen.attackPower += attackPowerHolder;

      setHealthOnDisplay();
    }
  });
});
