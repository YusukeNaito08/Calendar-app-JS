let nav = 0; // どの月を閲覧しているか
let clicked = null; // 日にちの選択　イベントの追加
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem(events)) : [];
/*
localstrage..ユーザーのデータをwebブラウザ(ローカル環境)に保存する/getItem..データを取得/ JSON.parse..JSONをJavaScriptオブジェクトに変換
ローカルからデータを取得できればJSON.parseを返し配列の初期化
*/
const calender = document.querySelector("calender"); //カレンダーを操作
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//カレンダーの空白を計算

function load() {
  const dt = new Date();
  //このdateオブジェクトから必要な情報の取得
  const day = dt.getDate();
  const month = dt.getMonth(); // 月は配列格納indexの値なので０から始まる(+1)
  const year = dt.getFullYear();

  //現在の月はじめ
  const firstDayOfMonth = new Date(year, month, 1);
  //ひと月が何日あるか調べる
  const daysInmonth = new Date(year, month + 1, 0).getDate(); //month + 1で次の月に移動、3番目の引数１が月のはじめなので０で先月に戻ってs、getdate()で今月の最終日付を取得
  //firstDaymonthを使って現在の月はじめの情報を取得
  const dateString = firstDayOfMonth.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  /*indexOf関数は文字列の中に指定した文字があるか探して、あればその位置を返sす
  カレンダーの月の空白の位置を検索weekdaysの配列を使って、０番目から探す
  */
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
}

load();
