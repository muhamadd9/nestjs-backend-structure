import {
  DeleteResult,
  FilterQuery,
  HydratedDocument,
  Model,
  PopulateOptions,
} from 'mongoose';

export abstract class DatabaseRepository<TDocument> {
  protected constructor(protected readonly model: Model<TDocument>) {}

  async findOne({
    filter = {},
    populate = [],
  }: {
    filter?: FilterQuery<TDocument>;
    populate?: PopulateOptions[];
  }): Promise<TDocument | null> {
    return await this.model.findOne(filter).populate(populate);
  }

  async create(data: Partial<TDocument>): Promise<TDocument> {
    return await this.model.create(data);
  }

  async updateOne({
    filter = {},
    data = {},
  }: {
    filter?: FilterQuery<TDocument>;
    data: any;
  }): Promise<boolean> {
    const result = await this.model.updateOne(filter, data);
    return result.modifiedCount > 0;
  }

  async find({
    filter = {},
    populate = [],
    page = 1,
    limit = 10,
  }: {
    filter?: FilterQuery<TDocument>;
    populate?: PopulateOptions[];
    page?: number;
    limit?: number;
  }): Promise<{ data: TDocument[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).populate(populate),
      this.model.countDocuments(filter),
    ]);
    return {
      data,
      total,
    };
  }
  async findByIdAndUpdate({
    id,
    data,
    options = {},
  }: {
    id: string;
    data: any;
    options?: any;
  }): Promise<HydratedDocument<TDocument> | null> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      id,
      data,
      options,
    );
    return updatedDocument as HydratedDocument<TDocument> | null;
  }
  async findByIdAndDelete({
    id,
    options = {},
  }: {
    id: string;
    options?: any;
  }): Promise<HydratedDocument<TDocument> | null> {
    const deletedDocument = await this.model.findByIdAndDelete(id, options);
    return deletedDocument as HydratedDocument<TDocument> | null;
  }

  async deleteMany({
    filter = {},
    options = {},
  }: {
    filter?: FilterQuery<TDocument>;
    options?: any;
  }): Promise<DeleteResult> {
    return await this.model.deleteMany(filter, options);
  }
  async deleteOne({
    filter = {},
    options = {},
  }: {
    filter?: FilterQuery<TDocument>;
    options?: any;
  }): Promise<boolean> {
    const result = await this.model.deleteOne(filter, options);
    return result.deletedCount > 0;
  }

  async findOneAndDelete({
    filter = {},
    options = {},
  }: {
    filter?: FilterQuery<TDocument>;
    options?: any;
  }): Promise<TDocument | null> {
    const result = await this.model.findOneAndDelete(filter, options);
    return result as TDocument | null;
  }

  async findOneAndUpdate({
    filter = {},
    data = {},
    options = {},
  }: {
    filter?: FilterQuery<TDocument>;
    data: Partial<TDocument>;
    options?: any;
  }): Promise<TDocument | null> {
    const result = await this.model.findOneAndUpdate(filter, data, options);
    return result as TDocument | null;
  }
  async findById({
    id,
    populate = [],
  }: {
    id: string;
    populate?: PopulateOptions[];
  }): Promise<TDocument | null> {
    return await this.model.findById(id).populate(populate);
  }
}
