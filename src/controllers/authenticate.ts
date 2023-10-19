import express from 'express';

import { getUsersByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username)
            return res.status(400).send({ error: "Missing requirements" });

        const existingUser = await getUsersByEmail(email);

        if (existingUser)
            return res.sendStatus(400).send({ error: "User already exists!" });

        const salt = random();
        const users = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(users).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}