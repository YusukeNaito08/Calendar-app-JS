let nav = 0; // どの月を閲覧しているか
let clicked = null; // 日にちの選択　イベントの追加
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem(events)) : [];
/*
localstrage..ユーザーのデータをwebブラウザ(ローカル環境)に保存する/getItem..データを取得/ JSON.parse..JSONをJavaScriptオブジェクトに変換
ローカルからデータを取得できればJSON.parseを返し配列の初期化
*/
const calendar = document.getElementById("calendar"); //カレンダーを操作
const newEventModal = document.getElementById("newEventModal"); //モーダル表示
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
//カレンダーの空白を計算
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//ユーザーがクリックした日にちを知る必要があるdateオブジェクト
function openModal(date) {
  clicked = date;

  //ユーザーのイベント追加、削除、すでに存在判断
  //find.(e)イベントオブジェクトとは、発生したイベントに関する様々な情報を提供するオブジェクト
  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    console.log("Already Exsit");
  } else {
    newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

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
      //date(month/date/year)
      daySquare.addEventListener("click", () => openModal(`${month + 1}/${i - paddingDays}/${year}`));
    } else {
      daySquare.classList.add("padding");
    }
    //カレンダー内に表示
    calendar.appendChild(daySquare);
  }
}
//モーダル閉じる
function closeModal() {
  newEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}
//イベント保存
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");
  } else {
    eventTitleInput.classList.add("error");
  }
}

//次前月ボタン、変数nav=0 次の月++ 前の月-- そしてload();
function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
  //イベントボタン
  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
}

initButtons();
load();
