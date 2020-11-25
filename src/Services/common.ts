import { SortDir } from "src/Interfaces";

export const processSortColumnAndDirection = <T>(sortCol: T, sortDir: SortDir, defaultSortColumn: T) => {
  let _sortCol = sortCol ? sortCol : defaultSortColumn;

  if (sortDir) {
    ((_sortCol as any) as string) = `${sortDir === "asc" ? "" : "-"}` + _sortCol;
  }

  return _sortCol;
};

export const isCurrentQuery = { quantity: { $gt: 0 } };

// export const find = async <DTO, Document>(query: BaseFetchDto<DTO>, current: boolean): Promise<Document[]> => {
//   const { sortCol, sortDir, offset, limit } = query;

//   const _sortCol = processSortColumnAndDirection<BeerSortCol>(sortCol, sortDir, defaultSortColumn);

//   return this.findAll(_sortCol);
// };
