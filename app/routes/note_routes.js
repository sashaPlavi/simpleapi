const { ObjectID } = require("mongodb");

module.exports = function (app, db) {
  const collection = db.db("notesdb").collection("notes");

  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };

    collection.findOne(details, (err, item) => {
      if (err) {
        res.send("err");
      } else {
        res.send(item);
      }
    });
  });

  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const note = {
      text: req.body.body,
      title: req.body.title,
    };

    collection.update(details, note, (err, item) => {
      if (err) {
        res.send("err");
      } else {
        res.send(item);
      }
    });
  });

  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };

    collection.deleteOne(details, (err) => {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send("note " + id + " deleted");
      }
    });
  });

  app.post("/notes", (req, res) => {
    // const collection = db.db("notesdb").collection("notes");
    const note = {
      text: req.body.body,
      title: req.body.title,
    };
    collection.insertOne(note, (err, result) => {
      if (err) {
        console.log(err);

        res.send("err");
      } else {
        res.send(result.ops[0]);
        //console.log(err);
      }
    });
  });
};
