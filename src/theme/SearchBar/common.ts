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
}

interface HitGroup {
  title: string;
  hits: HitItem[];
}

export type { HitItem, HitGroup };
