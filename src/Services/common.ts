import { SortDir, _SortCol } from "src/Interfaces";
import { Model, Document, MongooseFilterQuery } from "mongoose";
import { BaseFetchDto } from "src/Dto";

export const processSortColumnAndDirection = <T>(sortCol: T, sortDir: SortDir, defaultSortColumn: T) => {
  let _sortCol = sortCol ? sortCol : defaultSortColumn;

  if (sortDir) {
    ((_sortCol as any) as string) = `${sortDir === "asc" ? "" : "-"}` + _sortCol;
  }

  return _sortCol;
};

export const isCurrentQuery = { quantity: { $gt: 0 } };

export const find = <DocType extends Document>(
  model: Model<DocType, {}>,
  defaultSortColumn: _SortCol<DocType>,
  query: BaseFetchDto<DocType>,
  expandFields: string[],
  findConditions?: MongooseFilterQuery<DocType>) => {

    const { sortCol, sortDir } = query;
    const _sortCol = processSortColumnAndDirection<_SortCol<DocType>>(sortCol, sortDir, defaultSortColumn);
    return model
      .find(findConditions)
      .sort(_sortCol)
      .populate(expandFields)
      .exec();
}
