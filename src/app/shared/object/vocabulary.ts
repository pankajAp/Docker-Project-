export class Vocabulary {
  vocabulary_id: number;
  vocabulary_english_name: string;
  vocabulary_marathi_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.vocabulary_id = json.vocabulary_id;
      this.vocabulary_english_name = json.vocabulary_english_name;
      this.vocabulary_marathi_name = json.vocabulary_marathi_name;
    }
  }
}
