const mongoose =  require("mongoose")
const validateMongDBId  =  (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid)
    {
        throw new Error("This id is not valid or not Found")

    };


}

module.exports = validateMongDBId