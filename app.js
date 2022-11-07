const express = require('express');// Include ExpressJS
const { S3Client } = require
const aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3-v2");
const fs = require('file-system');
const ObjectId = require('mongodb').ObjectId;

const { mongoClient, MongoClient } = require('mongodb')
const mongoose = require('mongoose');


var http = require('http');
var path = require("path");

var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
const { truncate } = require('fs');
var router = express.Router();
const app = express(); // Create an ExpressJS app
// const nodemon = require('Nodemon'); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware
const axios = require('axios');
const cheerio = require('cheerio')
// app.use(bodyParser.urlencoded({ extended: false }));
var path =require('path')
// var server = http.createServer(app);


///////////////////////////////////////////////

let port=process.env.PORT||7000

app.use(express.static(__dirname + '/public'));

app.get('/index.html', function(req, res, next) {
    res.sendFile(path.join(__dirname + 'public/index.html'));
});

























const s3 = new aws.S3({
  accessKeyId: "AKIAVBYTAVV7RFPLPENC",
  secretAccessKey: "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",
  region: "us-west-2"
})

//const upload = multer({
const uploadS3 = () =>
  multer({
    storage: multerS3({
      s3,
      //acl: 'public-read',
      bucket: 'profile-picture-upload-youtube1',

      key: function (req, file, cb) {
        //key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    })
  })


// const uri = 'mongodb+srv://OlukayodeUser:Kayode4371@cluster0.1ejsr.mongodb.net/olukayode_sage?retryWrites=true&w=majority'
// const client = new MongoClient(uri);
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/new_login_index.html'));
// });


app.use(helmet());

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/form.html'));
// });






//view
app.post('/view', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    const findResult3 = await kaydata.find({}).toArray();
    console.log('Found documents =>', findResult);

    //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inserted.
    console.log("Entry displayed successfully");
  } finally {
    await client.close();
  }
});

app.get('/getdata', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');


    const findResult4 = await kaydata.find().toArray()
    //const findResult4 = await kaydata.find()
    res.send(findResult4);
    //res.send();
    // const ans=(JSON.parse(findResult4));
    // res.send( findResult4)
    //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inser
    console.log("Entry displayed successfully");
  } finally {
    await client.close();
  }
});


app.post('/add_category', async function (req, res) {

  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    const insertabout_course2 = await kaydata.insertOne({
      "Course Category": req.body.course_categories,

    });
  } finally {
    await client.close();
  }

});


app.post('/delete_category', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    // //Remove a document
    // //Remove the document where the field a is equal to 3.
    // const deleteResult = await kaydata.deleteMany({ a: 3 });
    // const deleteResult = await kaydata.deleteMany({ 
    // const deleteResult = await kaydata.deleteOne({  
    const deleteResult = await kaydata.deleteOne({
      _id: "all is well"

    });
    console.log('Deleted documents =>', deleteResult);
    console.log("New employee has been deleted");
    res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

  } finally {
    await client.close();
  }
})

//  

app.post('/add_item', async function (req, res) {

  // app.post('/add_item', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
  // console.log("second",req.file.location)
  // const id=req.body.course_categories+" * "+req.body.item_number;
  const id = req.body.course_categories + " " + req.body.item_number;
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    const insertabout_course2 = await kaydata.insertOne({
      // _id,"Item_Number":_id+" * "+req.body.item_number+ " * "+_id,
    });


  } finally {
    await client.close();
  }
})
app.post('/delete_item', async (req, res) => {
  // app.post('/delete_item', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
  // console.log("second",req.file.location)
  // const id=req.body.course_categories+" * "+req.body.item_number;
  // const _id=" "+ id;   
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    const insertabout_course2 = await kaydata.deleteOne({
      //_id,"Item_Number":_id+" * "+req.body.item_number+ " * "+_id,
      _id, "Item_Number": _id + " * " + req.body.item_number + " * " + _id,
    });

    //res.json()
    // console.log(insertabout_course2)

  } finally {
    await client.close();
  }
})


app.post('/add_course_title', async function (req, res) {
  const id = req.body.course_categories + "_" + req.body.item_number;
  const _id = id + " _ " + "course_title";
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    const add_course_title = await kaydata.insertOne({
      _id, 'course_title':_id+"_"+req.body.course_title

    })
  } finally {
    await client.close();
  }
})


