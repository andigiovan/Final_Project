var moment = require('moment');

tanggal = () => {

    return ( 
    moment("20191016", "YYYYMMDD").fromNow()
    )
}

console.log(tanggal());
