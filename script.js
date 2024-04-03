$(function () {
  $(".carousel").slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });
  // ボタンの要素を取得
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // スクロールイベントを監視
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      // 500px以上スクロールしたらボタンを表示
      scrollTopBtn.style.display = "block";
    } else {
      // それ以外の場合は非表示
      scrollTopBtn.style.display = "none";
    }
  });

  // ボタンのクリックイベント
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // スムースにトップに戻る
  });

  // スクロール開始後にフェードアウト
  setTimeout(() => {
    this.style.opacity = "0";
    // フェードアウト後にボタンを非表示にする
    setTimeout(() => {
      this.style.display = "none";
    }, 500); // この時間はフェードアウトのtransitionと合わせる
  }, 0);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  // ページ内リンクのスクロールをなめらかにする（スムーズスクロール）
  //WORKにはスクロールしない質問する
  $('a[href^="#"]').click(function () {
    const speed = 700;
    const href = $(this).attr("href");
    let $target;
    if (href == "#") {
      $target = $("html");
    } else {
      $target = $(href);
    }
    console.log($target);
    const position = $target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  // 監視対象のセクションを指定
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // 画像クリック時の処理
  $("myImg").click(function () {
    var src = $(this).attr("src");
    $(".modal").attr("src", src);
    $(".modal").css("display", "block");
  });

  // Worksの画像をクリックしたときにモーダルで拡大表示する
  $(".works img").click(function () {
    const imgSrc = $(this).attr("src");
    $(".big-img").attr("src", imgSrc);
    $(".modal").fadeIn();
    return false;
  });
  // クローズボタンまたはモーダルの外側をクリック時にモーダルを閉じる
  $(".close-btn, .modal").click(function () {
    $(".modal").css("display", "none");
  });

  // モーダルコンテンツ自体のクリック時には閉じないようにする
  $(".modal").click(function (event) {
    event.stopPropagation();
  });
});