app.post('/delete_course_title', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    // //Remove a document
    // //Remove the document where the field a is equal to 3.
    // const deleteResult = await kaydata.deleteMany({ a: 3 });
    // const deleteResult = await kaydata.deleteMany({ 
    // const deleteResult = await kaydata.deleteOne({  
    const deleteResult = await kaydata.deleteOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      _id, [course_title]: _id + " * " + req.body.course_title + " * " + _id,
    });

  } finally {
    await client.close();
  }
})

app.post('/add_course_price', async function (req, res) {
  const id = req.body.course_categories + "_" + req.body.item_number;
  const _id = "_" + id + "_" + "course_price";
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    //  const _id=" "+id+" * "+"course_price";

    // //Remove a document
    // //Remove the document where the field a is equal to 3.
    // const deleteResult = await kaydata.deleteMany({ a: 3 });

    const add_course_price = await kaydata.insertOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      _id, 'course_price_naira':_id+"_"+req.body.course_price_naira,
      _id, 'course_price_dollar':_id+"_"+req.body.course_price_dollar,
    });
    // console.log('Deleted documents =>', add_course_price);
    //     console.log("New employee has been deleted");
    //     res.send("New employee has been added into the database with ID");

  } finally {
    await client.close();
  }
})


app.post('/remove_course_price', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    const remove_course_price = await kaydata.deleteOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      'course_price': +req.body.course_price
    });

  } finally {
    await client.close();
  }
})


app.post('/add_about_course', async function (req, res) {
  const id = req.body.course_categories + "_" + req.body.item_number;
  const _id = "_" + id + "_" + "about_course";
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    //  const _id=" "+id+" * "+"about_course";

    const add_about_course = await kaydata.insertOne({
      _id, 'add_about_course':_id+"_"+req.body.about_this_course,

    });

  } finally {
    await client.close();
  }
})


app.post('/remove_about_course', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');


    const remove_about_course = await kaydata.deleteOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      _id, 'add_about_course': _id + " * " + req.body.about_this_course + " * " + _id,
    });
    console.log('Deleted documents =>', deleteResult);
    console.log("New employee has been deleted");
    res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

  } finally {
    await client.close();
  }
})

app.post('/add_facilitator_name', async function (req, res) {
  const id = req.body.course_categories + "_" + req.body.item_number;
  const _id = "_" + id + " _ " + "facilitator_name";
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    //  const _id=" "+id+" * "+"facilitator_name";


    const add_facilitator_name = await kaydata.insertOne({
      _id, 'facilitator_name':_id+"_"+req.body.facilitator_name,
      // _id,'facilitator_name':_id+" * "+req.body.facilitator_name+ " * "+_id, 
    });

  } finally {
    await client.close();
  }
})


app.post('/remove_facilitator_name', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');


    const remove_about_course = await kaydata.deleteOne({
      // //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      // _id,'add_about_course':_id+" * "+req.body.about_this_course+ " * "+_id, 
    });


  } finally {
    await client.close();
  }
})


app.post('/add_about_Course_Facilitator', async function (req, res) {
  const id = req.body.course_categories + "_" + req.body.item_number;
  const _id = "_" + id + "_" + about_Course_Facilitator;
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    //  const _id=" "+id+" * "+about_Course_Facilitator;

    const add_about_Course_Facilitator = await kaydata.insertOne({

      _id, 'about_Course_Facilitator':_id+"_"+req.body.about_course_facilitator,
    });

  } finally {
    await client.close();
  }
})

app.post('/remove_about_Course_Facilitator', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    const remove_about_course = await kaydata.deleteOne({
      // //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      // _id,'add_about_course':_id+" * "+req.body.about_this_course+ " * "+_id, 
    });

  } finally {
    await client.close();
  }
})



app.post('/facilitators_image_upload', uploadS3("profile-picture-upload-youtube1").single('facilitators_image3'), async (req, res) => {
  console.log(req.file.location)
  //app.post('/upload_course_image', async function (req,res){
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    const id = req.body.course_categories + "_" + req.body.item_number;
    const _id = "_" + id + "_" + "facilitators_image";

    const facilitators_image_upload = await kaydata.insertOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      // _id,'facilitators_image_upload':req.file.location,
      _id, 'facilitators_image_upload':_id+"_"+req.file.location,
    });


  } finally {
    await client.close();
  }
})

