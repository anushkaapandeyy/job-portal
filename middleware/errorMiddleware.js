//error || next function
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultErros = {
        statusCode: 500,
        message: err,
    };

    //missing field error
    if (err.name === 'ValidationError') {
        defaultErros.statusCode = 400;
        defaultErros.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
    }
    //duplicate error
    if (err.code && err.code === 11000) {
        defaultErros.statusCode = 400;
        defaultErros.message = `${Object.keys(
            err.keyValue
        )} field has to be unique`;
    }
    res.status(defaultErros.statusCode).json({ message: defaultErros.message });
};

export default errorMiddleware;