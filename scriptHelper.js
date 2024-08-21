// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
  
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let launchStatus = document.getElementById("launchStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  let errMsg = "";
  if (
    validateInput(pilot) === `Empty` ||
    validateInput(copilot) === `Empty` ||
    validateInput(fuelLevel) === `Empty` ||
    validateInput(cargoLevel) === `Empty`
  ) {
    errMsg += `All fields are required\n`;
  }
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    errMsg += `Please use only numbers for Fuel Level and Cargo Mass\n`;
  }
  if (
    validateInput(pilot) === `Is a Number` ||
    validateInput(copilot) === `Is a Number`
  ) {
    errMsg += "Use only letters for names of Pilot and CoPilot\n";
  }

  if (errMsg !== "") {
    alert(errMsg);
    /*     location.reload(); */
  } else {
    list.style.visibility = "hidden";
  }
  ////////////////////
  if (Number(fuelLevel) < 10000) {
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
  } else {
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
  }

  if (Number(cargoLevel) > 10000) {
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
  } else {
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
  }
  if (
    validateInput(pilot) === `Empty` ||
    validateInput(pilot) === `Is a Number`
  ) {
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
    pilotStatus.innerHTML = `Pilot not ready for launch`;
  } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  }
  if (
    validateInput(copilot) === `Empty` ||
    validateInput(copilot) === `Is a Number`
  ) {
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = `red`;
    copilotStatus.innerHTML = `Co-Pilot not ready for launch`;
  } else {
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
  }
  if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
    if (
      validateInput(pilot) !== `Empty` &&
      validateInput(copilot) !== `Empty` &&
      validateInput(pilot) !== `Is a Number` &&
      validateInput(copilot) !== `Is a Number`
    ) {
      list.style.visibility = `visible`;
      launchStatus.innerHTML = `Shuttle is Ready for Launch`;
      launchStatus.style.color = `green`;
    }
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length);
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
