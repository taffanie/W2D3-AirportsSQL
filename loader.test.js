const loader = require('./index')
const db = require('./db')

// ----- Create Table -----

const createTable = "CREATE TABLE IF NOT EXISTS airports( \
    id INTEGER PRIMARY KEY, \
    icao TEXT, \
    iata TEXT, \
    name TEXT, \
    city TEXT, \
    state TEXT, \
    country TEXT, \
    elevation INTEGER, \
    lat DECIMAL, \
    lon DECIMAL, \
    tz TEXT \
    );"

beforeAll((done) => {
   db.run(createTable, done)
})

// ----- START TESTS -----

describe('loader', () => {
    test('should add rows to the database', (done) => {
        loader(()=> {
            db.get('SELECT COUNT(id) AS total FROM airports;', function(err, row) {
                expect(row.total).toBe(28868)
                done()
            })
        })
    });
});