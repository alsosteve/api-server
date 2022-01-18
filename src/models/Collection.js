'use strict';


class Collection {
  constructor (model) {
    this.model = model;
  }

  async read(id, association) {
    let record;
    try {
      if (id) {
        record = await this.model.findOne({where: {id}});
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch(err) {
      console.log(err);
    }
  }
  async create(data) {
    const record = await this.model.create(data);
    return record;
  }
  async update(id, newRecord) {
    let recordToUpdate = await this.model.findByPk(id); // pk is primary key
    recordToUpdate.set(newRecord);
    await recordToUpdate.save();
    return recordToUpdate;
  }
  async remove(id) {
    try {
      let record = await this.model.findByIdAndDelete(id);
      return record;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Collection;