const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Review = require('../models/review');

exports.save_review = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const name = req.body.name;
    const product_url = req.body.product_url;
    const stars = req.body.stars;
    const date_reviewed = req.body.date_reviewed;
    const dateiso_scraped = req.body.dateiso_scraped;
    const review = req.body.review;

    try {

        const reviewDetails = {
            name: name,
            product_url: product_url,
            stars: stars,
            date_reviewed: date_reviewed,
            dateiso_scraped: dateiso_scraped,
            review: review
        };

        const result = await Review.save(reviewDetails);

        res.status(201).json({ message: 'Review saved!' });
    }
        catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.save_reviews = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const users = req.body;

    try {
        const reviewDetails = users.map((user) => {
            return {
            name: user.name,
            product_url: user.product_url,
            stars: user.stars,
            date_reviewed: user.date_reviewed,
            dateiso_scraped: user.dateiso_scraped,
            review: user.review
            };
        });

        await Review.savemany(reviewDetails);

        res.status(201).json({ message: 'Reviews saved!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.get_reviews_by_url = async (req, res) => {
    try {
        const { url } = req.query;
        const reviews = await Review.find( url );

        res.status(200).json({
            data: reviews[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reviews',
        });
    }
};



// exports.login = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;

    
//     try{
//         const user = await User.find(email)

//         if(user[0].length !== 1){
//             const error = new Error('A user with this email could not be found.')
//             error.statusCode = 401;
//             throw error;
//         }

//         const storedUser = user[0][0];

//         const isEqual = await bcrypt.compare(password, storedUser.password);

//         if(!isEqual) {
//             const error = new Error('Wrong Password!')
//             error.statusCode = 401;
//             throw error;
//         }

//         const token = jwt.sign(
//             {
//                 email: storedUser.email,
//                 userId: storedUser.id,
//             },
//             'secretfortoken',
//             { expiresIn: '1h'}
//         );

//         res.status(200).json({ token : token, userId: storedUser.id});

//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     }

    
// }