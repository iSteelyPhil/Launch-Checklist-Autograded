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
  list = document.querySelector("#faultyItems");
  let pilotName = document.querySelector("#pilotStatus");
  pilotName.textContent = `Pilot ${pilot} is ready for launch`;
  let copilotName = document.querySelector("#copilotStatus");
  copilotName.textContent = `Co-pilot ${copilot} is ready for launch`;
  if (fuelLevel < 10000) {
    list.style.visibility = `visible`;
    document.querySelector("#fuelStatus").textContent =
      "Fuel level too low for launch";
    document.querySelector(
      "#launchStatus"
    ).textContent = `Shuttle Not Ready for Launch`;
    document.querySelector("#launchStatus").style.color = `red`;
  } else {
    list.style.visibility = `visible`;
    document.querySelector("#launchStatus").style.color = `green`;
    document.querySelector("#fuelStatus").textContent =
      "Fuel level high enough for launch";
    document.querySelector("#launchStatus").textContent =
      "Shuttle is Ready for Launch";
  }

  if (cargoLevel > 10000) {
    list.style.visibility = `visible`;
    document.querySelector("#cargoStatus").textContent =
      "Cargo mass too heavy for launch";
    document.querySelector(
      "#launchStatus"
    ).textContent = `Shuttle Not Ready for Launch`;
    document.querySelector("#launchStatus").style.color = `red`;
  } else {
    list.style.visibility = `visible`;
    document.querySelector("#launchStatus").style.color = `green`;
    document.querySelector("#cargoStatus").textContent =
      "Cargo mass low enough for launch";
    document.querySelector("#launchStatus").textContent =
      "Shuttle is Ready for Launch";
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
