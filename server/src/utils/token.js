import jwt from 'jsonwebtoken';
const token = {
    generate_access_token(id) {
        return jwt.sign({ id }, process.env.JWT_ACCESS_KEY, { expiresIn: '3d' });
    },

    generate_refresh_token(id) {
        return jwt.sign({ id }, process.env.JWT_REFRESH_KEY, { expiresIn: '365d' });
    },
};

export default token;
