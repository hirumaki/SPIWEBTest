class Problem {
  type: string;
  body: string;
  statement: string[];
  questions: string[];
  choices: string[];
  limit: number;
  solution: string[]|number[]; 
  points:number[];

  constructor(
    type:string,
    body:string,
    statement:string[],
    questions: string[],
    choices: string[],
    limit: number,
    solution: string[]|number[],
    points:number[]
  )
  {
    this.type = type;
    this.body = body;
    this.statement = statement;
    this.questions = questions;
    this.choices = choices;
    this.limit = limit;
    this.solution = solution;
    this.points = points;
  }
}
export default Problem;

export const problems:Problem[] = [
//problemの型
/* {
  type:string,
  body:string,
  statement:array,
  questions:array,
  choices:array,
  limit:number,
  solution:array,
  points:array
}
*/
//言語分野
    {
      //熟語の構造 ３つ
      type:'IdiomStructure',
      body:'次の5つの熟語の構造にとして正しいものを、選択肢ア～エからそれぞれ選びなさい',
      statement:['因果','機微','美醜','日没','着衣'],
      questions:[],
      choices:['異なる意味を持つ漢字を並べている','主語と熟語の関係になっている','前の字が後の字を修飾している','ア～ウのどれでもない'],
      limit:5,
      solution:['ア','ウ','ア','イ','エ'],
      points:[1,1,1,1,1]
    },
    {
      //3文の穴埋め ４つ
      type:'OneBlankFixOfThreeSentences',
      body:'以下の３つの文の意味がつながるように、空欄の中に当てはまる語句を、選択肢ア～オから選びなさい。ただし、同じ選択肢を用いることはありません。',
      statement:['１つ目の文章[  ]','２つ目の文章[  ]','３つ目の文章[  ]'],
      questions:[],
      choices:['ダミー１','３つ目の答え','１つ目の答え','ダミー','２つ目の答え'],
      limit:5,
      solution:['ウ','オ','イ'],
      points:[1,1,1,0,0]
    },
    /*
    {
      //並び替え　３つ
      type:'SortFourElement',
      body:'次の１～４の空欄に選択肢ア～エの語句を並び替えて当てはめた時、最も意味の通る文章になる組み合わせを答えなさい。',
      statement:['正しい順番は[1][2][3][4]となる'],
      questions:[],
      choices:['３番目の文章','１番目の文章','４番目の文章','２番目の文章'],
      limit:5,
      solution:['2','4'],
      points:[1,1,1,1,1]

    },
    {
      //一文穴埋め３つ　３つ
      type:'ThreeBlanksFixOfOneSentence',
      body:'次の文章の１～３の空欄に当てはめるのに適切な言葉を、次のア～ウから１つずつ選びなさい。ただし、同じものが入ることはありません。',
      statement:['文章の中身は[ 1 ] だから、[ 2 ] よって　[ 3 ] となる'],
      questions:[],
      choices:[],
      limit:5,
      solution:[2,4],
      points:[1,1,1,1,1]
    },
    {
      //長文読解　２つ
      type:'LongSentenceReading',
      body:`次の文章を読み、後の問題に答えなさい。文章に関する問題は全部で３問あります。`,
      statement:['昔話の教訓には、日本にあることわざに似たような意味になるものが存在する。（ア）これは、裏で多くの人々が同じ様な経験をしたことに由来するのではないだろうか。（イ）先人の間違いや経験を、風刺する形で分かりやすく表していることが、昔話は優れている。（ウ）一方、直接的な言葉で表現している分、ことわざは表現しやすい。（エ）既に分別がついている大人に格言として残すか、まだ幼い子どもに伝える為に物語にするかが、先人によって分かれ、同じような意味をながら、違う形で表現されている。どちらも、【　】という点では同じ意味を持つ為、その場その場での使い方を工夫することが、私たちはできるのである。'],
      questions:[
        `次の文は、本文中から抜き出してきたものである。本文中に戻す場合、(ア)～(エ)のどこへ戻すのが適切か。<br><br>・あいうえお`,
        '文中の空欄【　　】に当てはめるのに最も適切な言葉を本文中から2文字以内で抜き出して答えなさい',
        `以下の文章に関する記述について、正しい説明をしている物を答えなさい。<br><br>
        A:あいうえお<br>
        B:かきくけこ
        `],
      //ここでの選択肢は、3問目の要旨一致のみなので、それについて記述する
      choices:[
        'AもBも正しい',
        'Aは正しいが、Bは誤り',
        'Aは誤りだが、Bは正しい',
        'AもBも誤り'],
      limit:5,
      solution:[],
      points:[1,1,1,1,1]
    },
    {
      //一文穴埋め　３つ
      type:'OneBlankFixOfOneSentence',
      body:'次の文章の空欄に入れるのにふさわしい語句を、以下のア～エから選択しなさい。',
      statement:[''],
      questions:[],
      choices:[],
      limit:5,
      solution:[2,4],
      points:[1,1,1,1,1]
    },
    //以下、非言語分野
    {
      //割合の文章題  ２つ
      //数の性質      ２つ
      //書き出す場合の数      ２つ
      //推論　２つ
      //速さ          １つ
      //商売算        １つ

      type:'fixBlank',
      body:'次の空欄[  　]に当てはまる数を答えなさい。',
      statement:['縦1.2メートル、横1.5メートルの土地の1/3を使って、ナスを育て、残りの1/4の土地を使って、ピーマンを育てるとき、何も育てて以内土地は[  　]平方メートルになる。'],
      questions:[],      
      choices:[],
      limit:5,
      solution:[],
      points:[1,1,1,1,1]
    },
    {
      //未確定型の推論 ３つ
      type:'selectOneFromChoices',
      body:'以下について、ア、イの情報のうち、どれがあれば[問い]の答えがわかるかを考え、A～Eまでの中から正しい物を１つ選び、答えなさい。',
      statement:[`甲さんと乙さんの二人は、貯金の半分をそれぞれ出して車を購入した。<br>
      [問い]甲さんが出した金額は、車の金額のどれだけに当たるか<br><br>
      A　推論１：甲さんは500万円の貯金を持っていた<br>
      B　推論２：乙さんは車の金額の半分の貯金を持っていた`],
      questions:[],
      choices:[
        'Aだけでわかるが、Bだけではわからない',
        'Aだけでわかるが、Bだけではわからない',
        'AとBの両方でわかる',
        'AかBのどちらかで分かる',
        'AとBの両方が分かっても分からない'
      ],
      limit:4,
      solution:'A',
      points:[1,1,1,1,1]
    },
    {
      //組み合わせ　１つ
      //確率      ２つ
      type:'fixBlank',
      body:'空欄に当てはまる数値を求めなさい',
      statement:['20円のリンゴを3つ、40円のミカンを3つ買うと、合計は[  ]円になる。'],
      questions:[],
      choices:[],
      limit:5,
      solution:[],
      points:[1,1,1,1,1]
    },
    {
      //表を見る問題　１つ
      type:'tableView',
      body:'空欄に当てはまる数値を求めなさい',
      statement:['20円のリンゴを3つ、40円のミカンを3つ買うと、合計は[  ]円になる。'],
      questions:[],
      choices:[],
      limit:5,
      solution:[],
      points:[1,1,1,1,1]
    },
    {
      //集合の問題　３つ
      type:'fixBlank',
      body:'',
      statement:[''],
      questions:[],
      choices:[],
      limit:5,
      solution:[],
      points:[1,1,1,1,1]
    }*/
  ];
