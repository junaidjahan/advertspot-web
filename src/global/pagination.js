export class Pagination {
  total = 0;
  data = [];

  constructor(data) {
    Object.assign(this, data);
  }
}
