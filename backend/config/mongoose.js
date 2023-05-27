const mongoose = require ('mongoose');


mongoose.connect("mongodb://atlas-sql-645b6880f22b597868194d22-gfvkz.a.query.mongodb.net/mssn-auk-new?ssl=true&authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
//mongoose.connect("mongodb+srv://almuhandis:egBK3SIRRygAouy5@mssn-auk.ztm88ss.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })


module.exports = {mongoose}

// e77an6um2ngtb4q4th24b3v4g8