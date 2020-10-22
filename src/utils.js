const jwt = require("jsonwebtoken");
const config = require('./config');
const bcrypt = require("bcryptjs")
const {  createWriteStream } =  require('fs')
const shortid  = require('shortid')
const {Storage } = require("@google-cloud/storage");
const path = require('path')
const encryptPassword = password => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			reject(err)
			return false
		}
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				reject(err)
				return false
			}
			resolve(hash)
			return true
		})
	})
})

const comparePassword = (password, hash) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compare(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

const getToken = payload => {
    const token = jwt.sign(payload, config.secret, {
        expiresIn: 604800, // 1 Week
    })
    return token
}

const getPayload = token => {
    try {
        const user = jwt.verify(token, config.secret);
        return { loggedIn: true, user:user };
    } catch (err) {
        // Add Err Message
        return { loggedIn: false }
    }
}

// Instantiate a storage client
const gc = new Storage({
  projectId:  config.gc_projectId, //process.env.GCLOUD_STORAGE_BUCKET,
  keyFilename: path.join(__dirname, config.gc_key_file)// process.env.GCLOUD_KEY_FILE
});
//const bucket = googleCloudStorage.bucket('crma') ; //process.env.GCLOUD_STORAGE_BUCKET);
//googleCloudStorage.getBuckets().then((buckets)=>console.log(buckets))

const bucket = gc.bucket(config.gc_bucket)
const storeToGoogleStorage = async ({ createReadStream, filename}, dir) => {
	const id = shortid.generate()
	const path =  id + '-'+ filename
	const path_dir = dir+'/' + path
  await createReadStream()
          .pipe(
            bucket.file(path_dir).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on('finish', () => { console.log(path); } )
					.on('error', console.log)
	 return path
}

const storeToLocalStorage = async ({ createReadStream, filename}, dir) => {
  const id = shortid.generate()
	const pathname =  id + '-'+ filename
  const path = `public/${dir}/${pathname}`
  await createReadStream
      .pipe(createWriteStream(path))
      .on('finish', () => { console.log(path); } )
      .on('error', console.log)
	return pathname
}

const storeUpload = async (file, dir) => {
	const { createReadStream, filename, mimetype, encoding } = await file
	if(config.gc_storage )
		return storeToGoogleStorage({ createReadStream, filename},dir)
  return storeToLocalStorage({ createReadStream, filename},dir)
}
module.exports = {
    getToken,
    getPayload,
    encryptPassword,
    comparePassword,
		storeUpload
}
