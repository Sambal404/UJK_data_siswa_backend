// /src/middleware/validation.middleware.js

function validate(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);

            next();
        } catch(err) {
            next(err);
        }
    }
}

module.exports = validate