let nav = 0; // どの月を閲覧しているか
let clicked = null; // 日にちの選択　イベントの追加
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
/*
localstrage..ユーザーのデータをwebブラウザ(ローカル環境)に保存する/getItem..データを取得/ JSON.parse..JSONをJavaScriptオブジェクトに変換
ローカルからデータを取得できればJSON.parseを返し配列の初期化
*/
const calendar = document.getElementById("calendar"); //カレンダーを操作
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal"); //
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput"); //イベント名
//カレンダーの空白を計算
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//ユーザーがクリックした日にちを知る必要があるdateオブジェクト
function openModal(date) {
  clicked = date;
  //ユーザーのイベント追加、削除、すでに存在判断
  //find.(e)イベントオブジェクトとは、発生したイベントに関する様々な情報を提供するオブジェクト
  //配列の中身をfindしてイベント確認
  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
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

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    //i(日にち)がpaddingdaysより大きい場合日にちを１から表示elsepaddingを表示
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      const eventForDay = events.find((e) => e.date === dayString); //イベントの日付

      //現在の日にち
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }
      //カレンダー内にイベントを表示
      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener("click", () => openModal(dayString)); //date(month/date/year)
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare); //カレンダー内に表示
  }
}
//モーダル閉じる
function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}
//イベント保存
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");
    //変数eventsの中の配列に入力値を保存
    events.push({
      date: clicked, //日付
      title: eventTitleInput.value,
    });
    //ローカルストレージに保存//検証ーapplication-localstrage
    //JSON.strinfify javaScript のオブジェクトや値を JSON 文字列に変換
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  // 値が「クリックした削除したいイベント」の要素を削除するのは、値が「クリックした削除したいイベント」以外の要素を抽出するのと同じ
  events = events.filter((e) => e.date != clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
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

  document.getElementById("deleteButton").addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();

/* filter()
値が「3」の要素を削除する
値が「3」の要素を削除するのは、値が「3」以外の要素を抽出するのと同じです。

ですから、filter() を使うと次のようなコードになります。


var arr = [1, 2, 3, 4, 5];

var arr = arr.filter(function(x){return x != 3});

console.log(arr);  // Array [ 1, 2, 4, 5 ]
*/
