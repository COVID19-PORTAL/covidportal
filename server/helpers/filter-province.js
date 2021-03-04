function filter(province, hospitals){
    const filterHospitals = hospitals.filter(hospital => hospital.province.toLowerCase() === province.toLowerCase());
    return filterHospitals;
}

module.exports = filter