const taskData = require("../models/productInfoModel")
const userlogin = require("../models/userModel")
const userData = require('../middlewares/passportConfig');
const { compareSync } = require("bcryptjs");
require('dotenv').config();





const getspecificfn = async (req, res) => {
    if (req.params.id == "" || req.params.id == null || (!req.params.id)) {
        return res.status(400).json({ msg: "_id is INVALID" });
    }
    console.log("value",req.params.id)
    taskData.find({ _id: req.params.id })
        .then((data) => {
            if (data == "") {
                return res.status(200).json({ msg: "Fail", data: "Request Data INVALID" })

            }
            else {
                return res.status(200).json({ msg: "SUCCESS", data: data })

            }

        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ msg: "Fail", cause: "Request Data INVALID" })
        })
};


const getallfn = async (req, res, next) => {
    try {
        result = await taskData.find({});
        return res.status(200).json({ msg: "SUCCESS", data: result })
    } catch (e) {
        res.status(500).json({ message: "Fail" });
    }
};




const createfn = async (req, res) => {
    console.log("req", req.body);
    // console.log("userData",userDATA)
    if (req.body) {
        taskData.create(req.body)
            .then(result => {
                console.log("data", result);
                {
                    return res.status(200).json({ msg: "Success", data: result });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ msg: "Fail" });

            })
    }
    else {
        return res.status(400).json({ msg: "Fail" });
    }


}

const updatefn = async (req, res) => {
    // console.log("req", req.body);
    if (req.body) {

        taskData
            .findById(req.params.id)
            .then((data) => {

                if (data == null) {
                    return res.status(400).json({ msg: "Fail", data: "_id is INVALID" });
                }
                if (req.body.userId == data.userId) {
                    taskData
                        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                        .then((data) => {

                            if (data == null) {
                                return res.status(400).json({ msg: "Fail", data: "_id is INVALID"});
                            }
                            res.send({msg: "Success", data: "update Successfully..."})


                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                        })
                }
                else {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID" });
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({msg: "Fail", data: "_id is INVALID" });
            })
        ///////////////

    }
    else{
        return res.status(400).json({msg: "Fail", data: "_id is INVALID"});

    }
}
    const deletefn = async (req, res) => {
        console.log("req delete", req.body);
        console.log("req query delete", req.params.id);

        if (req.params.id == "" || (req.params.id == null) || (!req.params.id)) {
            return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
        }
        taskData
            .findById(req.params.id)
            .then((data) => {

                if (data == null) {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                }
                if (req.body.userId == data.userId) {
                    taskData
                        .findByIdAndDelete(req.params.id)
                        .then((data) => {

                            if (data != null) {
                                res.send({msg: "Success", data: "delete Successfully..."})
                            }
                            else {
                                return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                        })
                }
                else {
                    return res.status(400).json({msg: "Fail", data: "_id is INVALID"});
                }

            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({msg: "Fail", data: "_id is INVALID"});
            })

    }



    module.exports = { getallfn, getspecificfn, createfn, updatefn, deletefn };