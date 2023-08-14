import Quest from "../modules/qusetScheme.js";
import nodemailer from "nodemailer";
import User from "../modules/userScheme.js";
import mongoose from "mongoose";
export const createQuest = async (req, res) => {
  const quest = req.body;
  const quests = await Quest.find({ section: quest.section });
  const newQuest = new Quest({
    ...quest,
    counter: quests.length + 1,
  });
  try {
    await newQuest.save();
    const Quests = await Quest.find();
    res.status(201).json(Quests);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getQuest = async (req, res) => {
  try {
    const Quests = await Quest.find();
    shuffle(Quests);
    res.status(200).send(Quests.slice(0, 30));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const fetchAllQuest = async (req, res) => {
  try {
    const Quests = await Quest.find();
    res.status(200).send(Quests);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const editQuest = async (req, res) => {
  const quest = req.body;

  if (!mongoose.Types.ObjectId.isValid(quest.id))
    return res.status(404).send(`კითხვა არ მოიძებნა: ${quest.id}`);
  const editQuest = await Quest.findByIdAndUpdate(quest.id, quest, {
    new: true,
  });
  res.json(editQuest);
};

export const sendResult = async (req, res) => {
  const { Quiz, personAnswer, _id, time, result } = req.body;
  const user = await User.findOne({ _id });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tamarjoba.info@gmail.com",
      pass: "cijzxrilijezzzph",
    },
  });
  let arr = [];
  Quiz.map((element, index) =>
    arr.push(`
    <li
  style="
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    display: block;
    border-bottom:1px solid crimson;
  "
>

<div>
  <label
    style="
      color: crimson;
      padding-right: 10px;
      content: attr(data-label);
      flex-basis: 50%;
      text-align: right;
      font-weight: 700;
    "
  >
    #:
  </label>
  ${index + 1} :
</div>
<div>
  <label
    style="
      color: crimson;
      padding-right: 10px;
      content: attr(data-label);
      flex-basis: 50%;
      text-align: right;
      font-weight: 700;
    "
  >
    კითხვა: </label
  >${element.title}
</div>
<div>
  <label
    style="
      color: crimson;
      padding-right: 10px;
      content: attr(data-label);
      flex-basis: 50%;
      text-align: right;
      font-weight: 700;
    "
  >
    პასუხო:
  </label>
  ${element.answer[personAnswer[index] - 1]}
</div>
<div>
  <label
    style="
      color: crimson;
      padding-right: 10px;
      content: attr(data-label);
      flex-basis: 50%;
      text-align: right;
      font-weight: 700;
    "
  >
    სწორი პასუხი:
  </label>
  ${element.answer[element.correctanswer - 1]}
</div>
</li>    
  `)
  );
  var mailOptions = {
    from: "pr1ncgiga@gmail.com",
    to: `${user.email}`,
    subject: `Tამარჯობა`,
    text: "ტესტირების შედეგი",
    html: `<section style="margin: 50px">
      <div
        style="
          display: grid;
          place-items: center;
          text-align: center;
          place-content: center;
        "
      >
        <h1 style="color: black">Tამარჯობა</h1>
        <h2 style="color: black">მოგესალმებით ${user.name}</h2>
        <h3 style="color: black">თქვენ დაასრულეთ ტესტირება</h3>
        <h4 style="color: black">თქვენი ტესტირების დეტალური შედეგები:</h4>
        <h5 style="color: black">დრო: ${time}</h5>
        <h5 style="color: black">შედეგი: ${result}/30</h5>
      </div>
      <div
        style="
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 10px;
          padding-right: 10px;
        "
      >
        <ul>
        ${arr[0]}
        ${arr[1]}
        ${arr[2]}
        ${arr[3]}
        ${arr[4]}
        ${arr[5]}
        ${arr[6]}
        ${arr[7]}
        ${arr[8]}
        ${arr[9]}
        ${arr[10]}
        ${arr[11]}
        ${arr[12]}
        ${arr[13]}
        ${arr[14]}
        ${arr[15]}
        ${arr[16]}
        ${arr[17]}
        ${arr[18]}
        ${arr[19]}
        ${arr[20]}
        ${arr[21]}
        ${arr[22]}
        ${arr[23]}
        ${arr[24]}
        ${arr[25]}
        ${arr[26]}
        ${arr[27]}
        ${arr[28]}
        ${arr[29]}
        </ul>
      </div>
    </section>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send({ status: false });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ status: true });
    }
  });
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
