const express = require(express);
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    {id:1,firstName:`tricia`,lastName:`serna`,section:`bsit 4b`, status:`present`},
    {id:2,firstName:`tricia2`,lastName:`serna2`,section:`bsit 4b`, status:`absent`},

];

app.post("/users", (req, res) => {
  const { firstName, lastName, section, status } = req.body;

  const userIndex = users.findIndex(
    (user) => user.firstName === firstName && user.lastName === lastName
  );

  if (userIndex !== -1) {
    users[userIndex].status = status;
    console.log(`Updated attendance for ${lastName} ${firstName} to: ${status}`);
    return res
      .status(200)
      .json({ message: `Attendance for ${lastName} ${firstName} updated to ${status} `});
  } else {
    const newUser = {
      id: users.length + 1,
      lastName,
      firstName,
      section,
      status,
    };
    users.push(newUser);
    console.log(`New user added: ${lastName} ${firstName} with status ${status}`);
    return res
      .status(201)
      .json({ message: `New student ${lastName} ${firstName} added with status ${status} `});
  }
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});
