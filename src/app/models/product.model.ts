class Product {
    public get id(){
        return this._id
    }
    public set id(theId: number){
        this._id = theId;
    }
    constructor(public name: string = "yad",public description: string = "good condition",public picture: string = "",
    public price: number = 0,public city: string = "tel aviv",public phone:number = 0,public published : string =  new Date().toString(), public _id: number = 0,){
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.price = price;
        this.city = city;
        this.phone = phone;
        this.published = published;
        this._id = _id;
    }
}
export default Product