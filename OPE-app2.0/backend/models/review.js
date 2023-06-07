const db = require('../util/database');

module.exports = class Review {

    constructor(name, stars, date_reviewed, dateiso_scraped, review, product_url) {
        this.name = name;
        this.stars = stars;
        this.date_reviewed = date_reviewed;
        this.dateiso_scraped = dateiso_scraped;
        this.review = review;
        this.product_url = product_url;
    }

    // static find(email){
    //     return db.execute('SELECT * FROM users WHERE email = ?', [email]);  
    // }

    static save(review) {
        return db.execute(
            'INSERT INTO reviews (name, stars, date_reviewed, dateiso_scraped, review, product_url) VALUES (?, ?, STR_TO_DATE(?, \'%d %b %Y\'), STR_TO_DATE(?, \'%Y-%m-%dT%H:%i:%s.%fZ\'), ?, ?)',
            [
                review.name,
                review.stars,
                review.date_reviewed,
                review.dateiso_scraped,
                review.review,
                review.product_url,
            ]
        );
    }

    static async savemany(reviews) {
        const values = reviews.map((review) => {
            return [
                review.name,
                review.stars,
                review.date_reviewed,
                review.dateiso_scraped,
                review.review,
                review.product_url,
            ];
        });

        const query = `
            INSERT INTO reviews 
            (name, stars, date_reviewed, dateiso_scraped, review, product_url) 
            VALUES 
            ${values.map(
                () => '(?, ?, STR_TO_DATE(?, \'%d %b %Y\'), STR_TO_DATE(?, \'%Y-%m-%dT%H:%i:%s.%fZ\'), ?, ?)'
            ).join(', ')}
        `;
    
        const flattenedValues = values.reduce((acc, curr) => acc.concat(curr), []);
    
        return db.execute(query, flattenedValues);
    }

    static find(url) {
        return db.execute('SELECT * FROM reviews WHERE product_url = ?', [url]);
    }


};


// CREATE SCHEMA savedeval;

// CREATE TABLE savedeval.`users` (
// id INT NOT NULL AUTO_INCREMENT,
// name VARCHAR(255) NOT NULL,
// email VARCHAR(255) NOT NULL,
// password VARCHAR(255) NOT NULL,
// PRIMARY KEY (id)
// )



// INSERT
// {
//     "name": "by Ma. L.",
//     "stars": 5,
//     "date_reviewed": "2023-05-01",
//     "dateiso_scraped": "2023-06-06 17:04:20",
//     "review": "ok for the price 👍👍"
// }