import express from 'express';

import { register } from "../controllers/authenticate";

export default (router: express.Router) => {
    router.post('/auth', register);
};