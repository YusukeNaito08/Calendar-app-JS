let nav = 0; // どの月を閲覧しているか
let clicked = null; // 日にちの選択　イベントの追加
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem(events)) : [];
/*
localstrage..ユーザーのデータをwebブラウザ(ローカル環境)に保存する/getItem..データを取得/ JSON.parse..JSONをJavaScriptオブジェクトに変換
ローカルからデータを取得できればJSON.parseを返し配列の初期化
*/
const calendar = document.getElementById("calendar"); //カレンダーを操作
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//カレンダーの空白を計算

function load() {
  const dt = new Date();
  //ボタン、setMonthで現在の月、変数nav=0 次の月++ 前の月--
  if (nav != 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

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
  /*indexOf関数は文字列の中に指定した文字があるか探して、あればその位置を返す
  カレンダーの月の空白の位置を検索weekdaysの配列を使って、０番目から探す
  */
  const paddingDays = weekdays.indexOf(dateString.split(",")[0]);
  //月表示
  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString("en-US", { month: "long" })}${year}`;

  //ボタンによって次前の月が呼び出されたときリセットして読み込む
  calendar.innerHTML = "";
  //月の空白と日にちを保持してfor文で表示
  for (let i = 1; i <= paddingDays + daysInmonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    //i(日にち)がpaddingdaysより大きい場合日にちを１から表示elsepaddingを表示
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.addEventListener("click", () => console.log("click"));
    } else {
      daySquare.classList.add("padding");
    }
    //カレンダー内に表示
    calendar.appendChild(daySquare);
  }
}

//ボタン、変数nav=0 次の月++ 前の月-- そしてload();
function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();
