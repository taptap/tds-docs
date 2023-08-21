interface Source {
  content: string;
  heading: string;
  title: string;
  url: string;
}

interface HitItem {
  _id: string;
  _index: string;
  _score: number;
  _source: Source;
  _type: "_doc";
  _indexItem : number;
  _X_Tds_Doc_Search_Sequence :number,
  _X_Tds_Doc_Search_Session:string,
  _locale:string,
}

interface HitGroup {
  hits: HitItem[];
}

interface HitGroupWithTitle extends HitGroup {
  title: string;
}

export type { HitItem, HitGroup, HitGroupWithTitle ,Source};
