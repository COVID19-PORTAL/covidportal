function filter(province, hospitals){
    const filterHospitals = hospitals.filter(hospital => hospital.province.toLowerCase() === province.toLowerCase());
    console.log('mama')
    return filterHospitals;
}

module.exports = filter