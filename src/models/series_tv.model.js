const mongoose = require('mongoose')
const serie_Schema = mongoose.Schema({
  serie: { type: String, require: true, unique: true },
  number_seasons: { type: Number, require: true},
  original_language: {type: String, require: true},
  feature_seasons: {
    type: Object,
    require: true,
    season_number: { type: Number, require: true},
    season_name: { type: String, require: true},
    cast: { type: Array, require: true},
    episodes: {
      type: Object,
      require: true,
      episode_description: {type: String, require: true},
      duration: { type: Number, require: true},
    },
  },
});

const serie_schema_model = mongoose.model('SerieCollection', serie_Schema);
module.exports = serie_schema_model;