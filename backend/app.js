const express = require('express');
const userRoutes = require("./routes/user")



const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/api", userRoutes);


// const donor = new Donor({
//     full_name: "Almuhandis",
//     email: "Almuhandis.com",
//     amount: 200,
//     reference: "dst5srsqfts",
//     regno: "nas/ste/19/1023",
//     level: "400",
//     course: "software",
//     phone: "08123402377"
// })

// donor.save((err,res) => {
//     if(!err){
//         console.log("Success")
//     }else{
//         console.log(err)
//     }
// })

app.listen(port, () => {
    console.log(`App running on port no: ${port}`)
});
