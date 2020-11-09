module.exports = {
    website_url:"http://localhost:4008/",
    secret: "mabrokamedia" ,//process.env.SECRET
    gc_storage: true, // true: store in google cloud storage else store localy
    gc_projectId: "crma-292718",
    gc_key_file: "crma-292718-f6f492608857.json",
    gc_bucket: "crma",
    imagesDir:"uploads/images",
    carsDir:"uploads/cars",
    customersDir:"uploads/customers",
    rentalsDir:"uploads/rentals",
    technicalControlsDir:"uploads/technical_controls",
    carInsurancesDir:"uploads/car_insurances",
    billDir:"uploads/bills"
}
