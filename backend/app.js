require('express-async-errors');
const morgan = require('morgan')

const stripe = require('stripe')('sk_test_51LmMTSGEtDbpNSeiV5SEzavQFyUOlLrIVtuSWh97G3dXJ6ZlIV96F6mev5RSRgFiWW3gBNZeyovXqW6GtIS0XuQk00ieRFhVEJ');
const YOUR_DOMAIN = 'http://localhost:8000';
const endpointSecret = 'whsec_5dd7d8546b290a40c2bb1d8944145aed3ac86d118633fcf780ed2c6601828336';
const bodyParser = require('body-parser');

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

const routes = require('./routes')

// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

app.use(morgan('dev'));

// Express using json - DO NOT MODIFY
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
// app.use(express.json());
app.use(express.static('static'))

const cors = require('cors');
const corsOptions = {
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(routes);

// stripe route
app.post('/create-checkout-session', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  console.log('SVIP REQ BODY')
  console.log(req.body)

  const priceMapper= {
    vip: 'price_1LmaXgGEtDbpNSei4aQaxIf7',
    svip: 'price_1LmPibGEtDbpNSeiSDzd4wJI',
    chests16: 'price_1LmaYYGEtDbpNSeiyaYh0szZ',
    chests32: 'price_1LmaYzGEtDbpNSei7JsVjkaZ',
    chests64: 'price_1LmaZdGEtDbpNSeiIbVORkgp',
    chests128: 'price_1Lmaa2GEtDbpNSeieEpAVp9w',
    chests256: 'price_1LmaaTGEtDbpNSei8PjhF0Y2',
    chests512: 'price_1LmaaqGEtDbpNSei2aGw0xEN',
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: `${priceMapper[req.body.purchaseType]}`,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3006/success/?nick=${req.body.nickname}&type=${req.body.purchaseType}`,
    cancel_url: `http://localhost:3006/shop`,
    metadata: {
      nickname: req.body.nickname,
      type: req.body.purchaseType
    }
  });

  res.redirect(303, session.url);
});


const fulfillOrder = async (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
  console.log("Fulfilling order", session.metadata);

  switch (session.metadata.type) {
    case ('vip'): {
      const {Player} = require('./db/models')

      const player = await Player.findOne({
        where: {
          nickname: session.metadata.nickname
        }
      })

      if(player) {
        console.log('player exists')
        await player.set({
          rank: 'vip'
        })

        await player.save()
      }
      else {
        let newPlayer = await Player.build({
          nickname: session.metadata.nickname,
          rank: 'vip'
        })

        await newPlayer.save()

        console.log('player not exists')
      }
      break
    }
    case ('svip'): {
      const {Player} = require('./db/models')

      const player = await Player.findOne({
        where: {
          nickname: session.metadata.nickname
        }
      })

      if(player) {
        console.log('player exists')
        await player.set({
          rank: 'svip'
        })

        await player.save()
      }
      else {
        let newPlayer = await Player.build({
          nickname: session.metadata.nickname,
          rank: 'svip'
        })

        await newPlayer.save()

        console.log('player not exists')
      }
      break
    }
  }
}

app.get('/test', async (req, res) => {
  const {Player} = require('./db/models')
  console.log('DICKCCCCC')

  const player = await Player.findAll({
    where: {
      nickname: 'xDepcio'
    }
  })

  res.json(player)
})

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  console.log('webhoooooooooooook')

  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    console.log('==================')
    console.log(payload)
    console.log('-------------------')
    console.log(sig)
    console.log('--------------------')
    console.log(endpointSecret)
    console.log('==================')
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err.message)
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('event')
    console.log(event)

    // Fulfill the purchase...
    fulfillOrder(session);
  }

  console.log("Got payload: " + payload);
  console.log(payload)
  console.log('WEBHOOKXDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')

  response.status(200);
});


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Custom error middleware (triggered via call to next(err)) - DO NOT MODIFY
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400);

    if (!err.hasOwnProperty('name')) {
        err = {
            name: "BadRequest",
            ...err,
        }
    };

    res.json(err);
});

// Custom 404 (path not defined) - DO NOT MODIFY
app.use((req, res) => {
    res.status(404);
    res.json({
        error: 'Not Found'
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 8000;
app.listen(port, () => console.log('Server is listening on port', port));
