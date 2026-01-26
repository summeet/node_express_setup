const mongoose = require('mongoose');
const httpStatus = require('./constant/httpStatus');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middleware/error');

// Mock helpers
const mkRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.send = (body) => {
        res.body = body;
        return res;
    };
    res.json = (body) => {
        res.body = body;
        return res;
    };
    res.locals = {};
    return res;
};

const mkReq = () => { };

// 1. Test Converter Preservation
console.log('--- Test 1: Converter Preservation ---');
const validationId = new mongoose.Error.ValidationError();
validationId.errors = {
    name: new mongoose.Error.ValidatorError({ message: 'Name is required', path: 'name' })
};
// Mongoose validation error name is 'ValidationError'

const next = (err) => {
    console.log('Converted Error Name:', err.name);
    console.log('Converted Error has errors prop:', !!err.errors);

    // 2. Test Handler Logic
    console.log('--- Test 2: Handler Logic ---');
    const res = mkRes();
    errorHandler(err, mkReq(), res, () => { });

    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', JSON.stringify(res.body, null, 2));
};

errorConverter(validationId, mkReq(), mkRes(), next);
