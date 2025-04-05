import { getAuth } from '@clerk/express';

export const userAuth = (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
        }

        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired session.' });
    }
};
