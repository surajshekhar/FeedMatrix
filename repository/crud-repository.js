import Tweet from "../models/tweet.js";
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log(error);
      console.log("something went wrong in crud repo create fn");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const result = await this.model.findByIdandDelete(id);
      return result;
    } catch (error) {
      console.log("something went wrong in crud repo destroy fn");
      throw error;
    }
  }
  async get(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("something went wrong in crud repo get fn");
      throw error;
    } 
  }
  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("something went wrong in crud repo getall fn");
      throw error;
    }
  }
  async update(id, data) {
    try {
      const result = await this.model.findByIdandUpdate(id, data, {
        new: true,
      }); //new true will give the updated document of findById
      return result;
    } catch (error) {
      console.log("something went wrong in crud repo update fn");
      throw error;
    }
  }
}
export default CrudRepository;
