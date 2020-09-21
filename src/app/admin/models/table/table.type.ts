export type ItemType = {
  id: number,
  createdAt: string,
  moduleName: string,
  modulePurpose: number,
  rating: number
};


export type TableType = {
  data: ItemType[],
  count: number;
}
