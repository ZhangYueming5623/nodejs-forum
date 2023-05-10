const dbConnection = require('./database.js')
const jwt = require('jsonwebtoken');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3, s3_bucket_name, s3_region_name } = require('./aws.js');
const { sequelize} = require('./models/database');
const { Post } = require('./models/Post');
const { PostPic } = require('./models/PostPic');


const uuid = require('uuid');
const {DataTypes} = require("sequelize");


exports.save_post = async (req, res) => {
    try{
        const data = req.body;
        const token = data.token;
        var decoded;
        try{
            decoded = jwt.verify(token, secretKey);
        }
        catch(err){
            console.log(err);
            return res.status(201).json({
                "message": "Auth failed. Please login again."
            });
        }

        const userid = decoded.userid;
        const title = data.title;
        const description = data.description;
        const photos = JSON.parse(data.photos);

        //save post
        const newPost = await Post.create({
            userid: userid,
            title: title,
            description: description
        });
        const postid = newPost.postid;

        //save photos
        if(photos.length>0){
            for(i=0; i<photos.length; i++){
                photo = photos[i];
                // upload image to s3 server
                var bucketKey = "pure-match/" + uuid.v4() + photo.name.split('.').pop()
                const input = {
                    "Body": Buffer.from(photo.data, 'base64'),
                    "Bucket": s3_bucket_name,
                    "Key": bucketKey,
                };
                await s3.send(new PutObjectCommand(input));
                //save photo records
                const newPostPic = await PostPic.create({
                    postid: postid,
                    pic_name: photo.name,
                    bucketkey: bucketKey
                });
                // const postid = newPost.postid;
                //
                // const insertQuery = 'INSERT INTO purematch.postpics (postid, pic_name, bucketkey) VALUES ($1, $2 ,$3)';
                // const insertValues = [postid, photo.name, bucketKey];
                // const result = await dbConnection.query(insertQuery, insertValues);
            }
        }

        return res.status(200).json({
            "message": "Post created.",
            "userid": postid
        });
    }catch (err) {
        console.log(err)
        res.status(400).json({
            "message": err.message,
            "assetid": -1
        });
    }//catch
}


// query posts, including text and photos
exports.query_post = async (req, res) => {
    const postid = req.query.postid;
    var sql = `
    SELECT
      p.postid postid,
      u.userid userid,
      u.username username,
      TO_CHAR(p.updatetime, 'YYYY-MM-DD HH24:MI:SS') updatetime,
      p.title title,
      p.description description,
      pic.bucketkeys bucketkeys
    FROM purematch.posts p
    LEFT JOIN purematch.users u on u.userid = p.userid
    LEFT JOIN (
      SELECT postid postid, string_agg(bucketkey, ',') bucketkeys
      FROM purematch.postpics
      GROUP BY postid
    ) pic ON pic.postid = p.postid
    WHERE 1=1
  `;
    if(postid){
        sql+=` and p.postid='`+postid+`'`;
    }
    sql +=' ORDER BY p.updatetime DESC';
    const rows = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

    var returnrows = [];
    //get photo from s3 server
    for(i=0; i<rows.length; i++){
        var row = rows[i];
        if(row.bucketkeys){
            var photos= [];
            const bucketkeyarr = row.bucketkeys.split(',');
            for(j=0; j<bucketkeyarr.length; j++){
                var data = await s3.send(new GetObjectCommand({
                    Bucket: s3_bucket_name,
                    Key: bucketkeyarr[j]
                }));
                var datastr = await data.Body.transformToString("base64");
                photos.push(datastr);
            }
            row['photos'] = photos;
        }
        returnrows.push(row);
    }
    return res.status(200).json({
        "message": "Post created.",
        "rows": returnrows
    });
}