app.post('/remove_facilitator_Image', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    const remove_course_image = await kaydata.deleteOne({
    });

  } finally {
    await client.close();
  }
})


app.post('/upload_course_image', uploadS3("profile-picture-upload-youtube1").single('course_image1'), async (req, res) => {
  console.log(req.file.location)
  //app.post('/upload_course_image', async function (req,res){
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    const id = req.body.course_categories + "_" + req.body.item_number;
    const _id = "_" + id + "_" + "course_image";

    const add_course_price = await kaydata.insertOne({
      //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
      'course_image':_id+"_"+ req.file.location,
    });


  } finally {
    await client.close();
  }
})

app.post('/remove_course_image', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage2');
    const kaydata = database.collection('olukayode_collection');
    const remove_course_image = await kaydata.deleteOne({

    });

  } finally {
    await client.close();
  }
})



//   app.post('/facilitators_image_upload', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
//     console.log("second",req.file.location)
//     const id=req.body.course_categories+" * "+req.body.item_number;
//     const _id=" "+ id;   
//     try {
//         await client.connect();
//        const database = client.db('olukayode_sage');
//        const kaydata = database.collection('olukayode_collection');
//        const insertabout_course2= await kaydata.insertOne({
//         _id,"course_image":_id+" * "+req.file.location+ " * "+_id,

//     }); 

//     //res.json()
//     // console.log(insertabout_course2)

//     } finally {
//         await client.close();
//       }
//     })



// app.get('/photos', (req, res) => {
//   client.connect(err => {
//     const collection = client.db("olukayode_sage").collection("olukayode_collection").find().toArray((err, result) => {
//       const imgArray = result.map(element => element._id);
//       console.log(imgArray);
//       if (err) return console.log(err)
//       res.send(imgArray)
//       console.log("Image returned");
//     })
//     console.log("Check Image");
//   })
// })


// app.get('/photo/:id', (req, res) => {

//   db.collection('olukayode_collection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
//     if (err) return console.log(err)
//     res.contentType('image/jpeg');
//     res.send(result.image.buffer)
//   })

// })

app.get('/register', function (req, res) {
  res.render('register')
});

app.get('/uploadtest.html', function (req, res) {
  res.render('uploadtest.html')
});


app.get('/login', function (req, res) {
  res.render('login')
});

app.get('/dashboard', function (req, res) {
  res.render('dashboard')
});


const detail = "field"


//1 correct//////////////////////////////////////////
app.get('/DataMongo', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');

    //Find All Documents
    //Add a query that returns all the documents.
    //const findResult = await kaydata.find({}).toArray();
    const getMongoData = await kaydata.find({}).toArray();
    console.log('Found documents =>', getMongoData);
    //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inserted.
    console.log("Entry displayed successfully");
  } finally {
    await client.close();
  }
});


///////////////////////////////////////////////////////////////
//search yet to be added
app.post('/search', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('olukayode_collection');
    // //Find Documents with a Query Filter
    // //Add a query filter to find only documents which meet the query criteria.

    const filteredDocs = await kaydata.find({ a: 3 }).toArray();
    console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
    //Only the documents which match 'a' : 3 should be returned.
  } finally {
    await client.close();
  }
});

//Update
app.post('/update', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage2');
    const kaydata = database.collection('olukayode_collection');
    // //Update a document
    // //The following operation updates a document in the documents collection.

    const updateResult = await kaydata.updateOne({ Godisgood: 3 }, { $set: { iamgreat: 1 } });
    console.log('Updated documents =>', updateResult);

    res.send("Entry updated successfully");
    console.log("Entry updated successfully");
  } finally {
    await client.close();
  }
});


//delete backup
//     app.post('/delete', async function (req,res){
//       try {
//         await client.connect();
//        const database = client.db('olukayode_sage2');
//        const kaydata = database.collection('olukayode_collection');

// // //Remove a document
// // //Remove the document where the field a is equal to 3.
// // const deleteResult = await kaydata.deleteMany({ a: 3 });
//       const deleteResult = await kaydata.deleteMany({Jesus: req.body.id});
//       console.log('Deleted documents =>', deleteResult);
//           console.log("New employee has been deleted");
//           res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);

//       } finally {      
//         await client.close();
//       }
//     })

