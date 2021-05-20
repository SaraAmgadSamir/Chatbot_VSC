const express = require('express');
const app = express()
const fetch = require('node-fetch');
app.use(express.json());

//remove in runkit
const CMS_BASE='appQDez5zT9fpvP7Z';
const AIRTABLE_API_KEY='keyufQOUOgaWQeSoA';
const VERIFY_TOKEN='facebookverifytoken';
//const PAGE_ACCESS_TOKEN='EAAgzPXM2XocBAOmVvIhJSx6TbAo844i6LDAnWQutnlQyeeXUII3wgu8W8BLCwQPypYrJBX1V9m5PR58KaNjNtjjeITyKScxM3KSZCnLM9tznkgLZA2VIgC8lbKfZCYj6BqeIyW4TJ5AFblQZATfIUSUyxlUpBYZAvE3tC0d9G8IfEIQMgQJh1';
//
const cheerio=require("cheerio");
const request=require("request");
const cheerioTableparser = require('cheerio-tableparser');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv')
var Airtable = require('airtable');
const { Table } = require('airtable');
const e = require('express');
var base = new Airtable({apiKey:'keyufQOUOgaWQeSoA'}).base('appQDez5zT9fpvP7Z');
var table=base('FacebookUsersTable');
const {PAGE_ACCESS_TOKEN} = process.env;
const verifyToken=process.env.VERIFY_TOKEN;
console.log('I am here 1');
app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.get('/', (req, res) => {
let response=fetch( `https://graph.facebook.com/v10.0/me/messenger_profile?/<PSID>fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`     
)
res.send(response)
});

const crawlPDF=async(usernameIn,passwordIn,urlIn)=>{
    var options = {
              url:urlIn,
              username: usernameIn,
              password: passwordIn,
              request: {
                  headers: {
                      'Accept': 'application/json'
                  }
              }
  };
  
            ntlmRequest.fetch(options, function (err, resp, body) {
                  const $ = cheerio.load(body);
                  console.log(body);
                //SEE IF IT IS A VOD OR A PDF
                console.log(($('.p-3 .mb-4').text()).includes('VOD'));
            console.log($('.p-3').html());
              const weeklyContents=$('.p-3').after.html
                  .map((i,weeklyContent)=>weeklyContent)
                  .get();
              console.log(weeklyContents);
              weeklyContents.forEach(weeklyContent=>{
                  console.log(weeklyContent.html());
              })
            
            })
            
            
            
            }
  

app.post('/',   async (req, res)=> {
console.log('I am printing the body now');
console.log(req.body);
let action = req.body.queryResult.action; 
let userId=req.body.originalDetectIntentRequest.payload.data.sender.id;
let responseJson = {};

responseJson.fulfillmentText = 'This is an endpoint published to RunKit'; // displayed response
if(action=='GetWelcomeResponse'){
let response=  await fetch( 'https://graph.facebook.com/'+userId+`?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
{
method:'GET',
headers:{
'Content-Type':'application/json'
}
}
).then(resp => resp.json())
.then(data=>responseJson.fulfillmentText = data.first_name );
responseJson.fulfillmentMessages=['11','22'];
// console.log(response.text());
res.json(responseJson);

}
//login trial
if(action=='Login'){
const state = {
    credentials:{
        username: '',
        password: ''},
    data: {
    loading: false
    },
    snackbar: {
    open: false
    }};
const url = 'https://cms.guc.edu.eg/';
const options = {
    headers: {
    'Authorization': `Basic ${btoa(this.state.credentials.username.concat(':').concat(this.state.credentials.password))}`
    }
};
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
        this.setState({ data: { loading: false } });
        if (json.data.authorized) {
            this.props.setCredentials(this.state.credentials);
            this.props.router.push('/dashboard');
        } else {
            this.setState({ snackbar: { open: true } });
        }
        })
        .catch(err => console.error(err));

}



})

const getRecords = async()=>{

const records=await table.select({count}).firstPage();
console.log(records);
}

const getRecordsByName = async()=>{
const record=await table.find('recdbBuBqLqaQUMFe');
console.log('Records by Id: ');
console.log(record);
}

await getRecords();


