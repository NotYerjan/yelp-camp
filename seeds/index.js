const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000) + 1
        const price = Math.floor(Math.random() * 100) + 50
        const camp = new Campground({
            author: "63b1f1a9fe4073e1209ec912",
            geometry:{
               "type" : "Point",
               "coordinates" : [ cities[random1000].longitude, cities[random1000].latitude ] 
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/yerjan/image/upload/v1650380030/YelpCamp/oasldapm3ldkcjkhbezc.jpg',
                filename: 'YelpCamp/oasldapm3ldkcjkhbezc',
              },
              {
                url: 'https://res.cloudinary.com/yerjan/image/upload/v1650380030/YelpCamp/chhoqtmcpfdexjbkybxq.jpg',
                filename: 'YelpCamp/chhoqtmcpfdexjbkybxq',
              },
              {
                url: 'https://res.cloudinary.com/yerjan/image/upload/v1650380030/YelpCamp/ufmgw5qdwlvfjb4wpfp5.jpg',
                filename: 'YelpCamp/ufmgw5qdwlvfjb4wpfp5',
              }
          ],
            description: 'Vivamus eu arcu ante. Morbi venenatis blandit aliquam. Aliquam velit est, fringilla vel pulvinar quis, egestas sed eros. Suspendisse sit amet elit ex. Morbi ornare arcu id ex volutpat, congue aliquam ligula volutpat. Ut iaculis orci tortor, at sodales nisi consectetur sit amet. Praesent porttitor ligula purus, id tempor augue malesuada et. Suspendisse potenti. Sed erat elit, vehicula vel sem vitae, pretium feugiat erat. Duis vel sagittis ligula, sit amet eleifend ipsum. Nunc ut elementum lacus. Praesent tincidunt dolor sit amet consequat viverra. Phasellus dapibus neque at lorem vestibulum ornare. Morbi pharetra facilisis aliquam. Cras sollicitudin erat eros, vitae elementum purus aliquet at. Etiam et urna ac leo eleifend placerat ac eget ante. ',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    console.log('Database is disconnecting')
    mongoose.connection.close()
});