app.post('/delete_category', async function (req, res) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage2');
    const kaydata = database.collection('olukayode_collection');

    // //Remove a document
    // //Remove the document where the field a is equal to 3.
    // const deleteResult = await kaydata.deleteMany({ a: 3 });
    const deleteResult = await kaydata.deleteMany({
      //    "item1": req.body.id,
      //    "item2":req.body.id,
      //    "item1":req.body.id,
      //    "item1": req.body.id,
      //    "item1":req.body.id,
      //    "item1": req.body.id,
      //    "item1":req.body.id
      //    _id:req.body.course_categories+"  "+req.body.item_number,
      "about_this_course": req.body.about_this_course + "  " + req.body.course_categories + "  " + req.body.item_number,
      "course_title": req.body.course_title + "  " + req.body.course_categories + "  " + req.body.item_number,
      "course_amount": req.body.amount + "  " + req.body.course_categories + "  " + req.body.item_number,
      "facilitators_name": req.body.facilitator_name + "  " + req.body.course_categories + "  " + req.body.item_number,
      "about_facilitators": req.body.about_course_facilitator + "  " + req.body.course_categories + "  " + req.body.item_number,
      "course_image": req.body.course_image + "  " + req.body.course_categories + "  " + req.body.item_number,
      //"facilitator_image":req.body.course_image+ "  "+req.body.course_categories+"  "+req.body.item_number,
      //   "facilitator_image":req.file.location,


      // const _id=req.body.course_categories+" * "+req.body.item_number

      _id, "about_this_course": req.body.about_this_course + " * " + _id,
      _id, "course_title": req.body.course_title + " * " + _id,
      _id, "course_amount": req.body.amount + " * " + _id,
      _id, "facilitators_name": req.body.facilitator_name + " * " + _id,
      _id, "about_facilitators": req.body.about_course_facilitator + " * " + _id,
      _id, "course_image": req.body.course_image + " * " + _id,


    });
    console.log('Deleted documents =>', deleteResult);
    console.log("New employee has been deleted");
    res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

  } finally {
    await client.close();
  }
})


// Closing the database connection.
app.get('/close', function (req, res) {
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });



//////////////////////////////////////////////////////////////
// app.use(express.static(path.join(__dirname, 'public')));
// const url = 'https://www.theguardian.com/uk'
const url = 'https://twitter.com/pfizer_news?lang=en'


// var app = express()

// Route to Homepage
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/static/index.html');
  res.sendFile(__dirname + '/static/new_login.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/new_login.html');
});

app.get('/results', (req, res) => {
  // axios('https://twitter.com/pfizer_news?lang=en')
  axios(url)
      .then(response => {
          const html = response.data
          const $ = cheerio.load(html)
          const articles = []

          $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
              const title = $(this).text()
              const url = $(this).find('a').attr('href')
              articles.push({
                  title,
                  url
              })
          })
          // res.json(articles)
          res.json(articles)
      }).catch(err => console.log(err))

    });
  
app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

//const port = 3000 // Port we will listen on

// Function to listen on the port
//app.listen(port, () => console.log(`This app is listening on port ${port}`));

//////////////////////////////////////////////////////////
  });



// server.listen(3000, function () {
//   console.log("server is listening on port 3000");
////////////////////////////////////////////////////////////
app.listen(port, () => {
	console.log("Server is Running in port 7000")
});
///////////////////////////test2222222222222






// const express = require('express');// Include ExpressJS



// const { S3Client } = require
// const aws = require("aws-sdk");
// var multer = require("multer");
// var multerS3 = require("multer-s3-v2");
// const fs = require('file-system');
// const ObjectId = require('mongodb').ObjectId;

// const { mongoClient, MongoClient } = require('mongodb')
// const mongoose = require('mongoose');


// var http = require('http');
// var path = require("path");

// var helmet = require('helmet');
// var rateLimit = require("express-rate-limit");
// const { truncate } = require('fs');
// var router = express.Router();
// const app = express(); // Create an ExpressJS app
// const nodemon = require('Nodemon'); // Create an ExpressJS app
// const bodyParser = require('body-parser'); // Middleware
// const axios = require('axios');
// const cheerio = require('cheerio')
// // app.use(bodyParser.urlencoded({ extended: false }));
// var path =require('path')
// var server = http.createServer(app);

