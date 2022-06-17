import path from "path";
import Datastore from "@seald-io/nedb";

export interface data {
  /**
   * image in datauri
   * @type string
   */
  image: string;
  location: {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lon: number;
  };
  /**
   * created at document
   */
  created: number;
}

const db = new Datastore<data>({
  filename: path.resolve(__dirname, "../db/db.db"),
});

db.loadDatabase();

export function findall() {
  return new Promise<data[]>((r, j) => {
    db.find({}, (err: Error | null, docs: data[]) => {
      if (err) return j(err);
      r(docs);
    });
  });
}

export function count(id: string) {
  return new Promise<number>((r, j) => {
    db.count({ _id: id }, (err, count) => {
      if (err) return j(err);
      r(count);
    });
  });
}

export function insert(newData: data) {
  return new Promise<data>((r, j) => {
    db.insert(newData, (err, docs) => {
      if (err) return j(err);
      r(docs);
    });
  });
}

export function remove(id: string) {
  return new Promise<number>((r, j) => {
    db.remove(
      {
        _id: id,
      },
      {
        multi: true,
      },
      (err, numRemoved) => {
        if (err) return j(err);
        if (numRemoved == 0) return j("id unkown");
        r(numRemoved);
      }
    );
  });
}

export function removeall(){
  return new Promise<number>((r,j)=>{
    db.remove({}, {multi:true}, (err,num)=>{
        if (err) return j(err);
        r(num)
    })
  })
}