const urlify = (arr) => {
  let obj = {};
  obj = arr.reduce((acc, item, index, arr) => {
    let url = item.url;
    obj[url] = item;
    return obj;
  }, obj);
  return obj;
}

export default urlify;
