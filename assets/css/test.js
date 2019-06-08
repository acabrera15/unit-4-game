
var sumOfAllNumbers = function (num) {
    var total = 0; //holds the sum

    //loops around add adds up 
    for (var i = 1; i <= num; i++) {
        total += i;
    }

    return total;
}

console.log(sumOfAllNumbers(10));