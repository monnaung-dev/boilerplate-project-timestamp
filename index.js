
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 
app.use(express.static('public'));
app.get('/api', (req, res) => {
  const currentDate = new Date().toUTCString()
  const currentUnix = Date.parse(currentDate)
  res.json({ unix: currentUnix, utc: currentDate })
})

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date
  const dateStringRegex = /^[0-9]+$/
  const numbersOnly = dateStringRegex.test(dateString)
 
  if (!numbersOnly) {
    const unixTimestamp = Date.parse(dateString)
    const utcDate = new Date(unixTimestamp).toUTCString()
 
    unixTimestamp
    ? res.json({ unix: unixTimestamp, utc: utcDate })
    : res.json({ error: "Invalid Date" })
  } 
  else {
    const unixTimestamp = parseInt(dateString)
    const actualDate = new Date(unixTimestamp)
    const utcDate = actualDate.toUTCString()
 
    res.json({ unix: unixTimestamp, utc: utcDate })
  }
 
 })


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
