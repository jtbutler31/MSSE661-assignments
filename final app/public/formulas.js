
      function calpheonMeal()
      {
        var softBread = parseFloat(document.getElementById("softBreadValue").value);
        var milkTea = parseFloat(document.getElementById("milkTeaValue").value);
        var fishFilletSalad = parseFloat(document.getElementById("fishFilletSaladValue").value);
        var cheesePie = parseFloat(document.getElementById("cheesePieValue").value);
        var meatPasta = parseFloat(document.getElementById("meatPastaValue").value);
        var calpheonValue = (2*softBread + milkTea + fishFilletSalad + cheesePie + meatPasta) / 2.5;
        document.getElementById("resultOne").innerHTML = calpheonValue;
      }

      function balenosMeal()
      {
        var cheeseGratin = parseFloat(document.getElementById("cheeseGratinValue").value);
        var meatCroquette = parseFloat(document.getElementById("meatCroquetteValue").value);
        var smokedFishSteak = parseFloat(document.getElementById("smokedFishSteakValue").value);
        var stirFriedVegetables = parseFloat(document.getElementById("stirFriedVegetablesValue").value);
        var beer = parseFloat(document.getElementById("beerValue").value);
        var balenosValue = ( cheeseGratin  + meatCroquette + smokedFishSteak + 2*stirFriedVegetables + 2*beer) / 2.5;
        document.getElementById("resultTwo").innerHTML = balenosValue;
        }