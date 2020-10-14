const db = require('./db')
const airports = require('./airports.json')

// ----- Recursive function to insert rows into database from json -----

function insert (airports, callback) {
    if (airports.length === 0) return callback()
    const airport = airports.pop() // takes last entry, mutates array
    const fields = Object.keys(airport).join(",") // icao, iata, name, city, state, country, elevation, lat, lon, tz
    db.run(`INSERT INTO airports(${fields})
            VALUES(?,?,?,?,?,?,?,?,?,?);`, // ?s are replaced with values from the next argument i.e. Object.values(airport)
            Object.values(airport), function(err) {
            insert(airports, callback) // calls itself    
        }
    )
}

// ----- Loader() function which calls above insert() function -----

function loader (callback) {
    insert(airports, callback)
}

module.exports = loader