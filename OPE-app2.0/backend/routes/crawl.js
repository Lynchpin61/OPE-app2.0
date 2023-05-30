const express = require('express');

const axios = require('axios');

const { body } = require('express-validator');

const fs = require('fs');

const crawler = require('../services/crawler');

const router = express.Router();

router.post('/url', (req, res, next) => {
    const url = req.body.url;

    console.log(url);

    const sampledata = [{
    "name": "by S***.",
    "stars": 5,
    "date": "26 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:11.251Z",
    "review": "ang cute. hahaha\nbut it arrives safely, light weight medyo nakakatakot lang ma misplaced sa liit ng mga buds. \nbut the sound is superb. hnd ko pa lang na ttry sa calls.\nbut for its price 190 with voucher and coins ito hehehe sulit na"
    },
    {
    "name": "by Ma J.",
    "stars": 5,
    "date": "24 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:11.251Z",
    "review": "sa itsura, wala akong masabi, ang cute ang ang ganda, super nagustuhan ko... 😍😍\n\nim a bit dissapointed sa tunog nya, kahit full volume na sya, mdjo mahina pa din, siguro ito na ung sagad nya, 🥺\n\nanyways maganda pa din, pede na sa price, super laki ng discount na naluha ko, thank u po 🤩"
    },
    {
    "name": "by Shiela M.",
    "stars": 5,
    "date": "11 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:11.251Z",
    "review": "the item is very cute, but sad to say the sound is a bit low kahit naka full volume na, baka hinds ko Alam paano ang right way ng paglagay sa tainga,, less bass din"
    },
    {
    "name": "by Irene L.",
    "stars": 5,
    "date": "13 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:11.251Z",
    "review": "I got this for 328. if ur using phone music it has nice bass but if you watch videos and other fb youtube videos it doesnt have much bass."
    },
    {
    "name": "by Marlyn C.",
    "stars": 5,
    "date": "2  days ago",
    "dateiso_scraped": "2023-05-29T15:07:11.251Z",
    "review": "good quality and affordable price this is my 7th order in this shop thanks to seller and Lazada and also to delivery boy good luck."
    },
    {
    "name": "by Paul G.",
    "stars": 5,
    "date": "25 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:13.880Z",
    "review": "nice💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜💜"
    },
    {
    "name": "by 9***3",
    "stars": 5,
    "date": "17 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:13.880Z",
    "review": "Super fast delivery! Good packaging! Great quality! Maganda naman yung sound. di ko pa lang alam how long hanggang malowbatt sya."
    },
    {
    "name": "by Precious A.",
    "stars": 5,
    "date": "19 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:13.880Z",
    "review": "its great for its price . it also have a up and down volume you can udjust in the earphone . alsofast shipping"
    },
    {
    "name": "by M***.",
    "stars": 5,
    "date": "2  weeks ago",
    "dateiso_scraped": "2023-05-29T15:07:13.880Z",
    "review": "maganda ang pagpapack at mabilis ang pagdating. tlaganga orig. sobrang ganda pwdeng pang gift"
    },
    {
    "name": "by L***.",
    "stars": 5,
    "date": "8  hours ago",
    "dateiso_scraped": "2023-05-29T15:07:13.880Z",
    "review": "Fast delivery, received on the next day. Maganda at legit na brand. Matagal sya gamitin dahil mahaba ang battery life unlike ung mga una ko binili na wireless headset na madaling malow bat at masira pag nabagsakan. I'm so happy with this product. Thank you 😊👍"
    },
    {
    "name": "by M***.",
    "stars": 5,
    "date": "09 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:16.495Z",
    "review": "Ang ganda and super worth it ❤️🥰 Thank you! I just only paid less kasi sale at the same time may mga cashback and shop vouchers. Thank you so much!"
    },
    {
    "name": "by Jhenn-jenn S.",
    "stars": 5,
    "date": "04 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:16.495Z",
    "review": "maayos at walang damage yung earpods upon delivery. saktong lakas lang tunog, malinaw pag calls or video call."
    },
    {
    "name": "by M***.",
    "stars": 5,
    "date": "08 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:16.495Z",
    "review": "cute nice and good sound quality. well packed, fast delivery, delivered even if Holiday Will order again."
    },
    {
    "name": "by Jenny R.",
    "stars": 5,
    "date": "06 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:16.495Z",
    "review": "It's working great. I love the beige color.\nTge sound is very nice\nI'll update this feedback after a week for the battery performance."
    },
    {
    "name": "by J***.",
    "stars": 5,
    "date": "04 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:16.495Z",
    "review": "Maayos naman yung item nung dumating maganda ang tunog at gumagana sya kahit nayupi yung box nya sana next time doble na lang yung bubble wrap kasi international pa e, mas okay kung safe yung item. Pero good condition naman yung earbuds at ang ganda nya. nagamit ko na sya sa pang online class at music pero ang tagal nya malowbat. thank you seller for nice product. hindi ko na masend video mabagal yung data ko."
    },
    {
    "name": "by c***.",
    "stars": 5,
    "date": "28 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:19.142Z",
    "review": "It was nice. Very handy and sound is okay and the battery lasts for how many days."
    },
    {
    "name": "by Shirley M.",
    "stars": 5,
    "date": "26 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:19.142Z",
    "review": "ang ganda ganda"
    },
    {
    "name": "by R***.",
    "stars": 5,
    "date": "10 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:19.142Z",
    "review": "super cuteeee 💕\nI love everything about it .."
    },
    {
    "name": "by M***.",
    "stars": 5,
    "date": "25 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:19.142Z",
    "review": "sobrang ganda Ng tunog nya. naka dalawa na Nga ko . bibili pa nang Isa kase nagkakainggitan.  slamat"
    },
    {
    "name": "by J***.",
    "stars": 5,
    "date": "25 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:19.142Z",
    "review": "QUALITY yung item ..maganda yung tunog dumihin lang . di ko alam kung san galing yung dumi"
    },
    {
    "name": "by M***.",
    "stars": 5,
    "date": "29 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:21.785Z",
    "review": "sobrang ganda nito mahigit 10 x na ko nabili kase binebenta ko Rin .Wala man Lng Ako freebies.  🤦🏼‍♀️"
    },
    {
    "name": "by Nice Z.",
    "stars": 5,
    "date": "27 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:21.785Z",
    "review": "What you see is what you get. Na gustohan nang partner ko di na daw maingay pag gabi at iwas istorbo sa mga chikiting. Ganda din nang tunog."
    },
    {
    "name": "by Marianne O.",
    "stars": 5,
    "date": "25 Apr 2023",
    "dateiso_scraped": "2023-05-29T15:07:21.785Z",
    "review": "Works well medyo mahina lang volume kailangan i max talaga.. matagal naman ang battery capacity..  problema lang is after nagamit and naka off na yung light sa case, onting galaw lang is umiilaw ulit"
    }];

    const sentences = sampledata.map(review => review.review);
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