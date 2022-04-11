const express = require('express');
const serie_Schema = require('../models/series_tv.model');
const SerieService = require('../services/series_tv.service');
const serie_routes = express.Router();

/* Creamos una instancia de la clase superheroService */
const _instance_service = new SerieService();

/* http://localhost:5000/api/v3/series/serie */
serie_routes.post('/serie', async (req, res) => {
  try {
    const serie = serie_Schema(req.body);
    const data = await _instance_service.createSerie(serie);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({message: error});
  }
});

/* http://localhost:5000/api/v3/series */
serie_routes.get('/', async (req, res) => {
  try {
    const data = await _instance_service.listSeries();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({message: error});
  }
});

/* http://localhost:5000/api/v3/series/serieId */
serie_routes.get('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params;
    const data = await _instance_service.showSerie(serieId);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({message: error});
  }
});

/* http://localhost:5000/api/v3/series/serieId */
serie_routes.put('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params;
    const {
      serie,
      number_seasons,
      original_language,
      feature_seasons = {season_number, season_name, cast, episodes: {episode_description, duration}}
    } = req.body;
    const data = await _instance_service.editSerie(
      serieId,
      serie,
      number_seasons,
      original_language,
      feature_seasons
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: error});
  }
});

/* http://localhost:5000/api/v3/series/serieId */
serie_routes.delete('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params;
    const data = await _instance_service.removeSerie(serieId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({message: error});
  }
});

module.exports = serie_routes;