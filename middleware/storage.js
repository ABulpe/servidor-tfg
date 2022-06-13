const multer = require('multer')

const storage = multer.diskStorage
(
    {
        destination: (request, file, cb) =>
        {
            cb(null, '../servidor/storage/images')
        },

        filename: (request, file, cb) =>
        {
            cb(null, `${file.fieldname}-${Date.now()}.png`)
        }
    }
)

const upload = multer({storage})

module.exports = upload