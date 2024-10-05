// controller.js
const Visitor = require('../model/visitorModel'); // Import the Visitor model
const TestModel=require('../model/model')
const geoip = require('geoip-lite'); // Import geoip-lite for geolocation
const whois = require('whois'); // Import whois for WHOIS lookups
const axios =require('axios')
const apis = {};


apis.employee=async(req,res)=>{
    const {name,email,mobileNumber,experience,education,detailExperience}=req.body
    try{
const Employee = new TestModel({
    name,
    email,
    experience,
    mobileNumber,
    education,
    detailExperience
})
    const saveEmploye = await Employee.save()
    res.status(200).json({
    success:true,
    message:'employee created successfully',
    data:saveEmploye
})
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}
// Function to get WHOIS info
function getWhoisInfo(ip) {
    return new Promise((resolve, reject) => {
        whois.lookup(ip, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                console.log("not error")
            }
        });
    });
}
// Function to get the client's IP address
function getClientIp(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim(); // In case of multiple IPs, get the first one
    }
    return req.connection.remoteAddress || req.socket.remoteAddress;
}

// Define the createApi function to gather and save visitor details
apis.createApi = async (req, res) => {
    try {
        const ip = getClientIp(req);
        const userAgent = req.headers['user-agent'];
        const location = geoip.lookup(ip);
        const cookies = req.cookies;
        const referrer = req.headers['referer'] || 'Direct';

        // Fetch WHOIS data
        const whoisData = await getWhoisInfo("2409:408d:0ebc:091a:8dfe:0681:2fb3:41ea");

        const visitorData = {
            ip: ip,
            userAgent: userAgent,
            location: location ? `${location.city}, ${location.country}` : 'Unknown',
            referrer: referrer,
            cookies: cookies,
            whoisData: whoisData // Add WHOIS data to the visitor data
        };

        // Store visitor data in MongoDB
        await Visitor.create(visitorData);

        res.status(200).json({
            success: true,
            message: 'Visitor data saved successfully',
            data: visitorData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
};

apis.collect = async (req, res) => {
    const ipAddress = req.query.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving geolocation data', error });
    }
};




module.exports = apis;