// const s3 = new aws.S3({
//   accessKeyId: "AKIAVBYTAVV7RFPLPENC",
//   secretAccessKey: "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",
//   region: "us-west-2"
// })

// //const upload = multer({
// const uploadS3 = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       //acl: 'public-read',
//       bucket: 'profile-picture-upload-youtube1',

//       key: function (req, file, cb) {
//         //key: (req, file, cb) => {
//         cb(null, Date.now().toString() + '-' + file.originalname);
//       },
//     })
//   })

// /////////////////////////////////////////////////////////////////////
// const uri = 'mongodb+srv://OlukayodeUser:Kayode4371@cluster0.1ejsr.mongodb.net/olukayode_sage?retryWrites=true&w=majority'
// const client = new MongoClient(uri);
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static(path.join(__dirname, './public')));
// app.use(helmet());

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/new_login.html'));
// });

// //view
// app.post('/view', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     //Find All Documents
//     //Add a query that returns all the documents.
//     //const findResult = await kaydata.find({}).toArray();


//     const findResult3 = await kaydata.find({}).toArray();
//     console.log('Found documents =>', findResult);

//     //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inserted.
//     console.log("Entry displayed successfully");
//   } finally {
//     await client.close();
//   }
// });

// app.get('/getdata', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');


//     const findResult4 = await kaydata.find().toArray()
//     //const findResult4 = await kaydata.find()
//     res.send(findResult4);
//     //res.send();
//     // const ans=(JSON.parse(findResult4));
//     // res.send( findResult4)
//     //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inser
//     console.log("Entry displayed successfully");
//   } finally {
//     await client.close();
//   }
// });


// app.post('/add_category', async function (req, res) {

//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     const insertabout_course2 = await kaydata.insertOne({
//       "Course Category": req.body.course_categories,

//     });
//   } finally {
//     await client.close();
//   }

// });


// app.post('/delete_category', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     // //Remove a document
//     // //Remove the document where the field a is equal to 3.
//     // const deleteResult = await kaydata.deleteMany({ a: 3 });
//     // const deleteResult = await kaydata.deleteMany({ 
//     // const deleteResult = await kaydata.deleteOne({  
//     const deleteResult = await kaydata.deleteOne({
//       _id: "all is well"

//     });
//     console.log('Deleted documents =>', deleteResult);
//     console.log("New employee has been deleted");
//     res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

//   } finally {
//     await client.close();
//   }
// })

// //  

// app.post('/add_item', async function (req, res) {

