var obi_wan_kenobi = {
  healthPoints: 0,
  attackPower: 0,
  counterAttackPower: 0,
  imgAddress: "../images/obiWan"
};

var luke_skywalker = {
  healthPoints: 0,
  attackPower: 0,
  counterAttackPower: 0
};

var darth_sidous = {
  healthPoints: 0,
  attackPower: 0,
  counterAttackPower: 0
};

var darth_maul = {
  healthPoints: 0,
  attackPower: 0,
  counterAttackPower: 0
};

$(document).ready(function() {
  var initialCharSelected = false;

  $(".card").on("click", function(e) {
    var cardArr = $(".card");

    if (!initialCharSelected) {
      $("#" + e.currentTarget.id).appendTo(".yourChar");
      initialCharSelected = true;
        var counter = 1;
      for (var i = 0; i < cardArr.length; i++) {
        console.log(cardArr[i].id);
        if (e.currentTarget.id != cardArr[i].id) {
            $('#' + cardArr[i].id).appendTo('#attack' + counter.toString());
            counter++;
        }
      }
    }
  });
});
