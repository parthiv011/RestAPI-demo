import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, select: false, required: true },
        sessionToken: { type: String, select: false },
        salt: { type: String, select: false },
    },
});

export const userModel = mongoose.model('User', userSchema);

export const getUsers = () => userModel.find();
export const getUsersByEmail = (email: string) => userModel.findOne({ email });
export const getUserById = (id: string) => userModel.findById(id);
export const getUserBySession = (sessionToken: string) => userModel.findOne({
    "authentication.sessionToken": sessionToken,
});

export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => userModel.findOneAndDelete({ __id: id });

export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values);