// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const Data = require("../db/Data");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(Data.get_data());
  });

  app.post("/api/notes", function(req, res) {
    Data.add_note(req.body.title, req.body.text);
    res.sendStatus(200);
  });

  app.delete("/api/notes/:note_id", function(req, res) {
    let note_id = req.params.note_id;
    Data.delete_note(note_id);
    res.sendStatus(200);
  });

};
