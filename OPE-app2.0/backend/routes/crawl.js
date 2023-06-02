const express = require('express');

const axios = require('axios');

const { body } = require('express-validator');

const fs = require('fs');

const crawler = require('../services/crawler');

const router = express.Router();

router.post('/url', (req, res, next) => {
    const url = req.body.url;

    console.log(url);

    // const sentences = sampledata.map(review => review.review);
    // console.log(sentences);
    // console.log(JSON.stringify({sentences}))

    // const sentence = [
    //     "It works well, but sometimes the unit just turns off while in use for no reason. I make sure the unit is charged so its not that. The sound quality is fair but nothing to get excited about. ",
    //     "The product seems to work as intended and is operating very well but it got a bit glitchy when it was first used but after a couple of minutes it worked pretty much fine after that.",
    //     "the package is ok but the item it self didn't really meet my expectation, there's a glitching sounds I heard while playing a music and I don't know if the earphones were built like this or somethin",
    //     "Works fine. The sound quality is okay. But the battery life is not that good in terms of talk time. At 100%% charge, it always runs out of battery at the end of my hour-long meetings.",
    //     "fast delivery, but the both earphones has different volume, kinda fast to get empty, i love the design, but my biggest problem is when i try to close it ig the magnet is not the strong, overall its fine...",
    //     "I ordered it yesterday and received it today. it got wet from the rain but thankfully it didn't damage the item. the touch activated sensors do not work but maybe it's because I'm using it on an Android",
    //     "It's been 2 weeks since I started using this. Sound is good. Audio is clear. And I was impressed by the durability. Because I have accidentally dropped this 3x already yet until now it still functions really well. And I love that! Thank you!",
    //     "Delivery was so fast, I even thought I was scammed! The box is somwhat lightweight so I thought nothing was in it. even took a video for proof. Haha! But, lo and behold! The item is so beautiful! I delayed the review for a day to test the item and, I was not disappointed! The sound was quite good and crisp considering it's price. I haven't tried it outside yet but, I hope it delivers. Overall, delivery fast. Item, superb (as of now, hopefully, in the long run too!) Will definitely order again next time!",
    //     "The case hinge easily broke so i had to put a tape to serve as a hinge. Sound quality is muffled. The treble is dead. The connection easily interrupted and disconnects / reconnects shortly even when your phone is near you.  For its price, its definitely cheap and so is the quality. The audio prompt is in Chinese.",
    //     "JUNK!!!!! DON'T BUY THIS!!!!!!!  I JUST HAD IT YESTERDAY AND IT'S ALREADY SKIPPING SOUNDS. WASTE OF MY MONEY"
    // ]

    // let options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(
    //         {
    //             "sentences": [
    //             "It works well, but sometimes the unit just turns off while in use for no reason. I make sure the unit is charged so its not that. The sound quality is fair but nothing to get excited about. ",
    //             "The product seems to work as intended and is operating very well but it got a bit glitchy when it was first used but after a couple of minutes it worked pretty much fine after that.",
    //             "the package is ok but the item it self didn't really meet my expectation, there's a glitching sounds I heard while playing a music and I don't know if the earphones were built like this or somethin",
    //             "Works fine. The sound quality is okay. But the battery life is not that good in terms of talk time. At 100%% charge, it always runs out of battery at the end of my hour-long meetings.",
    //             "fast delivery, but the both earphones has different volume, kinda fast to get empty, i love the design, but my biggest problem is when i try to close it ig the magnet is not the strong, overall its fine...",
    //             "I ordered it yesterday and received it today. it got wet from the rain but thankfully it didn't damage the item. the touch activated sensors do not work but maybe it's because I'm using it on an Android",
    //             "It's been 2 weeks since I started using this. Sound is good. Audio is clear. And I was impressed by the durability. Because I have accidentally dropped this 3x already yet until now it still functions really well. And I love that! Thank you!",
    //             "Delivery was so fast, I even thought I was scammed! The box is somwhat lightweight so I thought nothing was in it. even took a video for proof. Haha! But, lo and behold! The item is so beautiful! I delayed the review for a day to test the item and, I was not disappointed! The sound was quite good and crisp considering it's price. I haven't tried it outside yet but, I hope it delivers. Overall, delivery fast. Item, superb (as of now, hopefully, in the long run too!) Will definitely order again next time!",
    //             "The case hinge easily broke so i had to put a tape to serve as a hinge. Sound quality is muffled. The treble is dead. The connection easily interrupted and disconnects / reconnects shortly even when your phone is near you.  For its price, its definitely cheap and so is the quality. The audio prompt is in Chinese.",
    //             "JUNK!!!!! DON'T BUY THIS!!!!!!!  I JUST HAD IT YESTERDAY AND IT'S ALREADY SKIPPING SOUNDS. WASTE OF MY MONEY"
    //             ]
    //         }
    //     )
    // };

    // https://www.lazada.com.ph/products/lenovo-he05-bluetooth-earphone-ipx5-waterproof-sport-headset-magnetic-neckband-wireless-headphone-with-mic-for-android-mobile-phone-i1643144702-s7057188098.html
    // https://www.lazada.sg/products/baseus-h19-wired-earbuds-6d-stereo-bass-earphones-in-ear-35mm-headphone-with-mic-for-xiaomi-samsung-iphone-i1593366182-s7506900798.html
    crawler.scrapeImages(url)
        .then((reviews) => {
            // console.log(reviews);
            console.log('Saving Reviews to json file for reference sample ONLY');
            fs.writeFileSync('reviews.json', JSON.stringify(reviews));
            console.log('Scraping finished!');
            res.status(200).json(reviews);
        })
        .catch((err) => {
            console.log(err);
            // respond error code
            res.status(400).json('Error: ' + err);
        });

    // res.status(201).json({ message: `URL received! ${sentences}` });
    // res.status(201).json({ sentences: sentences });
});

module.exports = router;