const router = require("express").Router();
const registrations = require("../models/Registrations");
const nodemailer = require("nodemailer");
// const config = require("../config.js")
const {google} = require("googleapis");
const { gmail } = require("googleapis/build/src/apis/gmail");


const CLIENT_ID = '999021726589-7voua5lqmahc85q0ls4dkerr573vg7tg.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'http://localhost:5000'
const REFRESH_TOKEN = '1//04uwaYlPCROi8CgYIARAAGAQSNwF-L9IrA3tj1CoTnwtmBVzMEBSHlC-GgesR9kVzWv01hGZYSWJt9nUQmr_ZCGNxpLgnjnk83iA'
// const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


router.post("/allotmentmail/:id", async (req, res) => {
    try {
        // Fetch the participant
        const participant = await registrations.findById(req.params.id);
        console.log(`Participant ID: ${req.params.id}`);
        
        // Update the participant's record
        await registrations.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    Allotedmail: true,
                    status: "PAYMENT PENDING"
                }
            }
        );
        console.log("participant updated");  // This will now be logged

        // Generate access token for OAuth2
        let accessToken = await oAuth2Client.getAccessToken();
      // console.log("OAuth2 Client:", oAuth2Client);

        // Setup nodemailer transport
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ankitpratap04@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token
            },
            tls: {
                rejectUnauthorized: false
            }
        });
       // console.log("Transport created:", transport);

        let p = 0;
        let cashpay = "";
        if (participant.institute === "NIT Durgapur") {
            p = 450;
            cashpay = "If you want to make the payment through cash you can contact Poorab Kumar (+91 70639 67246) or Zeba Haq (+91 79804 46260)";
        } else {
            p = 1049;
            cashpay = "";
        }

        console.log("Preparing to send email...");

        // Send email
        const main = async () => {
            console.log("Sending email...");
            const info = await transport.sendMail({
                from: '"Literary Circle, NIT Durgapur" <ankitpratap04@gmail.com>',
                to: participant.email,
                subject: "Registration confirmation",
                text: "",
                html: `Greetings <b>${participant.name}</b>,<br/><br/>Following your registration in <b>NITMUN XII</b>, you are requested to submit a registration fee of <b>Rs ${p}</b>.<br/>You may pay using UPI to the following people (UPI IDs provided below) :<br/><br/><b>Vedang Chauhan</b> - vedangc03@oksbi (+91 90279 79974)<br/><b>Poorab Kumar</b> - poorab.kumar@paytm (+91 70639 67246)<br/><br/>Please mention NITMUN XII- ( your name ) - ( institution ) while sending it. <br/>Let us know when and to whom you have made the payment, via mail. Kindly <b>attach a screenshot</b> of the payment record to the email.<br/>${cashpay}<br/><br/>Regards,<br/>Navneet Berwal,<br/>Under Secretary General,<br/>NITMUN XII.<br/>Contact number - +91 85296 22552`
            });
            console.log("Email sent successfully:", info);
        }

        await main();  // Await the email sending process

        // Send a response to the client
        res.json({
            message: "Email sent successfully"
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(err);
    }
});
//2024 NEW Code
router.post("/paymentmail/:id", async (req, res) => {
    try {
        // Fetch the participant by ID
        const participant = await registrations.findById(req.params.id);
        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }
        
        // Update the participant's status to "RECEIVED PAYMENT"
        await registrations.findByIdAndUpdate(req.params.id, {
            $set: {
                paid: true,
                status: "RECEIVED PAYMENT"
            }
        });
        console.log("Participant updated:", req.params.id);

        // Get the access token for OAuth2
        const accessToken = await oAuth2Client.getAccessToken();
        console.log("Access Token generated:", accessToken.token);

        // Set up nodemailer transport
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ankitpratap04@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Send the payment confirmation email
        await transport.sendMail({
            from: '"Literary Circle, NIT Durgapur" <ankitpratap04@gmail.com>',
            to: participant.email,
            subject: "Payment Confirmation",
            text: "",
            html: `Dear <b>${participant.name}</b>,<br/><br/>Your payment has been received. We look forward to hosting you.<br/><br/>Regards,<br/>Soumik Biswas,<br/>Deputy Director General,<br/>NITMUN XII.<br/>Contact - +916290575119.`
        });

        console.log("Payment confirmation email sent");

        // Send response back to the client
        res.json({
            message: "Payment confirmation email sent successfully"
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "An error occurred while sending the email", error: err });
    }
});
//2023 CODE 
// router.post("/paymentmail/:id", async (req,res)=>{
//     try{
//         const participant = await registrations.findById(req.params.id)
//         await registrations.findOneAndUpdate({_id:req.params.id},{
          
            
//            $set:{
//                paid:true,
//                status: "RECEIVED PAYMENT"
//            } 
           
//         }).then(()=>{
//            // console.log("participant updated")
//            console.log(req.params.id)
//          }).catch(err=>{console.log(err)})
//              accessToken = await oAuth2Client.getAccessToken();
        
//          let transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//             type: 'OAuth2',
//             user: 'ankitpratap04@gmail.com',
//             clientId: CLIENT_ID,
//             clientSecret: CLIENT_SECRET,
//             refreshToken: REFRESH_TOKEN,
//             accessToken: accessToken
//             },
//             tls:{
//                 rejectUnauthorized:false
//             }
//           });

//         const main = async() => {
//           let info = await transport.sendMail({
//             from: '"Literary Circle, NIT Durgapur" <ankitpratap04@gmail.com>', 
//             to: participant.email, // list of receivers
//             subject: "Payment Confirmation ", 
//             text: "",
//             html: 'Dear <b>${participant.name}</b>,<br/><br/>Your payment has been received.We look forward to hosting you.<br/> <br/>Regards,<br/>Soumik Biswas,<br/>Deputy Director General,<br/>NITMUN XII.<br/>Contact - +916290575119.,' 
           
//           });

//         console.log("successs............")
//         res.json({
//             message:"papa mail kar diye hain"
//         })
//     }
//     main().catch(console.error);
//  } catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports = router