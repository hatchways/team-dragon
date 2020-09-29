const User = require("../models/User");
const emailData = require("./emailData");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (req, res, next) => {
  const { emails, gameId } = req.body;
  const { _id } = req.user;

  try {
    const host = await User.findOne({ _id });
    if (!host) {
      return res.status(400).json({
        success: false,
        errors: { host: "Host not found" },
      });
    }

    await Promise.all(
      emails.map((email) => {
        sgMail
          .send(
            emailData.messageOne(email, host.name, gameId, process.env.DOMAIN),
          )
          .then(() => {
            console.log("Email Success");
          })
          .catch((error) => {
            console.error(error);
          });
        return;
      }),
    );
    return res.status(200).json("All emails sent");
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};
