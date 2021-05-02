"use strict";
const fetch = require("node-fetch");
module.exports.hello = async (event) => {
  let { id } = event.pathParameters;
  let statusCode;
  let success;
  const url = `http://swapi.py4e.com/api/species/${id}`;
  const resSpecies = await fetch(url);
  const specie = await resSpecies.json();

  if (specie.detail == "Not found") {
    statusCode = 404;
    success = false;
  } else {
    statusCode = 200;
    success = true;
  }
  const specieSpanish = {
    nombre: specie.name,
    clasificacion: specie.classification,
    designacion: specie.designation,
    alturaPromedio: specie.average_height,
    colorPiel: specie.skin_colors,
    colorCabello: specie.hair_colors,
    colorOjo: specie.eye_colors,
    promedioVida: specie.average_lifespan,
    idioma: specie.language,
  };

  return {
    statusCode,
    body: JSON.stringify({
      specieSpanish,
      success,
    }),
  };
};
