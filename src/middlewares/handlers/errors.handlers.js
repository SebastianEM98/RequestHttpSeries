const logErrors = (err, req, res, next) => {
  console.log('Function logErrors');
  next(err);
};

const errorsHandlers = (err, req, res, next) => {
  console.log('Function errorsHandlers');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  next(err);
};

const boomErrorsHandlers = (err, req, res, next) => {
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

module.exports = {logErrors, errorsHandlers, boomErrorsHandlers};