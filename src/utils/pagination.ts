import { Document, Model } from "mongoose";

interface PaginationResult<T> {
  data: T[];
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

type PopulateField = string | { path: string; select?: string; [key: string]: any };

export async function paginate<T extends Document>(
  model: Model<any>,
  page: number = 1,
  limit: number = 10,
  query: object = {},
  populateFields: PopulateField[] = []
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  const totalDocs = await model.countDocuments(query);
  const totalPages = Math.ceil(totalDocs / limit);

  let queryBuilder = model.find(query).skip(skip).limit(limit);

  if (populateFields.length) {
    populateFields.forEach((field) => {
      if (typeof field === "string") {
        queryBuilder = queryBuilder.populate(field);
      } else if (typeof field === "object" && field.path) {
        queryBuilder = queryBuilder.populate(field);
      }
    });
  }

  const data = await queryBuilder.exec();

  return {
    data,
    totalDocs,
    totalPages,
    currentPage: page,
    pageSize: data.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
