var obi_wan_kenobi = {
  healthPoints: 120,
  attackPower: 8,
  counterAttackPower: 10,
  imgAddress: "../images/obiWan"
};

var lukeSkywalker = {
  healthPoints: 180,
  attackPower: 8,
  counterAttackPower: 5
};

var darthSidious = {
  healthPoints: 150,
  attackPower: 8,
  counterAttackPower: 20
};

var darthMaul = {
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 25
};

var setHealthOnDisplay = function() {
  $("#obi_wan_kenobiHealthPoints").text(obi_wan_kenobi.healthPoints);
  $("#lukeSkywalkerHealthPoints").text(lukeSkywalker.healthPoints);
  $("#darthSidiousHealthPoints").text(darthSidious.healthPoints);
  $("#darthMaulHealthPoints").text(darthMaul.healthPoints);
};

$(document).ready(function() {
  var initialCharSelected = false; //if character is selected
  var currentCharDiv;

  setHealthOnDisplay();

  //do something if a card is clicked
  $(".card").on("click", function(e) {
    var cardArr = $(".card"); //array of the different cards
    //cheks if character isnt selected
    if (!initialCharSelected) {
      currentCharDiv = e.currentTarget.id; //hold current character

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
    }
  });
});
