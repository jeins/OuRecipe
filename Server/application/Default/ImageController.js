import {Router} from 'express';
import fs from 'fs';
import multer from 'multer';

export default ()=>{
    let imgPath = __dirname + '/../../public/images/';
    let router = new Router();

    router.post('/api/image/upload/:path', (req, res)=>{
        let path = req.params.path;
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {cb(null, imgPath + path);},
            filename: (req, file, cb) => {cb(null, file.originalname);}
        });
        let upload = multer({storage: storage}).single('file');

        upload(req, res, (err)=>{
            if(err) {
                res.json({error_code:1,err_desc:err});
                return;
            }
            else res.json({success: true});
        });
    });

    router.get('/images/:path/:img', (req, res)=>{
        let path = req.params.path + '/';
        let img = req.params.img;

        if(!_imgValidation(img)){
            res.redirect('/');
        }

        fs.readFile(imgPath + path + img, (err ,data)=>{
            if(err) throw err;
            let imgExtension = 'image/' + _getImgExtension(img);
            res.writeHead(200, {'Content-Type': imgExtension });
            res.end(data, 'binary');
        })
    });

    function _imgValidation(img){
        let imgExtension = _getImgExtension(img);

        return imgExtension === 'png' || imgExtension === 'jpg' || imgExtension === 'jpeg';
    }

    function _getImgExtension(img){
        let tmpArr = img.split('.');
        return tmpArr[tmpArr.length-1].toLowerCase();
    }

    return router;
}