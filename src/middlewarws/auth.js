// const adminAuth=(req,res,next)=>{
//         const token ='xyz'
//         const authorized= token ==="xyz"
//         if(!authorized){
//             res.status(401).send("unauthorised")
//         }
//         else{
//             next()
//         }
        
// }

// // find user by email
// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//       const users = await User.find({ emailId: userEmail });
//       if (users.length === 0) {
//         res.status(404).send("users not found");
//       } else {
//         res.send(users);
//       }
//     } catch (error) {
//       res.status(400).send("something went wrong");
//     }
//   });
//   // find one
//   app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//       const users = await User.findOne({ emailId: userEmail });
//       if (users.length === 0) {
//         res.status(404).send("users not found");
//       } else {
//         res.send(users);
//       }
//     } catch (error) {
//       res.status(400).send("something went wrong");
//     }
//   });
//   //  delete user
//   app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//       const users = await User.findByIdAndDelete({ userId });
  
//       res.send("user deleted successfully");
//     } catch (error) {
//       res.status(400).send("something went wrong");
//     }
//   });
//   // update with patch
//   app.patch("/user", async (req, res) => {
//     const userId = req.body.userId;
//     const data = req.body;
//     try {
//       const allowed_updates = [
//         "firsrName",
//         "emailId",
//         "gender",
//         "age",
//         "photoUrl",
//         "skills",
//       ];
//       const isUpadateAllowed = object.keys(data).every((key) => {
//         allowed_updates.includes(key);
//       });
//       if (!isUpadateAllowed) throw new Error("update not alowed");
//       if (data.skills > 10) throw new Error("more thsn 10 skills not allowed");
//       const users = await User.findByIdAndUpdate({ _id: userId }, data, {
//         runValidators,
//       });
  
//       res.send("user updated successfully");
//     } catch (error) {
//       res.status(400).send("something went wrong");
//     }
//   });
//   // find all feed
//   app.get("/feed", async (req, res) => {
//     try {
//       const users = await User.find({});
//       if (users.length === 0) {
//         res.status(404).send("feeds not found");
//       } else {
//         res.send(users);
//       }
//     } catch (error) {
//       res.status(400).send("something went wrong");
//     }
//   });
// module.exports={adminAuth}