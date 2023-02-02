「openai」から{構成、 OpenAIApi }をインポートします。
 
const構成= 新しい構成( {
  apiKey :プロセス。環境。OPENAI_API_KEY 、
} ) ;
 
const openai = 新しいOpenAIApi (構成) ;
const basePromptPrefix =
`
以下のタイトルのブログ記事の詳細な目次を書いてください。
 
  タイトル:
`
 
const generateAction = async ( req , res )  =>  {
  コンソール。log ( `API : $ { basePromptPrefix } $ { req. body . userInput } ` )
 
  const baseCompletion = await openai. createCompletion ( {
    モデル:  'text-davinci-003' ,
    プロンプト: `$ { basePromptPrefix } $ { req. ボディ。ユーザー入力} ` 、
    温度:  0.8 ,
    max_tokens :  250 、
  } ) ;
  
  const basePromptOutput = baseCompletion. データ。選択肢。ポップ( ) ;
 
  // プロンプト #2 をビルドします。
  const secondPrompt = 
  `
  以下のブログ記事目次とタイトルを参考に、ポールグラハムの文体で書かれたブログ記事を作成してください。を深く掘り下げて、なぜそうなのかを説明してください。
 
  タイトル: $ {必須。ボディ。ユーザー入力}
 
目次: $ {   basePromptOutput . テキスト}
 
  ブログ:
  `
  
  // プロンプト #2 で OpenAI API をもう一度呼び出します
  const secondPromptCompletion = await openai. createCompletion ( {
    モデル:  'text-davinci-003' ,
    プロンプト: `$ { secondPrompt } ` ,
    // これには高めの温度を設定します。君による！
    温度:  0.85 ,
        // max_tokens も増やします。
    max_tokens :  1250 、
  } ) ;
  
  // 出力を取得します
  const secondPromptOutput = secondPromptCompletion. データ。選択肢。ポップ( ) ;
 
  // プロンプト #1 の代わりにプロンプ​​ト #2 の出力を UI に送信します。
  解像度 状態( 200 )。json ( {出力: secondPromptOutput } ) ;
} ;
 
 デフォルトのgenerateAction をエクスポートします。
