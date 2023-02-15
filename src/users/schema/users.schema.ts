import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },

    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt_rounds = +(process.env.SALT_ROUNDS as unknown) as number;
        const hashed = await bcrypt.hash(this['password'], salt_rounds);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});