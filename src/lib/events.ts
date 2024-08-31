//* EVENT RELATED FUNCTIONS

/** 
 * @param {String} position - The callsign of the position
 * @returns {Number} Integer representing the position type
*/
export function getPositionType(position: String): Number{
  let i = 1;
  if (position.split("_").length == 3) {
    i++;
  }
  switch(position.split("_")[i]) {
    case "DEL": {
      if (position.split("_")[0] == "MCO") {
        return 1.1;
      } else if (position.split("_")[0] == "JAX") {
        return 1.2;
      } else {
        return 1.3;
      }
    }
    case "GND": {
      if (position.split("_")[0] == "MCO") {
        return 2.1;
      } else if (position.split("_")[0] == "JAX") {
        return 2.2;
      } else {
        return 2.3;
      }
    }; 
    case "TWR": {
      if (position.split("_")[0] == "MCO") {
        return 3.1;
      } else if (position.split("_")[0] == "JAX") {
        return 3.2;
      } else {
        return 3.3;
      }
    }
    case "APP": {
      if (position.split("_")[0] == "MCO") {
        return 4.1;
      } else if (position.split("_")[0] == "JAX") {
        return 4.2;
      } else {
        return 4.3;
      }
    }
    case "DEP": {
      if (position.split("_")[0] == "MCO") {
        return 4.1;
      } else if (position.split("_")[0] == "JAX") {
        return 4.2;
      } else {
        return 4.3;
      }
    }
    case "CTR": {
      return 5;
    }
    default: break;
  }
}