//   // app.post('/add_item', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
//   // console.log("second",req.file.location)
//   // const id=req.body.course_categories+" * "+req.body.item_number;
//   const id = req.body.course_categories + " " + req.body.item_number;
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     const insertabout_course2 = await kaydata.insertOne({
//       // _id,"Item_Number":_id+" * "+req.body.item_number+ " * "+_id,
//     });


//   } finally {
//     await client.close();
//   }
// })
// app.post('/delete_item', async (req, res) => {
//   // app.post('/delete_item', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
//   // console.log("second",req.file.location)
//   // const id=req.body.course_categories+" * "+req.body.item_number;
//   // const _id=" "+ id;   
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     const insertabout_course2 = await kaydata.deleteOne({
//       //_id,"Item_Number":_id+" * "+req.body.item_number+ " * "+_id,
//       _id, "Item_Number": _id + " * " + req.body.item_number + " * " + _id,
//     });

//     //res.json()
//     // console.log(insertabout_course2)

//   } finally {
//     await client.close();
//   }
// })


// app.post('/add_course_title', async function (req, res) {
//   const id = req.body.course_categories + "_" + req.body.item_number;
//   const _id = id + " _ " + "course_title";
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     const add_course_title = await kaydata.insertOne({
//       _id, 'course_title':_id+"_"+req.body.course_title

//     })
//   } finally {
//     await client.close();
//   }
// })


// app.post('/delete_course_title', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     // //Remove a document
//     // //Remove the document where the field a is equal to 3.
//     // const deleteResult = await kaydata.deleteMany({ a: 3 });
//     // const deleteResult = await kaydata.deleteMany({ 
//     // const deleteResult = await kaydata.deleteOne({  
//     const deleteResult = await kaydata.deleteOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       _id, [course_title]: _id + " * " + req.body.course_title + " * " + _id,
//     });

//   } finally {
//     await client.close();
//   }
// })

// app.post('/add_course_price', async function (req, res) {
//   const id = req.body.course_categories + "_" + req.body.item_number;
//   const _id = "_" + id + "_" + "course_price";
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     //  const _id=" "+id+" * "+"course_price";

//     // //Remove a document
//     // //Remove the document where the field a is equal to 3.
//     // const deleteResult = await kaydata.deleteMany({ a: 3 });

//     const add_course_price = await kaydata.insertOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       _id, 'course_price_naira':_id+"_"+req.body.course_price_naira,
//       _id, 'course_price_dollar':_id+"_"+req.body.course_price_dollar,
//     });
//     // console.log('Deleted documents =>', add_course_price);
//     //     console.log("New employee has been deleted");
//     //     res.send("New employee has been added into the database with ID");

//   } finally {
//     await client.close();
//   }
// })


// app.post('/remove_course_price', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     const remove_course_price = await kaydata.deleteOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       'course_price': +req.body.course_price
//     });

//   } finally {
//     await client.close();
//   }
// })


// app.post('/add_about_course', async function (req, res) {
//   const id = req.body.course_categories + "_" + req.body.item_number;
//   const _id = "_" + id + "_" + "about_course";
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     //  const _id=" "+id+" * "+"about_course";

//     const add_about_course = await kaydata.insertOne({
//       _id, 'add_about_course':_id+"_"+req.body.about_this_course,

//     });

//   } finally {
//     await client.close();
//   }
// })


// app.post('/remove_about_course', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');


//     const remove_about_course = await kaydata.deleteOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       _id, 'add_about_course': _id + " * " + req.body.about_this_course + " * " + _id,
//     });
//     console.log('Deleted documents =>', deleteResult);
//     console.log("New employee has been deleted");
//     res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

//   } finally {
//     await client.close();
//   }
// })

// app.post('/add_facilitator_name', async function (req, res) {
//   const id = req.body.course_categories + "_" + req.body.item_number;
//   const _id = "_" + id + " _ " + "facilitator_name";
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     //  const _id=" "+id+" * "+"facilitator_name";


//     const add_facilitator_name = await kaydata.insertOne({
//       _id, 'facilitator_name':_id+"_"+req.body.facilitator_name,
//       // _id,'facilitator_name':_id+" * "+req.body.facilitator_name+ " * "+_id, 
//     });

//   } finally {
//     await client.close();
//   }
// })


// app.post('/remove_facilitator_name', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');


//     const remove_about_course = await kaydata.deleteOne({
//       // //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       // _id,'add_about_course':_id+" * "+req.body.about_this_course+ " * "+_id, 
//     });


//   } finally {
//     await client.close();
//   }
// })


// app.post('/add_about_Course_Facilitator', async function (req, res) {
//   const id = req.body.course_categories + "_" + req.body.item_number;
//   const _id = "_" + id + "_" + about_Course_Facilitator;
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     //  const _id=" "+id+" * "+about_Course_Facilitator;

//     const add_about_Course_Facilitator = await kaydata.insertOne({

//       _id, 'about_Course_Facilitator':_id+"_"+req.body.about_course_facilitator,
//     });

//   } finally {
//     await client.close();
//   }
// })

// app.post('/remove_about_Course_Facilitator', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     const remove_about_course = await kaydata.deleteOne({
//       // //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       // _id,'add_about_course':_id+" * "+req.body.about_this_course+ " * "+_id, 
//     });

//   } finally {
//     await client.close();
//   }
// })



// app.post('/facilitators_image_upload', uploadS3("profile-picture-upload-youtube1").single('facilitators_image3'), async (req, res) => {
//   console.log(req.file.location)
//   //app.post('/upload_course_image', async function (req,res){
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     const id = req.body.course_categories + "_" + req.body.item_number;
//     const _id = "_" + id + "_" + "facilitators_image";

//     const facilitators_image_upload = await kaydata.insertOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       // _id,'facilitators_image_upload':req.file.location,
//       _id, 'facilitators_image_upload':_id+"_"+req.file.location,
//     });


//   } finally {
//     await client.close();
//   }
// })

// app.post('/remove_facilitator_Image', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     const remove_course_image = await kaydata.deleteOne({
//     });

//   } finally {
//     await client.close();
//   }
// })


// app.post('/upload_course_image', uploadS3("profile-picture-upload-youtube1").single('course_image1'), async (req, res) => {
//   console.log(req.file.location)
//   //app.post('/upload_course_image', async function (req,res){
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     const id = req.body.course_categories + "_" + req.body.item_number;
//     const _id = "_" + id + "_" + "course_image";

//     const add_course_price = await kaydata.insertOne({
//       //_id,"course_title":_id+" * "+req.body.course_title+ " * "+_id,    
//       'course_image':_id+"_"+ req.file.location,
//     });


//   } finally {
//     await client.close();
//   }
// })

// app.post('/remove_course_image', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage2');
//     const kaydata = database.collection('olukayode_collection');
//     const remove_course_image = await kaydata.deleteOne({

//     });

//   } finally {
//     await client.close();
//   }
// })



// //   app.post('/facilitators_image_upload', uploadS3("profile-picture-upload-youtube1").single('facilitatorsImage1'), async (req, res) => {
// //     console.log("second",req.file.location)
// //     const id=req.body.course_categories+" * "+req.body.item_number;
// //     const _id=" "+ id;   
// //     try {
// //         await client.connect();
// //        const database = client.db('olukayode_sage');
// //        const kaydata = database.collection('olukayode_collection');
// //        const insertabout_course2= await kaydata.insertOne({
// //         _id,"course_image":_id+" * "+req.file.location+ " * "+_id,

// //     }); 

// //     //res.json()
// //     // console.log(insertabout_course2)

// //     } finally {
// //         await client.close();
// //       }
// //     })



// // app.get('/photos', (req, res) => {
// //   client.connect(err => {
// //     const collection = client.db("olukayode_sage").collection("olukayode_collection").find().toArray((err, result) => {
// //       const imgArray = result.map(element => element._id);
// //       console.log(imgArray);
// //       if (err) return console.log(err)
// //       res.send(imgArray)
// //       console.log("Image returned");
// //     })
// //     console.log("Check Image");
// //   })
// // })


// // app.get('/photo/:id', (req, res) => {

// //   db.collection('olukayode_collection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
// //     if (err) return console.log(err)
// //     res.contentType('image/jpeg');
// //     res.send(result.image.buffer)
// //   })

// // })

// app.get('/register', function (req, res) {
//   res.render('register')
// });

// app.get('/uploadtest.html', function (req, res) {
//   res.render('uploadtest.html')
// });


// app.get('/login', function (req, res) {
//   res.render('login')
// });

// app.get('/dashboard', function (req, res) {
//   res.render('dashboard')
// });


// const detail = "field"


// //1 correct//////////////////////////////////////////
// app.get('/DataMongo', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     //Find All Documents
//     //Add a query that returns all the documents.
//     //const findResult = await kaydata.find({}).toArray();
//     const getMongoData = await kaydata.find({}).toArray();
//     console.log('Found documents =>', getMongoData);
//     //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inserted.
//     console.log("Entry displayed successfully");
//   } finally {
//     await client.close();
//   }
// });


// ///////////////////////////////////////////////////////////////
// //search yet to be added
// app.post('/search', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');
//     // //Find Documents with a Query Filter
//     // //Add a query filter to find only documents which meet the query criteria.

//     const filteredDocs = await kaydata.find({ a: 3 }).toArray();
//     console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
//     //Only the documents which match 'a' : 3 should be returned.
//   } finally {
//     await client.close();
//   }
// });

// //Update
// app.post('/update', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage2');
//     const kaydata = database.collection('olukayode_collection');
//     // //Update a document
//     // //The following operation updates a document in the documents collection.

//     const updateResult = await kaydata.updateOne({ Godisgood: 3 }, { $set: { iamgreat: 1 } });
//     console.log('Updated documents =>', updateResult);

//     res.send("Entry updated successfully");
//     console.log("Entry updated successfully");
//   } finally {
//     await client.close();
//   }
// });


// //delete backup
// //     app.post('/delete', async function (req,res){
// //       try {
// //         await client.connect();
// //        const database = client.db('olukayode_sage2');
// //        const kaydata = database.collection('olukayode_collection');

// // // //Remove a document
// // // //Remove the document where the field a is equal to 3.
// // // const deleteResult = await kaydata.deleteMany({ a: 3 });
// //       const deleteResult = await kaydata.deleteMany({Jesus: req.body.id});
// //       console.log('Deleted documents =>', deleteResult);
// //           console.log("New employee has been deleted");
// //           res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);

// //       } finally {      
// //         await client.close();
// //       }
// //     })

// app.post('/delete_category', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage2');
//     const kaydata = database.collection('olukayode_collection');

//     // //Remove a document
//     // //Remove the document where the field a is equal to 3.
//     // const deleteResult = await kaydata.deleteMany({ a: 3 });
//     const deleteResult = await kaydata.deleteMany({
//       //    "item1": req.body.id,
//       //    "item2":req.body.id,
//       //    "item1":req.body.id,
//       //    "item1": req.body.id,
//       //    "item1":req.body.id,
//       //    "item1": req.body.id,
//       //    "item1":req.body.id
//       //    _id:req.body.course_categories+"  "+req.body.item_number,
//       "about_this_course": req.body.about_this_course + "  " + req.body.course_categories + "  " + req.body.item_number,
//       "course_title": req.body.course_title + "  " + req.body.course_categories + "  " + req.body.item_number,
//       "course_amount": req.body.amount + "  " + req.body.course_categories + "  " + req.body.item_number,
//       "facilitators_name": req.body.facilitator_name + "  " + req.body.course_categories + "  " + req.body.item_number,
//       "about_facilitators": req.body.about_course_facilitator + "  " + req.body.course_categories + "  " + req.body.item_number,
//       "course_image": req.body.course_image + "  " + req.body.course_categories + "  " + req.body.item_number,
//       //"facilitator_image":req.body.course_image+ "  "+req.body.course_categories+"  "+req.body.item_number,
//       //   "facilitator_image":req.file.location,


//       // const _id=req.body.course_categories+" * "+req.body.item_number

//       _id, "about_this_course": req.body.about_this_course + " * " + _id,
//       _id, "course_title": req.body.course_title + " * " + _id,
//       _id, "course_amount": req.body.amount + " * " + _id,
//       _id, "facilitators_name": req.body.facilitator_name + " * " + _id,
//       _id, "about_facilitators": req.body.about_course_facilitator + " * " + _id,
//       _id, "course_image": req.body.course_image + " * " + _id,


//     });
//     console.log('Deleted documents =>', deleteResult);
//     console.log("New employee has been deleted");
//     res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

//   } finally {
//     await client.close();
//   }
// })


// // Closing the database connection.
// app.get('/close', function (req, res) {
//   db.close((err) => {
//     if (err) {
//       res.send('There is some error in closing the database');
//       return console.error(err.message);
//     }
//     console.log('Closing the database connection.');
//     res.send('Database connection successfully closed');
//   });



// //////////////////////////////////////////////////////////////
// // app.use(express.static(path.join(__dirname, 'public')));
// // const url = 'https://www.theguardian.com/uk'
// const url = 'https://twitter.com/pfizer_news?lang=en'


// // var app = express()

// // Route to Homepage
// app.get('/', (req, res) => {
//   // res.sendFile(__dirname + '/static/index.html');
//   res.sendFile(__dirname + '/static/new_login.html');
// });

// // Route to Login Page
// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/static/new_login.html');
// });

// app.get('/results', (req, res) => {
//   // axios('https://twitter.com/pfizer_news?lang=en')
//   axios(url)
//       .then(response => {
//           const html = response.data
//           const $ = cheerio.load(html)
//           const articles = []

//           $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
//               const title = $(this).text()
//               const url = $(this).find('a').attr('href')
//               articles.push({
//                   title,
//                   url
//               })
//           })
//           // res.json(articles)
//           res.json(articles)
//       }).catch(err => console.log(err))

//     });
  
// app.post('/login', (req, res) => {
//   // Insert Login Code Here
//   let username = req.body.username;
//   let password = req.body.password;
//   res.send(`Username: ${username} Password: ${password}`);
// });

// //const port = 3000 // Port we will listen on

// // Function to listen on the port
// //app.listen(port, () => console.log(`This app is listening on port ${port}`));

// ////////////////////////////////////////////////////////////
//   //});

// });

// server.listen(3000, function () {
//   console.log("server is listening on port 3000");

// });
// ///////////////////////////test2222222222222
