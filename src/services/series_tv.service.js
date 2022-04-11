const serie_Schema = require('../models/series_tv.model');
const Boom =  require('@hapi/boom');

class SerieService {
  /* Funciones asincronas devuelven una promesa */
  async createSerie(serie){
    serie.save();
    return serie;
  }

  async listSeries(){
    return serie_Schema.find();
  }

  async showSerie(serieId){
    return serie_Schema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound('No se encontro la serie consultada');
      return serieFind;
    });
  }

  async editSerie(serieId, serie, number_seasons, original_language, feature_seasons){
    return serie_Schema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound('No se encontro la serie a editar');
      return serieFind.updateOne({serieId}, { serie, number_seasons, original_language, feature_seasons});
    });
  }

  async removeSerie(serieId){
    return serie_Schema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound('No se encontro la serie a eliminar');
      return serieFind.deleteOne(serieFind);
    });
  }
}
module.exports = SerieService;